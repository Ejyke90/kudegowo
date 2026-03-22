const express = require('express');
const router = express.Router();
const CanteenTransaction = require('../models/CanteenTransaction');
const Child = require('../models/Child');
const User = require('../models/User');
const SavingsGoal = require('../models/SavingsGoal');
const { authenticateToken } = require('../middleware/auth');

// Process canteen purchase
router.post('/purchase', authenticateToken, async (req, res) => {
  try {
    const { childId, schoolId, amount, items, qrCode, staffId } = req.body;
    
    if (!childId || !schoolId || !amount) {
      return res.status(400).json({
        status: false,
        message: 'Child ID, school ID, and amount are required',
      });
    }
    
    // Get child and parent
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        status: false,
        message: 'Child not found',
      });
    }
    
    const parent = await User.findById(child.parentId);
    if (!parent) {
      return res.status(404).json({
        status: false,
        message: 'Parent not found',
      });
    }
    
    // Check balance
    if (parent.balance < amount) {
      return res.status(400).json({
        status: false,
        message: 'Insufficient wallet balance',
        data: {
          balance: parent.balance,
          required: amount,
        },
      });
    }
    
    const balanceBefore = parent.balance;
    
    // Deduct from wallet
    parent.balance -= amount;
    await parent.save();
    
    // Create transaction
    const transaction = await CanteenTransaction.create({
      childId,
      schoolId,
      amount,
      type: 'purchase',
      items: items || [],
      staffId,
      qrCode,
      status: 'completed',
      balanceBefore,
      balanceAfter: parent.balance,
    });
    
    // Handle auto-round-up for savings
    const activeGoals = await SavingsGoal.find({
      childId,
      status: 'active',
      autoRoundUp: true,
    });
    
    if (activeGoals.length > 0) {
      const roundUpAmount = Math.ceil(amount / 100) * 100 - amount;
      
      if (roundUpAmount > 0 && parent.balance >= roundUpAmount) {
        const goal = activeGoals[0]; // Round up to first active goal
        
        parent.balance -= roundUpAmount;
        await parent.save();
        
        await goal.addDeposit(roundUpAmount, 'round_up');
      }
    }
    
    res.json({
      status: true,
      message: 'Purchase successful',
      data: {
        transaction,
        newBalance: parent.balance,
        child: {
          _id: child._id,
          firstName: child.firstName,
          lastName: child.lastName,
        },
      },
    });
  } catch (error) {
    console.error('Canteen purchase error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get child's canteen transactions
router.get('/child/:childId/transactions', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { limit = 20, startDate, endDate } = req.query;
    
    const query = { childId };
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    const transactions = await CanteenTransaction.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: transactions });
  } catch (error) {
    console.error('Get canteen transactions error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get school's canteen transactions (for reports)
router.get('/school/:schoolId/transactions', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { date, limit = 100 } = req.query;
    
    const query = { schoolId };
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      query.timestamp = { $gte: startDate, $lt: endDate };
    }
    
    const transactions = await CanteenTransaction.find(query)
      .populate('childId', 'firstName lastName className')
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    
    // Calculate totals
    const totals = transactions.reduce(
      (acc, t) => {
        if (t.type === 'purchase') {
          acc.totalSales += t.amount;
          acc.transactionCount++;
        } else if (t.type === 'refund') {
          acc.totalRefunds += t.amount;
        }
        return acc;
      },
      { totalSales: 0, totalRefunds: 0, transactionCount: 0 }
    );
    
    res.json({
      status: true,
      data: {
        transactions,
        totals,
      },
    });
  } catch (error) {
    console.error('Get school canteen transactions error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Validate child QR code
router.post('/validate-qr', authenticateToken, async (req, res) => {
  try {
    const { qrCode, schoolId } = req.body;
    
    if (!qrCode || !schoolId) {
      return res.status(400).json({
        status: false,
        message: 'QR code and school ID are required',
      });
    }
    
    // QR code format: KUDI_<childId>
    const childId = qrCode.replace('KUDI_', '');
    
    const child = await Child.findOne({
      _id: childId,
      schoolId,
    });
    
    if (!child) {
      return res.json({
        status: true,
        data: {
          valid: false,
          reason: 'Child not found or not enrolled in this school',
        },
      });
    }
    
    const parent = await User.findById(child.parentId);
    
    res.json({
      status: true,
      data: {
        valid: true,
        child: {
          _id: child._id,
          firstName: child.firstName,
          lastName: child.lastName,
          className: child.className,
        },
        balance: parent?.balance || 0,
      },
    });
  } catch (error) {
    console.error('Validate QR error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Process refund
router.post('/refund', authenticateToken, async (req, res) => {
  try {
    const { transactionId, reason } = req.body;
    
    const originalTransaction = await CanteenTransaction.findById(transactionId);
    
    if (!originalTransaction) {
      return res.status(404).json({
        status: false,
        message: 'Transaction not found',
      });
    }
    
    if (originalTransaction.status === 'refunded') {
      return res.status(400).json({
        status: false,
        message: 'Transaction already refunded',
      });
    }
    
    // Get child and parent
    const child = await Child.findById(originalTransaction.childId);
    const parent = await User.findById(child.parentId);
    
    const balanceBefore = parent.balance;
    
    // Refund to wallet
    parent.balance += originalTransaction.amount;
    await parent.save();
    
    // Create refund transaction
    const refundTransaction = await CanteenTransaction.create({
      childId: originalTransaction.childId,
      schoolId: originalTransaction.schoolId,
      amount: originalTransaction.amount,
      type: 'refund',
      items: originalTransaction.items,
      status: 'completed',
      balanceBefore,
      balanceAfter: parent.balance,
    });
    
    // Mark original as refunded
    originalTransaction.status = 'refunded';
    await originalTransaction.save();
    
    res.json({
      status: true,
      message: 'Refund processed',
      data: {
        refundTransaction,
        newBalance: parent.balance,
      },
    });
  } catch (error) {
    console.error('Canteen refund error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

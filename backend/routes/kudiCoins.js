const express = require('express');
const router = express.Router();
const KudiCoin = require('../models/KudiCoin');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');

// Get KudiCoin balance for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    let kudiCoin = await KudiCoin.findOne({ childId });
    
    if (!kudiCoin) {
      // Create new KudiCoin account
      kudiCoin = await KudiCoin.create({ childId, balance: 0 });
    }
    
    res.json({
      status: true,
      data: {
        balance: kudiCoin.balance,
        totalEarned: kudiCoin.totalEarned,
        totalSpent: kudiCoin.totalSpent,
      },
    });
  } catch (error) {
    console.error('Get KudiCoin balance error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get transaction history
router.get('/child/:childId/transactions', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { limit = 20 } = req.query;
    
    const kudiCoin = await KudiCoin.findOne({ childId });
    
    if (!kudiCoin) {
      return res.json({ status: true, data: [] });
    }
    
    const transactions = kudiCoin.getRecentTransactions(parseInt(limit));
    
    res.json({ status: true, data: transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Add KudiCoins (earn)
router.post('/child/:childId/earn', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { amount, reason, referenceType, referenceId } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Valid amount is required',
      });
    }
    
    let kudiCoin = await KudiCoin.findOne({ childId });
    
    if (!kudiCoin) {
      kudiCoin = new KudiCoin({ childId, balance: 0 });
    }
    
    await kudiCoin.addCoins(amount, reason || 'Earned', referenceType, referenceId);
    
    res.json({
      status: true,
      message: `Earned ${amount} KudiCoins`,
      data: {
        balance: kudiCoin.balance,
        earned: amount,
      },
    });
  } catch (error) {
    console.error('Earn KudiCoins error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Spend KudiCoins
router.post('/child/:childId/spend', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { amount, reason, referenceType, referenceId } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Valid amount is required',
      });
    }
    
    const kudiCoin = await KudiCoin.findOne({ childId });
    
    if (!kudiCoin) {
      return res.status(400).json({
        status: false,
        message: 'No KudiCoin account found',
      });
    }
    
    if (kudiCoin.balance < amount) {
      return res.status(400).json({
        status: false,
        message: 'Insufficient KudiCoins',
        data: { balance: kudiCoin.balance, required: amount },
      });
    }
    
    await kudiCoin.spendCoins(amount, reason || 'Spent', referenceType, referenceId);
    
    res.json({
      status: true,
      message: `Spent ${amount} KudiCoins`,
      data: {
        balance: kudiCoin.balance,
        spent: amount,
      },
    });
  } catch (error) {
    console.error('Spend KudiCoins error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get KudiCoins for all parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    
    const children = await Child.find({ parentId });
    
    const kudiCoins = await Promise.all(
      children.map(async (child) => {
        let kudiCoin = await KudiCoin.findOne({ childId: child._id });
        
        if (!kudiCoin) {
          kudiCoin = { balance: 0, totalEarned: 0, totalSpent: 0 };
        }
        
        return {
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
          },
          kudiCoins: {
            balance: kudiCoin.balance,
            totalEarned: kudiCoin.totalEarned,
            totalSpent: kudiCoin.totalSpent,
          },
        };
      })
    );
    
    res.json({ status: true, data: kudiCoins });
  } catch (error) {
    console.error('Get my children KudiCoins error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const PaymentItem = require('../models/PaymentItem');
const { paymentLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Get all transactions for current user
router.get('/', auth, apiLimiter, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate('paymentItem')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new payment transaction
router.post('/pay', auth, paymentLimiter, async (req, res) => {
  try {
    const { paymentItemId, paymentMethod } = req.body;

    const user = await User.findById(req.userId);
    const paymentItem = await PaymentItem.findById(paymentItemId);

    if (!paymentItem) {
      return res.status(404).json({ error: 'Payment item not found' });
    }

    // Check if user has sufficient balance
    if (user.balance < paymentItem.amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create transaction
    const transaction = new Transaction({
      user: req.userId,
      type: 'payment',
      amount: paymentItem.amount,
      paymentItem: paymentItemId,
      paymentMethod: paymentMethod || 'card',
      reference: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed'
    });

    await transaction.save();

    // Update user balance
    user.balance -= paymentItem.amount;
    await user.save();

    res.status(201).json({
      message: 'Payment successful',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Top up balance
router.post('/topup', auth, paymentLimiter, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await User.findById(req.userId);

    // Create transaction
    const transaction = new Transaction({
      user: req.userId,
      type: 'topup',
      amount,
      paymentMethod: paymentMethod || 'card',
      reference: `TOP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed'
    });

    await transaction.save();

    // Update user balance
    user.balance += amount;
    await user.save();

    res.status(201).json({
      message: 'Top up successful',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get('/:id', auth, apiLimiter, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId
    }).populate('paymentItem');

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, children } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone, children },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

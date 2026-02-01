const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const PaymentItem = require('../models/PaymentItem');
const { apiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiter to all routes
router.use(apiLimiter);

// Get all payment items
router.get('/', auth, async (req, res) => {
  try {
    const { category, isActive } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const items = await PaymentItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single payment item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await PaymentItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Payment item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create payment item (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, category, amount, schoolId } = req.body;

    const item = new PaymentItem({
      name,
      description,
      category,
      amount,
      schoolId,
      createdBy: req.userId
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment item (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, category, amount, isActive } = req.body;

    const item = await PaymentItem.findByIdAndUpdate(
      req.params.id,
      { name, description, category, amount, isActive },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Payment item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete payment item (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const item = await PaymentItem.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Payment item not found' });
    }

    res.json({ message: 'Payment item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

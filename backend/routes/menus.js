const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const { authenticateToken } = require('../middleware/auth');

// Get current week's menu for a school
router.get('/school/:schoolId/current', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    weekStart.setHours(0, 0, 0, 0);
    
    const menu = await Menu.findOne({
      schoolId,
      weekStart: { $lte: now },
      weekEnd: { $gte: now },
      isActive: true,
    });
    
    if (!menu) {
      return res.status(404).json({
        status: false,
        message: 'No menu found for current week',
      });
    }
    
    res.json({ status: true, data: menu });
  } catch (error) {
    console.error('Get current menu error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get menu for a specific week
router.get('/school/:schoolId/week/:weekStart', authenticateToken, async (req, res) => {
  try {
    const { schoolId, weekStart } = req.params;
    
    const menu = await Menu.findOne({
      schoolId,
      weekStart: new Date(weekStart),
    });
    
    if (!menu) {
      return res.status(404).json({
        status: false,
        message: 'Menu not found',
      });
    }
    
    res.json({ status: true, data: menu });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create or update menu
router.post('/school/:schoolId', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { weekStart, days } = req.body;
    
    if (!weekStart || !days) {
      return res.status(400).json({
        status: false,
        message: 'Week start and days are required',
      });
    }
    
    const weekStartDate = new Date(weekStart);
    weekStartDate.setHours(0, 0, 0, 0);
    
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    weekEndDate.setHours(23, 59, 59, 999);
    
    let menu = await Menu.findOne({ schoolId, weekStart: weekStartDate });
    
    if (menu) {
      menu.days = days;
      menu.weekEnd = weekEndDate;
      await menu.save();
    } else {
      menu = await Menu.create({
        schoolId,
        weekStart: weekStartDate,
        weekEnd: weekEndDate,
        days,
        createdBy: req.user.id,
      });
    }
    
    res.json({
      status: true,
      message: menu.isNew ? 'Menu created' : 'Menu updated',
      data: menu,
    });
  } catch (error) {
    console.error('Create/update menu error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get menu for a specific day
router.get('/school/:schoolId/day/:dayOfWeek', authenticateToken, async (req, res) => {
  try {
    const { schoolId, dayOfWeek } = req.params;
    
    const now = new Date();
    
    const menu = await Menu.findOne({
      schoolId,
      weekStart: { $lte: now },
      weekEnd: { $gte: now },
      isActive: true,
    });
    
    if (!menu) {
      return res.status(404).json({
        status: false,
        message: 'No menu found',
      });
    }
    
    const dayMenu = menu.getMenuForDay(parseInt(dayOfWeek));
    
    res.json({
      status: true,
      data: dayMenu || { dayOfWeek: parseInt(dayOfWeek), items: [] },
    });
  } catch (error) {
    console.error('Get day menu error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Update item availability
router.patch('/school/:schoolId/item/:itemId/availability', authenticateToken, async (req, res) => {
  try {
    const { schoolId, itemId } = req.params;
    const { available } = req.body;
    
    const now = new Date();
    
    const menu = await Menu.findOne({
      schoolId,
      weekStart: { $lte: now },
      weekEnd: { $gte: now },
    });
    
    if (!menu) {
      return res.status(404).json({
        status: false,
        message: 'No menu found',
      });
    }
    
    // Find and update item
    let updated = false;
    for (const day of menu.days) {
      const item = day.items.id(itemId);
      if (item) {
        item.available = available;
        updated = true;
        break;
      }
    }
    
    if (!updated) {
      return res.status(404).json({
        status: false,
        message: 'Item not found',
      });
    }
    
    await menu.save();
    
    res.json({
      status: true,
      message: 'Item availability updated',
    });
  } catch (error) {
    console.error('Update item availability error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const MealOrder = require('../models/MealOrder');
const DietaryPreference = require('../models/DietaryPreference');
const Child = require('../models/Child');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get orders for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { status, startDate, endDate, limit = 20 } = req.query;
    
    const query = { childId };
    
    if (status) query.status = status;
    
    if (startDate || endDate) {
      query.orderDate = {};
      if (startDate) query.orderDate.$gte = new Date(startDate);
      if (endDate) query.orderDate.$lte = new Date(endDate);
    }
    
    const orders = await MealOrder.find(query)
      .sort({ orderDate: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create meal order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { childId, schoolId, orderDate, items, notes } = req.body;
    
    if (!childId || !schoolId || !orderDate || !items || items.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'Child ID, school ID, order date, and items are required',
      });
    }
    
    // Check deadline (6 PM day before)
    const orderDateObj = new Date(orderDate);
    const deadline = new Date(orderDateObj);
    deadline.setDate(deadline.getDate() - 1);
    deadline.setHours(18, 0, 0, 0);
    
    if (new Date() > deadline) {
      return res.status(400).json({
        status: false,
        message: 'Order deadline has passed (6 PM day before)',
      });
    }
    
    // Check for allergens
    const dietaryPref = await DietaryPreference.findOne({ childId });
    if (dietaryPref) {
      const allergenWarnings = [];
      for (const item of items) {
        if (item.allergens && dietaryPref.hasAllergens(item.allergens)) {
          allergenWarnings.push(item.name);
        }
      }
      
      if (allergenWarnings.length > 0 && !req.body.acknowledgeAllergens) {
        return res.status(400).json({
          status: false,
          message: 'Items contain allergens',
          data: { allergenWarnings },
          requiresAcknowledgment: true,
        });
      }
    }
    
    // Calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
    
    // Check parent balance
    const child = await Child.findById(childId);
    const parent = await User.findById(child.parentId);
    
    if (parent.balance < totalAmount) {
      return res.status(400).json({
        status: false,
        message: 'Insufficient wallet balance',
        data: { balance: parent.balance, required: totalAmount },
      });
    }
    
    // Create order
    const order = await MealOrder.create({
      childId,
      schoolId,
      parentId: child.parentId,
      orderDate: orderDateObj,
      items,
      totalAmount,
      notes,
      status: 'pending',
      paymentStatus: 'pending',
    });
    
    // Deduct from wallet
    parent.balance -= totalAmount;
    await parent.save();
    
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    await order.save();
    
    // Send notification
    await notificationService.sendFromTemplate(
      'mealOrderConfirmation',
      {
        childName: `${child.firstName} ${child.lastName}`,
        orderDate: orderDateObj,
        items,
        totalAmount,
      },
      ['push', 'email'],
      parent
    );
    
    res.status(201).json({
      status: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Cancel order
router.post('/:orderId/cancel', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    
    const order = await MealOrder.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        status: false,
        message: 'Order not found',
      });
    }
    
    if (!order.canCancel()) {
      return res.status(400).json({
        status: false,
        message: 'Order cannot be cancelled (deadline passed or already processed)',
      });
    }
    
    // Refund to wallet
    if (order.paymentStatus === 'paid') {
      const parent = await User.findById(order.parentId);
      parent.balance += order.totalAmount;
      await parent.save();
      
      order.paymentStatus = 'refunded';
    }
    
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelReason = reason || '';
    await order.save();
    
    res.json({
      status: true,
      message: 'Order cancelled and refunded',
      data: order,
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get orders for a school (for kitchen)
router.get('/school/:schoolId/date/:date', authenticateToken, async (req, res) => {
  try {
    const { schoolId, date } = req.params;
    
    const orderDate = new Date(date);
    orderDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(orderDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const orders = await MealOrder.find({
      schoolId,
      orderDate: { $gte: orderDate, $lt: nextDay },
      status: { $ne: 'cancelled' },
    })
      .populate('childId', 'firstName lastName className')
      .sort({ createdAt: 1 });
    
    // Aggregate items
    const itemSummary = {};
    for (const order of orders) {
      for (const item of order.items) {
        if (!itemSummary[item.name]) {
          itemSummary[item.name] = { name: item.name, quantity: 0 };
        }
        itemSummary[item.name].quantity += item.quantity || 1;
      }
    }
    
    res.json({
      status: true,
      data: {
        orders,
        summary: Object.values(itemSummary),
        totalOrders: orders.length,
      },
    });
  } catch (error) {
    console.error('Get school orders error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Update order status
router.patch('/:orderId/status', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['preparing', 'ready', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid status',
      });
    }
    
    const order = await MealOrder.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        status: false,
        message: 'Order not found',
      });
    }
    
    order.status = status;
    await order.save();
    
    res.json({
      status: true,
      message: 'Order status updated',
      data: order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get all orders for parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    const { status, limit = 20 } = req.query;
    
    const query = { parentId };
    if (status) query.status = status;
    
    const orders = await MealOrder.find(query)
      .populate('childId', 'firstName lastName')
      .sort({ orderDate: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: orders });
  } catch (error) {
    console.error('Get my children orders error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { authenticateToken } = require('../middleware/auth');

// Import models for reset
const User = require('../models/User');
const SchoolProfile = require('../models/SchoolProfile');
const Child = require('../models/Child');
const ScheduledPayment = require('../models/ScheduledPayment');
const Attendance = require('../models/Attendance');
const Passphrase = require('../models/Passphrase');
const GateAccess = require('../models/GateAccess');
const EmergencyAlert = require('../models/EmergencyAlert');
const KudiCoin = require('../models/KudiCoin');
const SavingsGoal = require('../models/SavingsGoal');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Achievement = require('../models/Achievement');
const Menu = require('../models/Menu');
const MealOrder = require('../models/MealOrder');
const CanteenTransaction = require('../models/CanteenTransaction');
const DietaryPreference = require('../models/DietaryPreference');

// Check if demo mode is enabled
const isDemoMode = () => {
  return process.env.DEMO_MODE === 'true' || process.env.NODE_ENV === 'development';
};

// Demo mode middleware
const demoModeRequired = (req, res, next) => {
  if (!isDemoMode()) {
    return res.status(403).json({
      status: false,
      message: 'Demo mode is not enabled',
    });
  }
  next();
};

// Get demo status
router.get('/status', (req, res) => {
  res.json({
    status: true,
    data: {
      demoMode: isDemoMode(),
      environment: process.env.NODE_ENV || 'development',
      features: {
        mockPaystack: true,
        mockNotifications: true,
        seedData: true,
        timeManipulation: isDemoMode(),
      },
    },
  });
});

// Reset database to seed state
router.post('/reset', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { preserveUsers = false } = req.body;
    
    // Clear demo data
    const collections = [
      Attendance,
      Passphrase,
      GateAccess,
      EmergencyAlert,
      KudiCoin,
      SavingsGoal,
      QuizAttempt,
      Achievement,
      MealOrder,
      CanteenTransaction,
      DietaryPreference,
    ];
    
    for (const Model of collections) {
      await Model.deleteMany({});
    }
    
    // Reset scheduled payments to pending
    await ScheduledPayment.updateMany(
      { status: { $in: ['completed', 'failed'] } },
      { $set: { status: 'pending', processedAt: null } }
    );
    
    // Reset user balances
    if (!preserveUsers) {
      await User.updateMany(
        { email: { $regex: /demo\.com$/ } },
        { $set: { balance: 500000 } }
      );
    }
    
    // Re-run seed script
    const { exec } = require('child_process');
    exec('npm run seed', { cwd: __dirname + '/..' }, (error, stdout, stderr) => {
      if (error) {
        console.error('Seed error:', error);
      }
      console.log('Seed output:', stdout);
    });
    
    res.json({
      status: true,
      message: 'Database reset to seed state',
    });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Simulate payment event
router.post('/simulate/payment', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { childId, feeType, amount, status = 'success' } = req.body;
    
    if (!childId || !feeType || !amount) {
      return res.status(400).json({
        status: false,
        message: 'Child ID, fee type, and amount are required',
      });
    }
    
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        status: false,
        message: 'Child not found',
      });
    }
    
    // Create scheduled payment
    const payment = await ScheduledPayment.create({
      parentId: child.parentId,
      childId,
      schoolId: child.schoolId,
      feeType,
      amount,
      status: status === 'success' ? 'completed' : 'failed',
      dueDate: new Date(),
      processedAt: new Date(),
      recurrence: 'once',
    });
    
    res.json({
      status: true,
      message: `Payment ${status} simulated`,
      data: payment,
    });
  } catch (error) {
    console.error('Simulate payment error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Simulate attendance event
router.post('/simulate/attendance', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { childId, action = 'check_in' } = req.body;
    
    if (!childId) {
      return res.status(400).json({
        status: false,
        message: 'Child ID is required',
      });
    }
    
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        status: false,
        message: 'Child not found',
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let attendance = await Attendance.findOne({ childId, date: today });
    
    if (!attendance) {
      attendance = new Attendance({
        childId,
        schoolId: child.schoolId,
        date: today,
      });
    }
    
    const now = new Date();
    
    if (action === 'check_in') {
      attendance.checkInTime = now;
      attendance.status = 'checked_in';
    } else if (action === 'check_out') {
      attendance.checkOutTime = now;
      attendance.status = 'checked_out';
    }
    
    await attendance.save();
    
    res.json({
      status: true,
      message: `${action} simulated`,
      data: attendance,
    });
  } catch (error) {
    console.error('Simulate attendance error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Simulate emergency alert
router.post('/simulate/emergency', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { schoolId, type = 'security', severity = 'medium', message } = req.body;
    
    if (!schoolId || !message) {
      return res.status(400).json({
        status: false,
        message: 'School ID and message are required',
      });
    }
    
    const alert = await EmergencyAlert.create({
      schoolId,
      createdBy: req.user.id,
      type,
      severity,
      title: `Demo ${type} Alert`,
      message,
      totalRecipients: 0,
    });
    
    res.json({
      status: true,
      message: 'Emergency alert simulated',
      data: alert,
    });
  } catch (error) {
    console.error('Simulate emergency error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Test notification
router.post('/test-notification', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { channel, title, body } = req.body;
    
    const notificationService = require('../services/notifications');
    
    const user = await User.findById(req.user.id);
    
    const result = await notificationService.dispatch({
      userId: req.user.id,
      type: 'test',
      title: title || 'Test Notification',
      body: body || 'This is a test notification from KudEgOwo',
      channels: channel ? [channel] : ['email', 'sms', 'push'],
      user,
    });
    
    res.json({
      status: true,
      message: 'Test notification sent',
      data: result,
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get demo credentials
router.get('/credentials', demoModeRequired, (req, res) => {
  res.json({
    status: true,
    data: {
      users: [
        { role: 'Parent', email: 'ada.okonkwo@demo.com', password: 'Demo123!' },
        { role: 'Parent', email: 'chidi.eze@demo.com', password: 'Demo123!' },
        { role: 'School Admin', email: 'admin@greensprings.demo.com', password: 'Demo123!' },
        { role: 'Tutor', email: 'tutor@demo.com', password: 'Demo123!' },
      ],
      testCards: {
        success: '4084 0840 8408 4081',
        insufficient_funds: '4084 0840 8408 4082',
        declined: '4084 0840 8408 4083',
      },
    },
  });
});

// Switch persona (for demo)
router.post('/switch-persona', authenticateToken, demoModeRequired, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        status: false,
        message: 'Email is required',
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
    
    // Generate new token for the user
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      status: true,
      message: `Switched to ${user.firstName} ${user.lastName}`,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Switch persona error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

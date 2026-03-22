const express = require('express');
const router = express.Router();
const EmergencyAlert = require('../models/EmergencyAlert');
const Child = require('../models/Child');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get alerts for a school
router.get('/school/:schoolId', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { status, severity, limit = 20 } = req.query;
    
    const query = { schoolId };
    
    if (status === 'active') {
      query.resolvedAt = null;
    } else if (status === 'resolved') {
      query.resolvedAt = { $ne: null };
    }
    
    if (severity) {
      query.severity = severity;
    }
    
    const alerts = await EmergencyAlert.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName')
      .populate('resolvedBy', 'firstName lastName');
    
    res.json({ status: true, data: alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create emergency alert
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { schoolId, type, severity, title, message } = req.body;
    
    if (!schoolId || !type || !severity || !title || !message) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }
    
    // Get all parents with children in this school
    const children = await Child.find({ schoolId }).distinct('parentId');
    const parents = await User.find({ _id: { $in: children } });
    
    // Create alert
    const alert = await EmergencyAlert.create({
      schoolId,
      createdBy: req.user.id,
      type,
      severity,
      title,
      message,
      totalRecipients: parents.length,
      deliveryStatus: {
        sms: { sent: 0, failed: 0 },
        email: { sent: 0, failed: 0 },
        push: { sent: 0, failed: 0 },
        whatsapp: { sent: 0, failed: 0 },
      },
    });
    
    // Broadcast to all parents
    const deliveryResults = {
      sms: { sent: 0, failed: 0 },
      email: { sent: 0, failed: 0 },
      push: { sent: 0, failed: 0 },
      whatsapp: { sent: 0, failed: 0 },
    };
    
    for (const parent of parents) {
      try {
        const results = await notificationService.sendEmergencyAlert(parent, {
          schoolName: 'School', // Would need to populate
          alertType: type,
          severity,
          message,
        });
        
        // Track delivery results
        for (const [channel, result] of Object.entries(results)) {
          if (result.status === 'sent') {
            deliveryResults[channel].sent++;
          } else {
            deliveryResults[channel].failed++;
          }
        }
      } catch (error) {
        console.error(`Failed to notify parent ${parent._id}:`, error);
      }
    }
    
    // Update alert with delivery status
    alert.deliveryStatus = deliveryResults;
    await alert.save();
    
    res.status(201).json({
      status: true,
      message: 'Emergency alert created and broadcast',
      data: alert,
    });
  } catch (error) {
    console.error('Create alert error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Acknowledge alert
router.post('/:alertId/acknowledge', authenticateToken, async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const alert = await EmergencyAlert.findById(alertId);
    
    if (!alert) {
      return res.status(404).json({
        status: false,
        message: 'Alert not found',
      });
    }
    
    // Check if already acknowledged
    const alreadyAcknowledged = alert.acknowledgedBy.some(
      ack => ack.userId.toString() === req.user.id
    );
    
    if (alreadyAcknowledged) {
      return res.status(400).json({
        status: false,
        message: 'Already acknowledged',
      });
    }
    
    alert.acknowledgedBy.push({
      userId: req.user.id,
      acknowledgedAt: new Date(),
    });
    
    await alert.save();
    
    res.json({
      status: true,
      message: 'Alert acknowledged',
      data: {
        acknowledgmentCount: alert.acknowledgedBy.length,
        acknowledgmentRate: alert.acknowledgmentRate,
      },
    });
  } catch (error) {
    console.error('Acknowledge alert error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Resolve alert
router.post('/:alertId/resolve', authenticateToken, async (req, res) => {
  try {
    const { alertId } = req.params;
    const { notes } = req.body;
    
    const alert = await EmergencyAlert.findById(alertId);
    
    if (!alert) {
      return res.status(404).json({
        status: false,
        message: 'Alert not found',
      });
    }
    
    if (alert.resolvedAt) {
      return res.status(400).json({
        status: false,
        message: 'Alert already resolved',
      });
    }
    
    alert.resolvedAt = new Date();
    alert.resolvedBy = req.user.id;
    alert.resolutionNotes = notes || '';
    
    await alert.save();
    
    res.json({
      status: true,
      message: 'Alert resolved',
      data: alert,
    });
  } catch (error) {
    console.error('Resolve alert error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get alert details with acknowledgments
router.get('/:alertId', authenticateToken, async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const alert = await EmergencyAlert.findById(alertId)
      .populate('createdBy', 'firstName lastName')
      .populate('resolvedBy', 'firstName lastName')
      .populate('acknowledgedBy.userId', 'firstName lastName');
    
    if (!alert) {
      return res.status(404).json({
        status: false,
        message: 'Alert not found',
      });
    }
    
    res.json({ status: true, data: alert });
  } catch (error) {
    console.error('Get alert error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const GateAccess = require('../models/GateAccess');
const { authenticateToken } = require('../middleware/auth');

// Get access logs for a school
router.get('/school/:schoolId', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { 
      startDate, 
      endDate, 
      authorized, 
      action,
      limit = 50,
      page = 1,
    } = req.query;
    
    const query = { schoolId };
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    if (authorized !== undefined) {
      query.authorized = authorized === 'true';
    }
    
    if (action) {
      query.action = action;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [logs, total] = await Promise.all([
      GateAccess.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('childId', 'firstName lastName className'),
      GateAccess.countDocuments(query),
    ]);
    
    res.json({
      status: true,
      data: logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get access logs error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get unauthorized attempts for a school
router.get('/school/:schoolId/unauthorized', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { limit = 20 } = req.query;
    
    const logs = await GateAccess.find({
      schoolId,
      authorized: false,
    })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: logs });
  } catch (error) {
    console.error('Get unauthorized attempts error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get access history for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { limit = 30 } = req.query;
    
    const logs = await GateAccess.find({ childId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: logs });
  } catch (error) {
    console.error('Get child access history error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get access statistics for a school
router.get('/school/:schoolId/stats', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { date } = req.query;
    
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const stats = await GateAccess.aggregate([
      {
        $match: {
          schoolId: require('mongoose').Types.ObjectId(schoolId),
          timestamp: { $gte: targetDate, $lt: nextDay },
        },
      },
      {
        $group: {
          _id: {
            action: '$action',
            authorized: '$authorized',
          },
          count: { $sum: 1 },
        },
      },
    ]);
    
    const result = {
      checkIns: { authorized: 0, unauthorized: 0 },
      checkOuts: { authorized: 0, unauthorized: 0 },
      totalAttempts: 0,
      unauthorizedAttempts: 0,
    };
    
    stats.forEach(({ _id, count }) => {
      if (_id.action === 'check_in') {
        if (_id.authorized) {
          result.checkIns.authorized = count;
        } else {
          result.checkIns.unauthorized = count;
          result.unauthorizedAttempts += count;
        }
      } else if (_id.action === 'check_out') {
        if (_id.authorized) {
          result.checkOuts.authorized = count;
        } else {
          result.checkOuts.unauthorized = count;
          result.unauthorizedAttempts += count;
        }
      }
      result.totalAttempts += count;
    });
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get access stats error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

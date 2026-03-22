const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Child = require('../models/Child');
const Passphrase = require('../models/Passphrase');
const GateAccess = require('../models/GateAccess');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get attendance for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { startDate, endDate } = req.query;
    
    const query = { childId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const attendance = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(30);
    
    res.json({ status: true, data: attendance });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get attendance for a school (today)
router.get('/school/:schoolId/today', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const attendance = await Attendance.find({
      schoolId,
      date: { $gte: today, $lt: tomorrow },
    }).populate('childId', 'firstName lastName className');
    
    // Get all children for the school
    const children = await Child.find({ schoolId }).select('firstName lastName className');
    
    // Map attendance status
    const attendanceMap = new Map(
      attendance.map(a => [a.childId._id.toString(), a])
    );
    
    const result = children.map(child => ({
      child: {
        _id: child._id,
        firstName: child.firstName,
        lastName: child.lastName,
        className: child.className,
      },
      attendance: attendanceMap.get(child._id.toString()) || {
        status: 'absent',
        checkInTime: null,
        checkOutTime: null,
      },
    }));
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get school attendance error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Check in a child
router.post('/check-in', authenticateToken, async (req, res) => {
  try {
    const { passphrase, schoolId } = req.body;
    
    if (!passphrase || !schoolId) {
      return res.status(400).json({
        status: false,
        message: 'Passphrase and school ID are required',
      });
    }
    
    // Find valid passphrase
    const passphraseDoc = await Passphrase.findOne({
      code: passphrase,
      schoolId,
      used: false,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    }).populate('childId');
    
    // Log gate access attempt
    const accessLog = await GateAccess.create({
      schoolId,
      childId: passphraseDoc?.childId?._id || null,
      passphraseUsed: passphrase,
      action: 'check_in',
      authorized: !!passphraseDoc,
      reason: passphraseDoc ? 'Valid passphrase' : 'Invalid or expired passphrase',
    });
    
    if (!passphraseDoc) {
      return res.status(401).json({
        status: false,
        message: 'Invalid or expired passphrase',
        accessLog: accessLog._id,
      });
    }
    
    const child = passphraseDoc.childId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create or update attendance record
    let attendance = await Attendance.findOne({
      childId: child._id,
      date: today,
    });
    
    if (attendance && attendance.checkInTime) {
      return res.status(400).json({
        status: false,
        message: 'Child already checked in today',
      });
    }
    
    const now = new Date();
    const isLate = now.getHours() >= 9; // After 9 AM is late
    
    if (!attendance) {
      attendance = new Attendance({
        childId: child._id,
        schoolId,
        date: today,
      });
    }
    
    attendance.checkInTime = now;
    attendance.checkInPassphrase = passphrase;
    attendance.status = isLate ? 'late' : 'checked_in';
    await attendance.save();
    
    // Mark passphrase as used for check-in
    passphraseDoc.used = true;
    passphraseDoc.usedAt = now;
    passphraseDoc.usedFor = 'check_in';
    await passphraseDoc.save();
    
    // Send notification to parent
    const User = require('../models/User');
    const parent = await User.findById(child.parentId);
    if (parent) {
      await notificationService.sendAttendanceAlert(parent, {
        childName: `${child.firstName} ${child.lastName}`,
        action: 'check_in',
        time: now,
        schoolName: 'School', // Would need to populate
      });
    }
    
    res.json({
      status: true,
      message: 'Check-in successful',
      data: {
        child: {
          _id: child._id,
          firstName: child.firstName,
          lastName: child.lastName,
          className: child.className,
        },
        checkInTime: now,
        isLate,
      },
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Check out a child
router.post('/check-out', authenticateToken, async (req, res) => {
  try {
    const { passphrase, schoolId } = req.body;
    
    if (!passphrase || !schoolId) {
      return res.status(400).json({
        status: false,
        message: 'Passphrase and school ID are required',
      });
    }
    
    // Find valid passphrase
    const passphraseDoc = await Passphrase.findOne({
      code: passphrase,
      schoolId,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    }).populate('childId');
    
    // Log gate access attempt
    const accessLog = await GateAccess.create({
      schoolId,
      childId: passphraseDoc?.childId?._id || null,
      passphraseUsed: passphrase,
      action: 'check_out',
      authorized: !!passphraseDoc,
      reason: passphraseDoc ? 'Valid passphrase' : 'Invalid or expired passphrase',
    });
    
    if (!passphraseDoc) {
      return res.status(401).json({
        status: false,
        message: 'Invalid or expired passphrase',
        accessLog: accessLog._id,
      });
    }
    
    const child = passphraseDoc.childId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find attendance record
    let attendance = await Attendance.findOne({
      childId: child._id,
      date: today,
    });
    
    const now = new Date();
    
    if (!attendance || !attendance.checkInTime) {
      // Warn but allow check-out
      console.warn(`Check-out without check-in for child ${child._id}`);
      
      if (!attendance) {
        attendance = new Attendance({
          childId: child._id,
          schoolId,
          date: today,
        });
      }
    }
    
    attendance.checkOutTime = now;
    attendance.checkOutPassphrase = passphrase;
    attendance.status = 'checked_out';
    await attendance.save();
    
    // Send notification to parent
    const User = require('../models/User');
    const parent = await User.findById(child.parentId);
    if (parent) {
      await notificationService.sendAttendanceAlert(parent, {
        childName: `${child.firstName} ${child.lastName}`,
        action: 'check_out',
        time: now,
        schoolName: 'School',
      });
    }
    
    res.json({
      status: true,
      message: 'Check-out successful',
      data: {
        child: {
          _id: child._id,
          firstName: child.firstName,
          lastName: child.lastName,
          className: child.className,
        },
        checkOutTime: now,
      },
    });
  } catch (error) {
    console.error('Check-out error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get attendance statistics for a school
router.get('/school/:schoolId/stats', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { date } = req.query;
    
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const totalChildren = await Child.countDocuments({ schoolId });
    
    const attendance = await Attendance.aggregate([
      {
        $match: {
          schoolId: require('mongoose').Types.ObjectId(schoolId),
          date: { $gte: targetDate, $lt: nextDay },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    
    const stats = {
      total: totalChildren,
      checkedIn: 0,
      checkedOut: 0,
      late: 0,
      absent: totalChildren,
    };
    
    attendance.forEach(({ _id, count }) => {
      if (_id === 'checked_in') {
        stats.checkedIn = count;
        stats.absent -= count;
      } else if (_id === 'checked_out') {
        stats.checkedOut = count;
        stats.absent -= count;
      } else if (_id === 'late') {
        stats.late = count;
        stats.absent -= count;
      }
    });
    
    stats.attendanceRate = totalChildren > 0
      ? ((totalChildren - stats.absent) / totalChildren) * 100
      : 0;
    
    res.json({ status: true, data: stats });
  } catch (error) {
    console.error('Get attendance stats error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

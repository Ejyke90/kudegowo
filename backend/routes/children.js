const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');
const Child = require('../models/Child');
const SchoolProfile = require('../models/SchoolProfile');
const FeeCategory = require('../models/FeeCategory');
const ScheduledPayment = require('../models/ScheduledPayment');
const validators = require('../validators/child');

const MAX_CHILDREN_PER_SCHOOL = 20;

router.use(apiLimiter);

// Create child
router.post('/', auth, validators.createChild, validate, async (req, res) => {
  try {
    const { firstName, lastName, schoolProfile, grade, studentId, dateOfBirth } = req.body;

    // Verify school profile belongs to parent
    const school = await SchoolProfile.findOne({
      _id: schoolProfile,
      createdBy: req.userId
    });

    if (!school) {
      return res.status(400).json({ error: 'School profile not found' });
    }

    // Check children limit per school
    const childCount = await Child.countDocuments({
      schoolProfile,
      isActive: true
    });

    if (childCount >= MAX_CHILDREN_PER_SCHOOL) {
      return res.status(429).json({
        error: `Maximum children per school reached (${MAX_CHILDREN_PER_SCHOOL})`
      });
    }

    const child = new Child({
      firstName,
      lastName,
      parent: req.userId,
      schoolProfile,
      grade,
      studentId,
      dateOfBirth
    });

    await child.save();

    res.status(201).json({
      message: 'Child added successfully',
      child
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'A child with this name already exists at this school'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// List children
router.get('/', auth, validators.listChildren, validate, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;

    const filter = { parent: req.userId };

    if (req.query.schoolProfile) {
      filter.schoolProfile = req.query.schoolProfile;
    }
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }

    const [children, total] = await Promise.all([
      Child.find(filter)
        .populate('schoolProfile', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Child.countDocuments(filter)
    ]);

    res.json({
      status: true,
      data: children,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get child detail with fee summary
router.get('/:id', auth, validators.getChild, validate, async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.userId
    })
    .populate('schoolProfile', 'name schoolType')
    .lean();

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Get fee summary
    const now = new Date();
    const feeCategories = await FeeCategory.find({
      schoolProfile: child.schoolProfile._id,
      isActive: true,
      $or: [
        { applicableTo: { $size: 0 } },
        { applicableTo: child._id }
      ]
    }).lean();

    const scheduledPayments = await ScheduledPayment.find({
      child: child._id,
      parent: req.userId
    }).lean();

    const totalObligations = feeCategories.reduce((sum, fc) => sum + fc.amount, 0);
    const paid = scheduledPayments
      .filter(sp => sp.status === 'completed')
      .reduce((sum, sp) => sum + sp.amount, 0);
    const pending = scheduledPayments
      .filter(sp => sp.status === 'pending')
      .reduce((sum, sp) => sum + sp.amount, 0);

    const overdueFees = feeCategories.filter(fc => fc.dueDate && new Date(fc.dueDate) < now);
    const overdue = overdueFees.reduce((sum, fc) => sum + fc.amount, 0);

    const upcomingPayments = scheduledPayments
      .filter(sp => sp.status === 'pending' && new Date(sp.scheduledDate) > now)
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
      .slice(0, 5);

    res.json({
      child,
      feeSummary: {
        totalObligations,
        paid,
        pending,
        overdue,
        upcomingPayments
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update child (supports school transfer)
router.put('/:id', auth, validators.updateChild, validate, async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.userId
    });

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const { firstName, lastName, schoolProfile, grade, studentId, dateOfBirth } = req.body;
    let cancelledPayments = 0;

    // Handle school transfer
    if (schoolProfile && schoolProfile !== child.schoolProfile.toString()) {
      // Verify new school profile belongs to parent
      const newSchool = await SchoolProfile.findOne({
        _id: schoolProfile,
        createdBy: req.userId
      });

      if (!newSchool) {
        return res.status(400).json({ error: 'School profile not found' });
      }

      // Cancel pending scheduled payments at old school
      const result = await ScheduledPayment.updateMany(
        { child: child._id, status: 'pending' },
        {
          $set: {
            status: 'cancelled',
            failureReason: 'Child transferred to different school'
          }
        }
      );
      cancelledPayments = result.modifiedCount;
    }

    // Apply updates
    if (firstName !== undefined) child.firstName = firstName;
    if (lastName !== undefined) child.lastName = lastName;
    if (schoolProfile !== undefined) child.schoolProfile = schoolProfile;
    if (grade !== undefined) child.grade = grade;
    if (studentId !== undefined) child.studentId = studentId;
    if (dateOfBirth !== undefined) child.dateOfBirth = dateOfBirth;

    await child.save();

    res.json({
      message: 'Child updated',
      child,
      cancelledPayments
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'A child with this name already exists at this school'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Deactivate child (soft delete)
router.delete('/:id', auth, validators.getChild, validate, async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.userId
    });

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    if (!child.isActive) {
      return res.status(400).json({ error: 'Child is already inactive' });
    }

    // Cancel pending scheduled payments
    const result = await ScheduledPayment.updateMany(
      { child: child._id, status: 'pending' },
      {
        $set: {
          status: 'cancelled',
          failureReason: 'Child deactivated'
        }
      }
    );

    // Remove child from fee category applicableTo arrays
    await FeeCategory.updateMany(
      { applicableTo: child._id },
      { $pull: { applicableTo: child._id } }
    );

    child.isActive = false;
    await child.save();

    res.json({
      message: 'Child deactivated',
      cancelledPayments: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

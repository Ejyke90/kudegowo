const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');
const FeeCategory = require('../models/FeeCategory');
const SchoolProfile = require('../models/SchoolProfile');
const Child = require('../models/Child');
const ScheduledPayment = require('../models/ScheduledPayment');
const validators = require('../validators/feeCategory');

const MAX_FEES_PER_SCHOOL = 50;

router.use(apiLimiter);

// Create fee category
router.post('/', auth, validators.createFeeCategory, validate, async (req, res) => {
  try {
    const {
      name, description, category, amount, dueDate,
      isRecurring, recurrenceRule, schoolProfile, applicableTo
    } = req.body;

    // Verify school profile belongs to parent
    const school = await SchoolProfile.findOne({
      _id: schoolProfile,
      createdBy: req.userId
    });

    if (!school) {
      return res.status(400).json({ error: 'School profile not found' });
    }

    // Check fee limit per school
    const feeCount = await FeeCategory.countDocuments({
      schoolProfile,
      isActive: true
    });

    if (feeCount >= MAX_FEES_PER_SCHOOL) {
      return res.status(429).json({
        error: `Maximum fee categories per school reached (${MAX_FEES_PER_SCHOOL})`
      });
    }

    // Validate dueDate is in the future
    if (dueDate && new Date(dueDate) <= new Date()) {
      return res.status(400).json({ error: 'Due date must be in the future' });
    }

    // Validate recurrenceRule when isRecurring
    if (isRecurring && !recurrenceRule) {
      return res.status(400).json({
        error: 'Recurrence rule is required for recurring fees'
      });
    }

    if (recurrenceRule && recurrenceRule.endDate && recurrenceRule.startDate) {
      if (new Date(recurrenceRule.endDate) <= new Date(recurrenceRule.startDate)) {
        return res.status(400).json({
          error: 'End date must be after start date'
        });
      }
    }

    // Validate applicableTo children belong to the same school
    if (applicableTo && applicableTo.length > 0) {
      const children = await Child.find({
        _id: { $in: applicableTo },
        parent: req.userId,
        schoolProfile
      });

      if (children.length !== applicableTo.length) {
        return res.status(400).json({
          error: 'One or more children are not enrolled at this school'
        });
      }
    }

    const feeCategory = new FeeCategory({
      name,
      description,
      category,
      amount,
      dueDate,
      isRecurring: isRecurring || false,
      recurrenceRule: isRecurring ? recurrenceRule : undefined,
      schoolProfile,
      createdBy: req.userId,
      applicableTo: applicableTo || []
    });

    await feeCategory.save();

    res.status(201).json({
      message: 'Fee category created',
      feeCategory
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'A fee category with this name already exists at this school'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// List fee categories
router.get('/', auth, validators.listFeeCategories, validate, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;

    const filter = { createdBy: req.userId };

    if (req.query.schoolProfile) filter.schoolProfile = req.query.schoolProfile;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
    if (req.query.isRecurring !== undefined) filter.isRecurring = req.query.isRecurring === 'true';

    // Date range filter
    if (req.query.dueBefore || req.query.dueAfter) {
      filter.dueDate = {};
      if (req.query.dueAfter) filter.dueDate.$gte = new Date(req.query.dueAfter);
      if (req.query.dueBefore) filter.dueDate.$lte = new Date(req.query.dueBefore);
    }

    const [feeCategories, total] = await Promise.all([
      FeeCategory.find(filter)
        .populate('schoolProfile', 'name')
        .populate('applicableTo', 'firstName lastName')
        .sort({ dueDate: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      FeeCategory.countDocuments(filter)
    ]);

    res.json({
      feeCategories,
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

// Upcoming fees aggregation
router.get('/upcoming', auth, validators.upcomingFees, validate, async (req, res) => {
  try {
    const days = req.query.days || 30;
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    // Get active fee categories with due dates in window (or past-due / overdue)
    const feeCategories = await FeeCategory.find({
      createdBy: req.userId,
      isActive: true,
      dueDate: { $lte: futureDate }
    })
    .populate('schoolProfile', 'name')
    .populate('applicableTo', 'firstName lastName')
    .sort({ dueDate: 1 })
    .lean();

    // Get all applicable children for fees with empty applicableTo
    const schoolProfileIds = [...new Set(feeCategories.map(fc => fc.schoolProfile._id.toString()))];
    const allChildren = await Child.find({
      parent: req.userId,
      schoolProfile: { $in: schoolProfileIds },
      isActive: true
    }).lean();

    // Build upcoming list
    const upcoming = [];
    for (const fc of feeCategories) {
      const targetChildren = fc.applicableTo.length > 0
        ? fc.applicableTo
        : allChildren.filter(c => c.schoolProfile.toString() === fc.schoolProfile._id.toString());

      for (const child of targetChildren) {
        const isOverdue = fc.dueDate && new Date(fc.dueDate) < now;
        const daysUntilDue = Math.ceil((new Date(fc.dueDate) - now) / (1000 * 60 * 60 * 24));

        upcoming.push({
          feeCategory: {
            _id: fc._id,
            name: fc.name,
            category: fc.category,
            amount: fc.amount
          },
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName
          },
          schoolProfile: {
            _id: fc.schoolProfile._id,
            name: fc.schoolProfile.name
          },
          dueDate: fc.dueDate,
          daysUntilDue,
          isOverdue
        });
      }
    }

    // Sort by due date
    upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const overdueItems = upcoming.filter(u => u.isOverdue);

    res.json({
      upcoming,
      summary: {
        totalAmount: upcoming.reduce((sum, u) => sum + u.feeCategory.amount, 0),
        count: upcoming.length,
        overdueCount: overdueItems.length,
        overdueAmount: overdueItems.reduce((sum, u) => sum + u.feeCategory.amount, 0)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fee category detail with per-child payment status
router.get('/:id', auth, validators.getFeeCategory, validate, async (req, res) => {
  try {
    const feeCategory = await FeeCategory.findOne({
      _id: req.params.id,
      createdBy: req.userId
    })
    .populate('schoolProfile', 'name')
    .populate('applicableTo', 'firstName lastName')
    .lean();

    if (!feeCategory) {
      return res.status(404).json({ error: 'Fee category not found' });
    }

    // Get applicable children
    let targetChildren;
    if (feeCategory.applicableTo.length > 0) {
      targetChildren = feeCategory.applicableTo;
    } else {
      targetChildren = await Child.find({
        parent: req.userId,
        schoolProfile: feeCategory.schoolProfile._id,
        isActive: true
      }).select('firstName lastName').lean();
    }

    // Get payment status per child
    const paymentStatus = await Promise.all(
      targetChildren.map(async (child) => {
        const payment = await ScheduledPayment.findOne({
          child: child._id,
          feeCategory: feeCategory._id
        })
        .populate('transaction', 'reference amount')
        .sort({ createdAt: -1 })
        .lean();

        return {
          child: { _id: child._id, firstName: child.firstName, lastName: child.lastName },
          status: payment ? payment.status : 'not_scheduled',
          paidAmount: payment && payment.status === 'completed' ? payment.amount : 0,
          paidDate: payment && payment.status === 'completed' ? payment.updatedAt : null,
          transaction: payment ? payment.transaction : null,
          scheduledPayment: payment ? payment._id : null
        };
      })
    );

    res.json({ feeCategory, paymentStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update fee category
router.put('/:id', auth, validators.updateFeeCategory, validate, async (req, res) => {
  try {
    const feeCategory = await FeeCategory.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!feeCategory) {
      return res.status(404).json({ error: 'Fee category not found' });
    }

    const {
      name, description, category, amount, dueDate,
      isRecurring, recurrenceRule, applicableTo, isActive
    } = req.body;

    // Check if amount is changing and there are pending payments
    let pendingPaymentsCount = 0;
    let warning = null;

    if (amount !== undefined && amount !== feeCategory.amount) {
      pendingPaymentsCount = await ScheduledPayment.countDocuments({
        feeCategory: feeCategory._id,
        status: 'pending'
      });

      if (pendingPaymentsCount > 0) {
        warning = `${pendingPaymentsCount} pending scheduled payments still use the previous amount (₦${feeCategory.amount.toLocaleString()}). Use 'Update Future Payments' to apply the new amount.`;
      }
    }

    // Handle deactivation side effects
    let cancelledPayments = 0;
    if (isActive === false && feeCategory.isActive === true) {
      const result = await ScheduledPayment.updateMany(
        { feeCategory: feeCategory._id, status: 'pending' },
        {
          $set: {
            status: 'cancelled',
            failureReason: 'Fee category deactivated'
          }
        }
      );
      cancelledPayments = result.modifiedCount;
    }

    // Validate applicableTo children belong to same school
    if (applicableTo && applicableTo.length > 0) {
      const children = await Child.find({
        _id: { $in: applicableTo },
        parent: req.userId,
        schoolProfile: feeCategory.schoolProfile
      });

      if (children.length !== applicableTo.length) {
        return res.status(400).json({
          error: 'One or more children are not enrolled at this school'
        });
      }
    }

    // Apply updates
    if (name !== undefined) feeCategory.name = name;
    if (description !== undefined) feeCategory.description = description;
    if (category !== undefined) feeCategory.category = category;
    if (amount !== undefined) feeCategory.amount = amount;
    if (dueDate !== undefined) feeCategory.dueDate = dueDate;
    if (isRecurring !== undefined) feeCategory.isRecurring = isRecurring;
    if (recurrenceRule !== undefined) feeCategory.recurrenceRule = recurrenceRule;
    if (applicableTo !== undefined) feeCategory.applicableTo = applicableTo;
    if (isActive !== undefined) feeCategory.isActive = isActive;

    await feeCategory.save();

    const response = {
      message: 'Fee category updated',
      feeCategory
    };

    if (warning) {
      response.warning = warning;
      response.pendingPaymentsCount = pendingPaymentsCount;
    }
    if (cancelledPayments > 0) {
      response.cancelledPayments = cancelledPayments;
    }

    res.json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'A fee category with this name already exists at this school'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update future payments (batch update pending payment amounts)
router.put('/:id/update-future-payments', auth, validators.updateFuturePayments, validate, async (req, res) => {
  try {
    const feeCategory = await FeeCategory.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!feeCategory) {
      return res.status(404).json({ error: 'Fee category not found' });
    }

    const { newAmount } = req.body;

    const result = await ScheduledPayment.updateMany(
      { feeCategory: feeCategory._id, status: 'pending' },
      { $set: { amount: newAmount } }
    );

    res.json({
      message: `Updated ${result.modifiedCount} pending scheduled payments to ₦${newAmount.toLocaleString()}`,
      updatedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deactivate fee category
router.delete('/:id', auth, validators.getFeeCategory, validate, async (req, res) => {
  try {
    const feeCategory = await FeeCategory.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!feeCategory) {
      return res.status(404).json({ error: 'Fee category not found' });
    }

    // Cancel pending scheduled payments
    const result = await ScheduledPayment.updateMany(
      { feeCategory: feeCategory._id, status: 'pending' },
      {
        $set: {
          status: 'cancelled',
          failureReason: 'Fee category deactivated'
        }
      }
    );

    feeCategory.isActive = false;
    await feeCategory.save();

    res.json({
      message: 'Fee category deactivated',
      cancelledPayments: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

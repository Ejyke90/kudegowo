const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { apiLimiter, paymentLimiter } = require('../middleware/rateLimiter');
const ScheduledPayment = require('../models/ScheduledPayment');
const FeeCategory = require('../models/FeeCategory');
const Child = require('../models/Child');
const SchoolProfile = require('../models/SchoolProfile');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { computeNextDate } = require('../utils/recurrence');
const validators = require('../validators/scheduledPayment');

const MAX_PENDING_PAYMENTS = 100;

router.use(apiLimiter);

// Create scheduled payment
router.post('/', auth, validators.createScheduledPayment, validate, async (req, res) => {
  try {
    const { child: childId, feeCategory: feeCategoryId, scheduledDate } = req.body;

    // Verify child belongs to parent
    const child = await Child.findOne({ _id: childId, parent: req.userId, isActive: true });
    if (!child) {
      return res.status(400).json({ error: 'Child not found or inactive' });
    }

    // Verify fee category belongs to parent
    const feeCategory = await FeeCategory.findOne({
      _id: feeCategoryId,
      createdBy: req.userId,
      isActive: true
    });
    if (!feeCategory) {
      return res.status(400).json({ error: 'Fee category not found or inactive' });
    }

    // Verify child is at the same school as the fee category
    if (child.schoolProfile.toString() !== feeCategory.schoolProfile.toString()) {
      return res.status(400).json({
        error: 'Child is not enrolled at the school for this fee category'
      });
    }

    // Check pending payment limit
    const pendingCount = await ScheduledPayment.countDocuments({
      parent: req.userId,
      status: 'pending'
    });
    if (pendingCount >= MAX_PENDING_PAYMENTS) {
      return res.status(429).json({
        error: `Maximum pending scheduled payments reached (${MAX_PENDING_PAYMENTS})`
      });
    }

    const scheduledPayment = new ScheduledPayment({
      parent: req.userId,
      child: childId,
      feeCategory: feeCategoryId,
      amount: feeCategory.amount,
      scheduledDate: new Date(scheduledDate),
      status: 'pending'
    });

    await scheduledPayment.save();

    const populated = await ScheduledPayment.findById(scheduledPayment._id)
      .populate('child', 'firstName lastName')
      .populate('feeCategory', 'name amount category')
      .lean();

    res.status(201).json({
      message: 'Payment scheduled',
      scheduledPayment: populated
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'A payment is already scheduled for this child and fee on this date'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Bulk create scheduled payments for all applicable children of a fee category
router.post('/bulk', auth, validators.bulkCreateScheduledPayment, validate, async (req, res) => {
  try {
    const { feeCategory: feeCategoryId, scheduledDate } = req.body;

    const feeCategory = await FeeCategory.findOne({
      _id: feeCategoryId,
      createdBy: req.userId,
      isActive: true
    }).populate('applicableTo', 'firstName lastName');

    if (!feeCategory) {
      return res.status(400).json({ error: 'Fee category not found or inactive' });
    }

    // Get target children
    let targetChildren;
    if (feeCategory.applicableTo.length > 0) {
      targetChildren = feeCategory.applicableTo;
    } else {
      targetChildren = await Child.find({
        parent: req.userId,
        schoolProfile: feeCategory.schoolProfile,
        isActive: true
      }).select('firstName lastName');
    }

    let created = 0;
    let skipped = 0;
    const scheduledPayments = [];

    for (const child of targetChildren) {
      try {
        const sp = new ScheduledPayment({
          parent: req.userId,
          child: child._id,
          feeCategory: feeCategoryId,
          amount: feeCategory.amount,
          scheduledDate: new Date(scheduledDate),
          status: 'pending'
        });
        await sp.save();
        scheduledPayments.push(sp);
        created++;
      } catch (err) {
        if (err.code === 11000) {
          skipped++;
        } else {
          throw err;
        }
      }
    }

    res.status(201).json({
      message: 'Payments scheduled',
      created,
      skipped,
      scheduledPayments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List scheduled payments
router.get('/', auth, validators.listScheduledPayments, validate, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;

    const filter = { parent: req.userId };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.child) filter.child = req.query.child;
    if (req.query.feeCategory) filter.feeCategory = req.query.feeCategory;

    if (req.query.fromDate || req.query.toDate) {
      filter.scheduledDate = {};
      if (req.query.fromDate) filter.scheduledDate.$gte = new Date(req.query.fromDate);
      if (req.query.toDate) filter.scheduledDate.$lte = new Date(req.query.toDate);
    }

    const [scheduledPayments, total] = await Promise.all([
      ScheduledPayment.find(filter)
        .populate('child', 'firstName lastName')
        .populate('feeCategory', 'name category amount')
        .sort({ scheduledDate: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ScheduledPayment.countDocuments(filter)
    ]);

    // Summary stats
    const [pendingStats, failedCount, completedCount] = await Promise.all([
      ScheduledPayment.aggregate([
        { $match: { parent: req.userId, status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 }, total: { $sum: '$amount' } } }
      ]),
      ScheduledPayment.countDocuments({ parent: req.userId, status: 'failed' }),
      ScheduledPayment.countDocuments({ parent: req.userId, status: 'completed' })
    ]);

    res.json({
      scheduledPayments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      summary: {
        pendingCount: pendingStats[0]?.count || 0,
        pendingAmount: pendingStats[0]?.total || 0,
        failedCount,
        completedCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get scheduled payment detail
router.get('/:id', auth, validators.getScheduledPayment, validate, async (req, res) => {
  try {
    const scheduledPayment = await ScheduledPayment.findOne({
      _id: req.params.id,
      parent: req.userId
    })
    .populate('child', 'firstName lastName grade')
    .populate('feeCategory', 'name category amount isRecurring recurrenceRule')
    .populate('transaction', 'reference amount status paymentMethod createdAt')
    .populate('sourcePayment', 'scheduledDate status')
    .lean();

    if (!scheduledPayment) {
      return res.status(404).json({ error: 'Scheduled payment not found' });
    }

    res.json({ scheduledPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel scheduled payment
router.put('/:id/cancel', auth, validators.actionOnPayment, validate, async (req, res) => {
  try {
    const scheduledPayment = await ScheduledPayment.findOne({
      _id: req.params.id,
      parent: req.userId
    });

    if (!scheduledPayment) {
      return res.status(404).json({ error: 'Scheduled payment not found' });
    }

    if (scheduledPayment.status !== 'pending') {
      return res.status(400).json({
        error: `Can only cancel pending payments. Current status: ${scheduledPayment.status}`
      });
    }

    scheduledPayment.status = 'cancelled';
    await scheduledPayment.save();

    res.json({
      message: 'Scheduled payment cancelled',
      scheduledPayment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skip scheduled payment (generates next occurrence if recurring)
router.put('/:id/skip', auth, validators.actionOnPayment, validate, async (req, res) => {
  try {
    const scheduledPayment = await ScheduledPayment.findOne({
      _id: req.params.id,
      parent: req.userId
    });

    if (!scheduledPayment) {
      return res.status(404).json({ error: 'Scheduled payment not found' });
    }

    if (scheduledPayment.status !== 'pending') {
      return res.status(400).json({
        error: `Can only skip pending payments. Current status: ${scheduledPayment.status}`
      });
    }

    scheduledPayment.status = 'skipped';
    await scheduledPayment.save();

    // Generate next occurrence if recurring
    let nextOccurrence = null;
    const feeCategory = await FeeCategory.findById(scheduledPayment.feeCategory);

    if (feeCategory && feeCategory.isRecurring && feeCategory.isActive) {
      const nextDate = computeNextDate(scheduledPayment.scheduledDate, feeCategory.recurrenceRule);

      if (nextDate) {
        try {
          const next = new ScheduledPayment({
            parent: scheduledPayment.parent,
            child: scheduledPayment.child,
            feeCategory: scheduledPayment.feeCategory,
            amount: feeCategory.amount,
            scheduledDate: nextDate,
            status: 'pending',
            isAutoGenerated: true,
            sourcePayment: scheduledPayment._id
          });
          await next.save();
          nextOccurrence = next;
        } catch (err) {
          if (err.code !== 11000) throw err;
          // Duplicate — next occurrence already exists
        }
      }
    }

    const response = {
      message: 'Payment skipped',
      scheduledPayment
    };
    if (nextOccurrence) {
      response.nextOccurrence = nextOccurrence;
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay now — immediately execute a scheduled payment
router.post('/:id/pay-now', auth, paymentLimiter, validators.actionOnPayment, validate, async (req, res) => {
  try {
    // Acquire optimistic lock
    const scheduledPayment = await ScheduledPayment.findOneAndUpdate(
      {
        _id: req.params.id,
        parent: req.userId,
        status: 'pending'
      },
      {
        $set: { status: 'processing' },
        $inc: { version: 1 }
      },
      { new: true }
    );

    if (!scheduledPayment) {
      const existing = await ScheduledPayment.findOne({
        _id: req.params.id,
        parent: req.userId
      });
      if (!existing) {
        return res.status(404).json({ error: 'Scheduled payment not found' });
      }
      if (existing.status === 'processing') {
        return res.status(409).json({ error: 'Payment is being processed. Please try again.' });
      }
      return res.status(400).json({
        error: `Can only execute pending payments. Current status: ${existing.status}`
      });
    }

    // Atomic balance deduction
    const user = await User.findOneAndUpdate(
      { _id: req.userId, balance: { $gte: scheduledPayment.amount } },
      { $inc: { balance: -scheduledPayment.amount } },
      { new: true }
    );

    if (!user) {
      // Insufficient balance — revert to failed
      const currentUser = await User.findById(req.userId);
      scheduledPayment.status = 'failed';
      scheduledPayment.failureReason = 'Insufficient balance';
      scheduledPayment.retryCount += 1;
      scheduledPayment.lastRetryAt = new Date();
      await scheduledPayment.save();

      return res.status(400).json({
        error: `Insufficient balance. Required: ₦${scheduledPayment.amount.toLocaleString()}. Available: ₦${(currentUser?.balance || 0).toLocaleString()}`
      });
    }

    // Create transaction
    const transaction = new Transaction({
      user: req.userId,
      type: 'payment',
      amount: scheduledPayment.amount,
      status: 'completed',
      reference: `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      paymentMethod: 'card',
      metadata: {
        scheduledPaymentId: scheduledPayment._id,
        childId: scheduledPayment.child,
        feeCategoryId: scheduledPayment.feeCategory
      }
    });
    await transaction.save();

    // Mark completed
    scheduledPayment.status = 'completed';
    scheduledPayment.transaction = transaction._id;
    await scheduledPayment.save();

    // Generate next occurrence if recurring
    let nextOccurrence = null;
    const feeCategory = await FeeCategory.findById(scheduledPayment.feeCategory);

    if (feeCategory && feeCategory.isRecurring && feeCategory.isActive) {
      const nextDate = computeNextDate(scheduledPayment.scheduledDate, feeCategory.recurrenceRule);

      if (nextDate) {
        try {
          const next = new ScheduledPayment({
            parent: scheduledPayment.parent,
            child: scheduledPayment.child,
            feeCategory: scheduledPayment.feeCategory,
            amount: feeCategory.amount,
            scheduledDate: nextDate,
            status: 'pending',
            isAutoGenerated: true,
            sourcePayment: scheduledPayment._id
          });
          await next.save();
          nextOccurrence = next;
        } catch (err) {
          if (err.code !== 11000) throw err;
        }
      }
    }

    const response = {
      message: 'Payment executed successfully',
      scheduledPayment,
      transaction,
      newBalance: user.balance
    };
    if (nextOccurrence) {
      response.nextOccurrence = nextOccurrence;
    }

    res.json(response);
  } catch (error) {
    // Attempt to reset status on unexpected error
    try {
      await ScheduledPayment.findByIdAndUpdate(req.params.id, {
        $set: { status: 'pending' }
      });
    } catch (resetErr) {
      console.error('Failed to reset scheduled payment status:', resetErr);
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

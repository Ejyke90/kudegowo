const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');
const SchoolProfile = require('../models/SchoolProfile');
const Child = require('../models/Child');
const FeeCategory = require('../models/FeeCategory');
const ScheduledPayment = require('../models/ScheduledPayment');
const validators = require('../validators/schoolProfile');

const MAX_PROFILES_PER_PARENT = 10;

router.use(apiLimiter);

// Create school profile
router.post('/', auth, validators.createSchoolProfile, validate, async (req, res) => {
  try {
    // Check profile limit
    const profileCount = await SchoolProfile.countDocuments({ createdBy: req.userId });
    if (profileCount >= MAX_PROFILES_PER_PARENT) {
      return res.status(429).json({
        error: `Maximum school profiles reached (${MAX_PROFILES_PER_PARENT}). Delete an unused profile to create a new one.`
      });
    }

    const { name, address, city, state, schoolType, contactEmail, contactPhone, metadata } = req.body;

    const schoolProfile = new SchoolProfile({
      name,
      address,
      city,
      state,
      schoolType,
      contactEmail,
      contactPhone,
      metadata,
      createdBy: req.userId
    });

    await schoolProfile.save();

    res.status(201).json({
      message: 'School profile created',
      schoolProfile
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'You already have a school profile with this name'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// List school profiles
router.get('/', auth, validators.listSchoolProfiles, validate, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;

    const filter = { createdBy: req.userId };

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    const [schoolProfiles, total] = await Promise.all([
      SchoolProfile.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SchoolProfile.countDocuments(filter)
    ]);

    // Attach children count for each profile
    const profileIds = schoolProfiles.map(p => p._id);
    const childrenCounts = await Child.aggregate([
      { $match: { schoolProfile: { $in: profileIds }, isActive: true } },
      { $group: { _id: '$schoolProfile', count: { $sum: 1 } } }
    ]);
    const countMap = {};
    childrenCounts.forEach(c => { countMap[c._id.toString()] = c.count; });

    const enriched = schoolProfiles.map(p => ({
      ...p,
      childrenCount: countMap[p._id.toString()] || 0
    }));

    res.json({
      schoolProfiles: enriched,
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

// Get school profile detail with stats
router.get('/:id', auth, validators.getSchoolProfile, validate, async (req, res) => {
  try {
    const schoolProfile = await SchoolProfile.findOne({
      _id: req.params.id,
      createdBy: req.userId
    }).lean();

    if (!schoolProfile) {
      return res.status(404).json({ error: 'School profile not found' });
    }

    // Gather stats
    const now = new Date();
    const [childrenCount, activeFeeCategories, feeCategories, upcomingPayments] = await Promise.all([
      Child.countDocuments({ schoolProfile: req.params.id, isActive: true }),
      FeeCategory.countDocuments({ schoolProfile: req.params.id, isActive: true }),
      FeeCategory.find({ schoolProfile: req.params.id, isActive: true }).lean(),
      ScheduledPayment.countDocuments({
        parent: req.userId,
        feeCategory: { $in: await FeeCategory.find({ schoolProfile: req.params.id }).distinct('_id') },
        status: 'pending'
      })
    ]);

    const totalObligations = feeCategories.reduce((sum, fc) => sum + fc.amount, 0);
    const overdueCount = feeCategories.filter(fc => fc.dueDate && new Date(fc.dueDate) < now).length;

    res.json({
      schoolProfile,
      stats: {
        childrenCount,
        activeFeeCategories,
        upcomingPayments,
        totalObligations,
        overdueCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update school profile
router.put('/:id', auth, validators.updateSchoolProfile, validate, async (req, res) => {
  try {
    const { name, address, city, state, schoolType, contactEmail, contactPhone, metadata } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (address !== undefined) updateFields.address = address;
    if (city !== undefined) updateFields.city = city;
    if (state !== undefined) updateFields.state = state;
    if (schoolType !== undefined) updateFields.schoolType = schoolType;
    if (contactEmail !== undefined) updateFields.contactEmail = contactEmail;
    if (contactPhone !== undefined) updateFields.contactPhone = contactPhone;
    if (metadata !== undefined) updateFields.metadata = metadata;

    const schoolProfile = await SchoolProfile.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!schoolProfile) {
      return res.status(404).json({ error: 'School profile not found' });
    }

    res.json({
      message: 'School profile updated',
      schoolProfile
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'You already have a school profile with this name'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete school profile
router.delete('/:id', auth, validators.getSchoolProfile, validate, async (req, res) => {
  try {
    const schoolProfile = await SchoolProfile.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!schoolProfile) {
      return res.status(404).json({ error: 'School profile not found' });
    }

    // Check for active children
    const activeChildren = await Child.countDocuments({
      schoolProfile: req.params.id,
      isActive: true
    });

    if (activeChildren > 0) {
      return res.status(400).json({
        error: 'Cannot delete school profile with active children. Deactivate or transfer children first.'
      });
    }

    // Check for pending scheduled payments
    const feeCategoryIds = await FeeCategory.find({ schoolProfile: req.params.id }).distinct('_id');
    const pendingPayments = await ScheduledPayment.countDocuments({
      feeCategory: { $in: feeCategoryIds },
      status: 'pending'
    });

    if (pendingPayments > 0) {
      return res.status(400).json({
        error: 'Cannot delete school profile with pending payments. Cancel payments first.'
      });
    }

    // Delete associated fee categories (that have no completed transactions)
    await FeeCategory.deleteMany({ schoolProfile: req.params.id });

    // Delete the school profile
    await SchoolProfile.findByIdAndDelete(req.params.id);

    res.json({ message: 'School profile deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

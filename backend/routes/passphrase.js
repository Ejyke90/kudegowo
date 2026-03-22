const express = require('express');
const router = express.Router();
const Passphrase = require('../models/Passphrase');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get current passphrase for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const now = new Date();
    
    const passphrase = await Passphrase.findOne({
      childId,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    }).sort({ createdAt: -1 });
    
    if (!passphrase) {
      return res.status(404).json({
        status: false,
        message: 'No active passphrase found',
      });
    }
    
    res.json({
      status: true,
      data: {
        code: passphrase.code,
        validFrom: passphrase.validFrom,
        validUntil: passphrase.validUntil,
        used: passphrase.used,
      },
    });
  } catch (error) {
    console.error('Get passphrase error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get all passphrases for parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    const now = new Date();
    
    const children = await Child.find({ parentId });
    
    const passphrases = await Promise.all(
      children.map(async (child) => {
        const passphrase = await Passphrase.findOne({
          childId: child._id,
          validFrom: { $lte: now },
          validUntil: { $gte: now },
        }).sort({ createdAt: -1 });
        
        return {
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
            className: child.className,
          },
          passphrase: passphrase ? {
            code: passphrase.code,
            validFrom: passphrase.validFrom,
            validUntil: passphrase.validUntil,
            used: passphrase.used,
          } : null,
        };
      })
    );
    
    res.json({ status: true, data: passphrases });
  } catch (error) {
    console.error('Get my children passphrases error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Generate daily passphrases for all active children
router.post('/generate-daily', authenticateToken, async (req, res) => {
  try {
    const children = await Child.find({}).populate('parentId schoolId');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    
    const results = [];
    
    for (const child of children) {
      // Check if passphrase already exists for today
      const existing = await Passphrase.findOne({
        childId: child._id,
        validFrom: { $gte: today },
      });
      
      if (existing) {
        results.push({
          childId: child._id,
          status: 'skipped',
          reason: 'Already exists',
        });
        continue;
      }
      
      // Generate unique code
      let code;
      let attempts = 0;
      do {
        code = Passphrase.generateCode();
        const exists = await Passphrase.findOne({ code });
        if (!exists) break;
        attempts++;
      } while (attempts < 10);
      
      if (attempts >= 10) {
        results.push({
          childId: child._id,
          status: 'failed',
          reason: 'Could not generate unique code',
        });
        continue;
      }
      
      // Create passphrase
      const passphrase = await Passphrase.create({
        childId: child._id,
        parentId: child.parentId._id || child.parentId,
        schoolId: child.schoolId._id || child.schoolId,
        code,
        validFrom: today,
        validUntil: endOfDay,
      });
      
      results.push({
        childId: child._id,
        status: 'created',
        code: passphrase.code,
      });
      
      // Send notification to parent
      if (child.parentId && child.parentId.email) {
        try {
          await notificationService.sendFromTemplate(
            'dailyPassphrase',
            {
              childName: `${child.firstName} ${child.lastName}`,
              passphrase: code,
              validUntil: endOfDay,
            },
            ['sms', 'push'],
            child.parentId
          );
        } catch (notifError) {
          console.error('Passphrase notification error:', notifError);
        }
      }
    }
    
    res.json({
      status: true,
      message: `Generated passphrases for ${results.filter(r => r.status === 'created').length} children`,
      data: results,
    });
  } catch (error) {
    console.error('Generate daily passphrases error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Validate a passphrase (for gate scanner)
router.post('/validate', authenticateToken, async (req, res) => {
  try {
    const { code, schoolId } = req.body;
    
    if (!code || !schoolId) {
      return res.status(400).json({
        status: false,
        message: 'Code and school ID are required',
      });
    }
    
    const now = new Date();
    
    const passphrase = await Passphrase.findOne({
      code,
      schoolId,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    }).populate('childId', 'firstName lastName className');
    
    if (!passphrase) {
      return res.json({
        status: true,
        data: {
          valid: false,
          reason: 'Invalid or expired passphrase',
        },
      });
    }
    
    res.json({
      status: true,
      data: {
        valid: true,
        used: passphrase.used,
        child: passphrase.childId,
      },
    });
  } catch (error) {
    console.error('Validate passphrase error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

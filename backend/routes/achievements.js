const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');

// Get achievements for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    const achievements = await Achievement.find({ childId })
      .sort({ earnedAt: -1 });
    
    // Get all possible achievements
    const allTypes = Object.keys(Achievement.DEFINITIONS);
    const earnedTypes = achievements.map(a => a.type);
    
    const result = {
      earned: achievements,
      locked: allTypes
        .filter(type => !earnedTypes.includes(type))
        .map(type => ({
          type,
          ...Achievement.DEFINITIONS[type],
          locked: true,
        })),
    };
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get recent achievements for a child
router.get('/child/:childId/recent', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { limit = 5 } = req.query;
    
    const achievements = await Achievement.find({ childId })
      .sort({ earnedAt: -1 })
      .limit(parseInt(limit));
    
    res.json({ status: true, data: achievements });
  } catch (error) {
    console.error('Get recent achievements error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get achievement statistics for a child
router.get('/child/:childId/stats', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    const achievements = await Achievement.find({ childId });
    
    const totalPossible = Object.keys(Achievement.DEFINITIONS).length;
    const totalEarned = achievements.length;
    const totalKudiCoins = achievements.reduce(
      (sum, a) => sum + (a.kudiCoinsAwarded || 0),
      0
    );
    
    res.json({
      status: true,
      data: {
        totalEarned,
        totalPossible,
        completionPercentage: (totalEarned / totalPossible) * 100,
        totalKudiCoinsFromAchievements: totalKudiCoins,
      },
    });
  } catch (error) {
    console.error('Get achievement stats error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get all achievements for parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    
    const children = await Child.find({ parentId });
    
    const result = await Promise.all(
      children.map(async (child) => {
        const achievements = await Achievement.find({ childId: child._id })
          .sort({ earnedAt: -1 });
        
        return {
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
          },
          achievements,
          count: achievements.length,
        };
      })
    );
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get my children achievements error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get available achievement definitions
router.get('/definitions', authenticateToken, async (req, res) => {
  try {
    res.json({
      status: true,
      data: Achievement.DEFINITIONS,
    });
  } catch (error) {
    console.error('Get achievement definitions error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const KudiCoin = require('../models/KudiCoin');
const Child = require('../models/Child');
const QuizAttempt = require('../models/QuizAttempt');
const { authenticateToken } = require('../middleware/auth');

// Get class leaderboard
router.get('/class/:schoolId/:className', authenticateToken, async (req, res) => {
  try {
    const { schoolId, className } = req.params;
    const { limit = 10 } = req.query;
    
    // Get children in the class
    const children = await Child.find({ schoolId, className });
    const childIds = children.map(c => c._id);
    
    // Get KudiCoin balances
    const kudiCoins = await KudiCoin.find({ childId: { $in: childIds } });
    
    // Map balances to children
    const leaderboard = children.map(child => {
      const kudiCoin = kudiCoins.find(
        k => k.childId.toString() === child._id.toString()
      );
      
      return {
        childId: child._id,
        name: `${child.firstName} ${child.lastName.charAt(0)}.`, // Privacy
        kudiCoins: kudiCoin?.balance || 0,
        totalEarned: kudiCoin?.totalEarned || 0,
      };
    });
    
    // Sort by balance
    leaderboard.sort((a, b) => b.kudiCoins - a.kudiCoins);
    
    // Add rank
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    res.json({
      status: true,
      data: leaderboard.slice(0, parseInt(limit)),
    });
  } catch (error) {
    console.error('Get class leaderboard error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get school leaderboard
router.get('/school/:schoolId', authenticateToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { limit = 20 } = req.query;
    
    // Get all children in the school
    const children = await Child.find({ schoolId });
    const childIds = children.map(c => c._id);
    
    // Get KudiCoin balances
    const kudiCoins = await KudiCoin.find({ childId: { $in: childIds } });
    
    // Map balances to children
    const leaderboard = children.map(child => {
      const kudiCoin = kudiCoins.find(
        k => k.childId.toString() === child._id.toString()
      );
      
      return {
        childId: child._id,
        name: `${child.firstName} ${child.lastName.charAt(0)}.`,
        className: child.className,
        kudiCoins: kudiCoin?.balance || 0,
        totalEarned: kudiCoin?.totalEarned || 0,
      };
    });
    
    // Sort by balance
    leaderboard.sort((a, b) => b.kudiCoins - a.kudiCoins);
    
    // Add rank
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    res.json({
      status: true,
      data: leaderboard.slice(0, parseInt(limit)),
    });
  } catch (error) {
    console.error('Get school leaderboard error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get quiz leaderboard
router.get('/quiz/:quizId', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { limit = 10 } = req.query;
    
    const attempts = await QuizAttempt.aggregate([
      { $match: { quizId: require('mongoose').Types.ObjectId(quizId) } },
      { $sort: { score: -1, timeSpent: 1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'children',
          localField: 'childId',
          foreignField: '_id',
          as: 'child',
        },
      },
      { $unwind: '$child' },
      {
        $project: {
          childId: 1,
          name: {
            $concat: [
              '$child.firstName',
              ' ',
              { $substr: ['$child.lastName', 0, 1] },
              '.',
            ],
          },
          score: 1,
          timeSpent: 1,
          completedAt: 1,
        },
      },
    ]);
    
    // Add rank
    attempts.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    res.json({ status: true, data: attempts });
  } catch (error) {
    console.error('Get quiz leaderboard error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get child's rank in class
router.get('/child/:childId/rank', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({
        status: false,
        message: 'Child not found',
      });
    }
    
    // Get all children in the same class
    const classmates = await Child.find({
      schoolId: child.schoolId,
      className: child.className,
    });
    const classmateIds = classmates.map(c => c._id);
    
    // Get KudiCoin balances
    const kudiCoins = await KudiCoin.find({ childId: { $in: classmateIds } });
    
    // Sort by balance
    const sorted = kudiCoins.sort((a, b) => b.balance - a.balance);
    
    // Find child's rank
    const childKudiCoin = kudiCoins.find(
      k => k.childId.toString() === childId
    );
    const rank = sorted.findIndex(
      k => k.childId.toString() === childId
    ) + 1;
    
    res.json({
      status: true,
      data: {
        rank: rank || classmates.length,
        totalInClass: classmates.length,
        kudiCoins: childKudiCoin?.balance || 0,
      },
    });
  } catch (error) {
    console.error('Get child rank error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

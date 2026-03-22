const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingsGoal');
const KudiCoin = require('../models/KudiCoin');
const Achievement = require('../models/Achievement');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');
const notificationService = require('../services/notifications');

// Get savings goals for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { status } = req.query;
    
    const query = { childId };
    if (status) query.status = status;
    
    const goals = await SavingsGoal.find(query).sort({ createdAt: -1 });
    
    res.json({ status: true, data: goals });
  } catch (error) {
    console.error('Get savings goals error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create savings goal
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { childId, name, description, targetAmount, targetDate, autoRoundUp } = req.body;
    
    if (!childId || !name || !targetAmount) {
      return res.status(400).json({
        status: false,
        message: 'Child ID, name, and target amount are required',
      });
    }
    
    const goal = await SavingsGoal.create({
      childId,
      name,
      description,
      targetAmount,
      targetDate: targetDate ? new Date(targetDate) : null,
      autoRoundUp: autoRoundUp || false,
    });
    
    res.status(201).json({
      status: true,
      message: 'Savings goal created',
      data: goal,
    });
  } catch (error) {
    console.error('Create savings goal error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Add deposit to savings goal
router.post('/:goalId/deposit', authenticateToken, async (req, res) => {
  try {
    const { goalId } = req.params;
    const { amount, source = 'manual' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Valid amount is required',
      });
    }
    
    const goal = await SavingsGoal.findById(goalId);
    
    if (!goal) {
      return res.status(404).json({
        status: false,
        message: 'Savings goal not found',
      });
    }
    
    if (goal.status !== 'active') {
      return res.status(400).json({
        status: false,
        message: 'Cannot deposit to inactive goal',
      });
    }
    
    const { newAmount, milestones } = await goal.addDeposit(amount, source);
    
    // Award KudiCoins for milestones
    if (milestones.length > 0) {
      let kudiCoin = await KudiCoin.findOne({ childId: goal.childId });
      if (!kudiCoin) {
        kudiCoin = new KudiCoin({ childId: goal.childId, balance: 0 });
      }
      
      for (const milestone of milestones) {
        await kudiCoin.addCoins(
          milestone.kudiCoinsAwarded,
          `Savings milestone: ${milestone.percentage}%`,
          'savings',
          goal._id
        );
      }
      
      // Check for first saver achievement
      const existingAchievement = await Achievement.findOne({
        childId: goal.childId,
        type: 'first_saver',
      });
      
      if (!existingAchievement) {
        const def = Achievement.DEFINITIONS.first_saver;
        await Achievement.create({
          childId: goal.childId,
          type: 'first_saver',
          name: def.name,
          description: def.description,
          badge: def.badge,
          kudiCoinsAwarded: def.kudiCoins,
        });
        
        await kudiCoin.addCoins(def.kudiCoins, 'Achievement: First Saver', 'behavior');
      }
      
      // Check for goal achiever achievement
      if (goal.status === 'completed') {
        const goalAchievement = await Achievement.findOne({
          childId: goal.childId,
          type: 'goal_achiever',
        });
        
        if (!goalAchievement) {
          const def = Achievement.DEFINITIONS.goal_achiever;
          await Achievement.create({
            childId: goal.childId,
            type: 'goal_achiever',
            name: def.name,
            description: def.description,
            badge: def.badge,
            kudiCoinsAwarded: def.kudiCoins,
          });
          
          await kudiCoin.addCoins(def.kudiCoins, 'Achievement: Goal Achiever', 'behavior');
        }
        
        // Send notification
        const child = await Child.findById(goal.childId).populate('parentId');
        if (child && child.parentId) {
          await notificationService.sendFromTemplate(
            'savingsGoalReached',
            {
              childName: `${child.firstName} ${child.lastName}`,
              goalName: goal.name,
              amount: goal.targetAmount,
            },
            ['push', 'email'],
            child.parentId
          );
        }
      }
    }
    
    res.json({
      status: true,
      message: 'Deposit added',
      data: {
        currentAmount: newAmount,
        progressPercentage: goal.progressPercentage,
        milestones,
        goalCompleted: goal.status === 'completed',
      },
    });
  } catch (error) {
    console.error('Add deposit error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Update savings goal
router.patch('/:goalId', authenticateToken, async (req, res) => {
  try {
    const { goalId } = req.params;
    const { name, description, targetAmount, targetDate, autoRoundUp } = req.body;
    
    const goal = await SavingsGoal.findById(goalId);
    
    if (!goal) {
      return res.status(404).json({
        status: false,
        message: 'Savings goal not found',
      });
    }
    
    if (name) goal.name = name;
    if (description !== undefined) goal.description = description;
    if (targetAmount) goal.targetAmount = targetAmount;
    if (targetDate) goal.targetDate = new Date(targetDate);
    if (autoRoundUp !== undefined) goal.autoRoundUp = autoRoundUp;
    
    await goal.save();
    
    res.json({
      status: true,
      message: 'Savings goal updated',
      data: goal,
    });
  } catch (error) {
    console.error('Update savings goal error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Cancel savings goal
router.post('/:goalId/cancel', authenticateToken, async (req, res) => {
  try {
    const { goalId } = req.params;
    
    const goal = await SavingsGoal.findById(goalId);
    
    if (!goal) {
      return res.status(404).json({
        status: false,
        message: 'Savings goal not found',
      });
    }
    
    goal.status = 'cancelled';
    await goal.save();
    
    res.json({
      status: true,
      message: 'Savings goal cancelled',
      data: goal,
    });
  } catch (error) {
    console.error('Cancel savings goal error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get all savings goals for parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    
    const children = await Child.find({ parentId });
    const childIds = children.map(c => c._id);
    
    const goals = await SavingsGoal.find({
      childId: { $in: childIds },
    })
      .populate('childId', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({ status: true, data: goals });
  } catch (error) {
    console.error('Get my children savings goals error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

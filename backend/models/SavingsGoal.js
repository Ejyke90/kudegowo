const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
    default: '',
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 100,
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  autoRoundUp: {
    type: Boolean,
    default: false,
  },
  roundUpAmount: {
    type: Number,
    default: 100, // Round up to nearest 100 Naira
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  targetDate: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  deposits: [{
    amount: Number,
    source: {
      type: String,
      enum: ['manual', 'round_up', 'transfer', 'bonus'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  milestones: [{
    percentage: Number,
    reachedAt: Date,
    kudiCoinsAwarded: Number,
  }],
}, {
  timestamps: true,
});

// Index for child goals
savingsGoalSchema.index({ childId: 1, status: 1 });

// Virtual for progress percentage
savingsGoalSchema.virtual('progressPercentage').get(function() {
  if (this.targetAmount === 0) return 0;
  return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

// Virtual for remaining amount
savingsGoalSchema.virtual('remainingAmount').get(function() {
  return Math.max(this.targetAmount - this.currentAmount, 0);
});

// Check and award milestone
savingsGoalSchema.methods.checkMilestone = async function() {
  const percentage = this.progressPercentage;
  const milestoneThresholds = [25, 50, 75, 100];
  const kudiCoinRewards = { 25: 10, 50: 25, 75: 50, 100: 100 };
  
  const reachedMilestones = this.milestones.map(m => m.percentage);
  const newMilestones = [];
  
  for (const threshold of milestoneThresholds) {
    if (percentage >= threshold && !reachedMilestones.includes(threshold)) {
      const milestone = {
        percentage: threshold,
        reachedAt: new Date(),
        kudiCoinsAwarded: kudiCoinRewards[threshold],
      };
      this.milestones.push(milestone);
      newMilestones.push(milestone);
    }
  }
  
  if (percentage >= 100 && this.status !== 'completed') {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  if (newMilestones.length > 0) {
    await this.save();
  }
  
  return newMilestones;
};

// Add deposit
savingsGoalSchema.methods.addDeposit = async function(amount, source = 'manual') {
  this.currentAmount += amount;
  this.deposits.push({ amount, source });
  
  const milestones = await this.checkMilestone();
  
  return { newAmount: this.currentAmount, milestones };
};

savingsGoalSchema.set('toJSON', { virtuals: true });
savingsGoalSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);

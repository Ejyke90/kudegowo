const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  type: {
    type: String,
    enum: [
      'first_saver',
      'quiz_master',
      'goal_achiever',
      'consistent_saver',
      'big_spender',
      'knowledge_seeker',
      'early_bird',
      'streak_keeper',
      'top_earner',
      'generous_giver',
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  badge: {
    type: String, // Badge icon/image identifier
    required: true,
  },
  kudiCoinsAwarded: {
    type: Number,
    default: 0,
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Index for child achievements
achievementSchema.index({ childId: 1, type: 1 });

// Index for recent achievements
achievementSchema.index({ childId: 1, earnedAt: -1 });

// Achievement definitions
const ACHIEVEMENT_DEFINITIONS = {
  first_saver: {
    name: 'First Saver',
    description: 'Made your first savings deposit',
    badge: '🌱',
    kudiCoins: 20,
  },
  quiz_master: {
    name: 'Quiz Master',
    description: 'Completed 10 quizzes with 80%+ score',
    badge: '🎓',
    kudiCoins: 100,
  },
  goal_achiever: {
    name: 'Goal Achiever',
    description: 'Completed your first savings goal',
    badge: '🏆',
    kudiCoins: 50,
  },
  consistent_saver: {
    name: 'Consistent Saver',
    description: 'Saved money for 7 consecutive days',
    badge: '📈',
    kudiCoins: 75,
  },
  knowledge_seeker: {
    name: 'Knowledge Seeker',
    description: 'Completed quizzes in all categories',
    badge: '📚',
    kudiCoins: 150,
  },
  early_bird: {
    name: 'Early Bird',
    description: 'Completed a quiz before 8 AM',
    badge: '🌅',
    kudiCoins: 25,
  },
  streak_keeper: {
    name: 'Streak Keeper',
    description: 'Maintained a 30-day activity streak',
    badge: '🔥',
    kudiCoins: 200,
  },
  top_earner: {
    name: 'Top Earner',
    description: 'Earned 1000 KudiCoins',
    badge: '💰',
    kudiCoins: 100,
  },
};

achievementSchema.statics.DEFINITIONS = ACHIEVEMENT_DEFINITIONS;

module.exports = mongoose.model('Achievement', achievementSchema);

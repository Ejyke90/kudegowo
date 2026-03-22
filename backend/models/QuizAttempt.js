const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedAnswer: Number,
  isCorrect: Boolean,
  timeSpent: Number, // Seconds
});

const quizAttemptSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  kudiCoinsEarned: {
    type: Number,
    default: 0,
  },
  timeSpent: {
    type: Number, // Total seconds
    default: 0,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for child quiz history
quizAttemptSchema.index({ childId: 1, quizId: 1 });

// Index for leaderboard queries
quizAttemptSchema.index({ quizId: 1, score: -1 });

// Index for recent attempts
quizAttemptSchema.index({ childId: 1, completedAt: -1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);

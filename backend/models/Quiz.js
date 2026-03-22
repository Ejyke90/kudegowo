const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: Number, // Index of correct option
    required: true,
  },
  explanation: {
    type: String,
    default: '',
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    maxlength: 500,
    default: '',
  },
  category: {
    type: String,
    enum: ['savings', 'budgeting', 'earning', 'spending', 'investing', 'general'],
    default: 'general',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  questions: [questionSchema],
  kudiCoinReward: {
    type: Number,
    default: 10,
  },
  passingScore: {
    type: Number,
    default: 70, // Percentage
  },
  timeLimit: {
    type: Number, // Minutes
    default: 10,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ageGroup: {
    min: { type: Number, default: 6 },
    max: { type: Number, default: 18 },
  },
}, {
  timestamps: true,
});

// Index for active quizzes
quizSchema.index({ isActive: 1, difficulty: 1 });

// Virtual for question count
quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

quizSchema.set('toJSON', { virtuals: true });
quizSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Quiz', quizSchema);

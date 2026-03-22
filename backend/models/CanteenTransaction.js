const mongoose = require('mongoose');

const canteenTransactionSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['purchase', 'refund'],
    default: 'purchase',
  },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
  }],
  staffId: {
    type: String,
    default: null,
  },
  qrCode: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed',
  },
  balanceBefore: {
    type: Number,
    default: 0,
  },
  balanceAfter: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for child transactions
canteenTransactionSchema.index({ childId: 1, timestamp: -1 });

// Index for school transactions
canteenTransactionSchema.index({ schoolId: 1, timestamp: -1 });

// Index for daily reports
canteenTransactionSchema.index({ schoolId: 1, status: 1, timestamp: 1 });

module.exports = mongoose.model('CanteenTransaction', canteenTransactionSchema);

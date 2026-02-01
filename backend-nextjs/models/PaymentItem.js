const mongoose = require('mongoose');

const paymentItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['meal', 'trip', 'uniform', 'book', 'tuition', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  schoolId: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PaymentItem', paymentItemSchema);

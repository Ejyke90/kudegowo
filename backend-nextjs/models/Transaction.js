const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['payment', 'topup', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentItem'
  },
  reference: {
    type: String,
    unique: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank_transfer', 'ussd'],
    default: 'card'
  },
  metadata: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);

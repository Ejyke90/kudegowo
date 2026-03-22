const mongoose = require('mongoose');

const kudiCoinTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['earn', 'spend', 'bonus', 'transfer'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  referenceType: {
    type: String,
    enum: ['quiz', 'savings', 'behavior', 'redemption', 'transfer', null],
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const kudiCoinSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalEarned: {
    type: Number,
    default: 0,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
  transactions: [kudiCoinTransactionSchema],
}, {
  timestamps: true,
});

// Index for child lookup
kudiCoinSchema.index({ childId: 1 });

// Add coins
kudiCoinSchema.methods.addCoins = async function(amount, reason, referenceType = null, referenceId = null) {
  this.balance += amount;
  this.totalEarned += amount;
  this.transactions.push({
    type: 'earn',
    amount,
    reason,
    referenceType,
    referenceId,
  });
  return this.save();
};

// Spend coins
kudiCoinSchema.methods.spendCoins = async function(amount, reason, referenceType = null, referenceId = null) {
  if (this.balance < amount) {
    throw new Error('Insufficient KudiCoins');
  }
  this.balance -= amount;
  this.totalSpent += amount;
  this.transactions.push({
    type: 'spend',
    amount: -amount,
    reason,
    referenceType,
    referenceId,
  });
  return this.save();
};

// Get recent transactions
kudiCoinSchema.methods.getRecentTransactions = function(limit = 10) {
  return this.transactions
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
};

module.exports = mongoose.model('KudiCoin', kudiCoinSchema);

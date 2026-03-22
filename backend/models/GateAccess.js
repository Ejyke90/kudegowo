const mongoose = require('mongoose');

const gateAccessSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: true,
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    default: null,
  },
  passphraseUsed: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ['check_in', 'check_out'],
    required: true,
  },
  authorized: {
    type: Boolean,
    required: true,
  },
  reason: {
    type: String,
    default: '',
  },
  staffId: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for school access logs
gateAccessSchema.index({ schoolId: 1, timestamp: -1 });

// Index for child access history
gateAccessSchema.index({ childId: 1, timestamp: -1 });

// Index for unauthorized attempts
gateAccessSchema.index({ schoolId: 1, authorized: 1, timestamp: -1 });

module.exports = mongoose.model('GateAccess', gateAccessSchema);

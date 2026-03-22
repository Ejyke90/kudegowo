const mongoose = require('mongoose');

const passphraseSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: true,
  },
  code: {
    type: String,
    required: true,
    length: 6,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  usedAt: {
    type: Date,
    default: null,
  },
  usedFor: {
    type: String,
    enum: ['check_in', 'check_out', null],
    default: null,
  },
}, {
  timestamps: true,
});

// Unique code index
passphraseSchema.index({ code: 1 }, { unique: true });

// Index for child lookup
passphraseSchema.index({ childId: 1, validUntil: 1 });

// Index for active passphrases
passphraseSchema.index({ validFrom: 1, validUntil: 1, used: 1 });

// Generate a 6-digit passphrase
passphraseSchema.statics.generateCode = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Check if passphrase is valid
passphraseSchema.methods.isValid = function() {
  const now = new Date();
  return !this.used && now >= this.validFrom && now <= this.validUntil;
};

module.exports = mongoose.model('Passphrase', passphraseSchema);

const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['security', 'weather', 'health', 'general'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  message: {
    type: String,
    required: true,
    maxlength: 500,
  },
  acknowledgedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    acknowledgedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  totalRecipients: {
    type: Number,
    default: 0,
  },
  deliveryStatus: {
    sms: { sent: Number, failed: Number },
    email: { sent: Number, failed: Number },
    push: { sent: Number, failed: Number },
    whatsapp: { sent: Number, failed: Number },
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  resolutionNotes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index for school alerts
emergencyAlertSchema.index({ schoolId: 1, createdAt: -1 });

// Index for active alerts
emergencyAlertSchema.index({ schoolId: 1, resolvedAt: 1 });

// Index for severity filtering
emergencyAlertSchema.index({ schoolId: 1, severity: 1, createdAt: -1 });

// Virtual for acknowledgment count
emergencyAlertSchema.virtual('acknowledgmentCount').get(function() {
  return this.acknowledgedBy.length;
});

// Virtual for acknowledgment rate
emergencyAlertSchema.virtual('acknowledgmentRate').get(function() {
  if (this.totalRecipients === 0) return 0;
  return (this.acknowledgedBy.length / this.totalRecipients) * 100;
});

emergencyAlertSchema.set('toJSON', { virtuals: true });
emergencyAlertSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('EmergencyAlert', emergencyAlertSchema);

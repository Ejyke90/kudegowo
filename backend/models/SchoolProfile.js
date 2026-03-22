const mongoose = require('mongoose');

const schoolProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'School name is required'],
    trim: true,
    minlength: [2, 'School name must be at least 2 characters'],
    maxlength: [200, 'School name must be at most 200 characters']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [500, 'Address must be at most 500 characters']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [100, 'City must be at most 100 characters']
  },
  state: {
    type: String,
    trim: true,
    maxlength: [100, 'State must be at most 100 characters']
  },
  schoolType: {
    type: String,
    required: [true, 'School type is required'],
    enum: {
      values: ['primary', 'secondary', 'combined', 'nursery'],
      message: 'School type must be one of: primary, secondary, combined, nursery'
    }
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  contactPhone: {
    type: String,
    trim: true,
    match: [/^\+?\d{10,15}$/, 'Please provide a valid phone number']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound unique index: prevent duplicate school names per parent
schoolProfileSchema.index({ createdBy: 1, name: 1 }, { unique: true });

// Index for listing parent's schools
schoolProfileSchema.index({ createdBy: 1 });

// Virtual: children count (populated via aggregation in routes)
schoolProfileSchema.virtual('children', {
  ref: 'Child',
  localField: '_id',
  foreignField: 'schoolProfile',
  count: true
});

// Nigerian states constant for optional validation
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

module.exports = mongoose.model('SchoolProfile', schoolProfileSchema);
module.exports.NIGERIAN_STATES = NIGERIAN_STATES;

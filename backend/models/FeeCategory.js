const mongoose = require('mongoose');

const recurrenceRuleSchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: {
      values: ['weekly', 'biweekly', 'monthly', 'termly', 'annually'],
      message: 'Frequency must be one of: weekly, biweekly, monthly, termly, annually'
    },
    required: [true, 'Frequency is required for recurring fees']
  },
  dayOfMonth: {
    type: Number,
    min: [1, 'Day of month must be between 1 and 31'],
    max: [31, 'Day of month must be between 1 and 31']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required for recurring fees']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || !this.startDate || v > this.startDate;
      },
      message: 'End date must be after start date'
    }
  }
}, { _id: false });

const feeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Fee category name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [200, 'Name must be at most 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description must be at most 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category type is required'],
    enum: {
      values: ['tuition', 'meals', 'transport', 'uniform', 'books', 'trips', 'extracurricular', 'other'],
      message: 'Category must be one of: tuition, meals, transport, uniform, books, trips, extracurricular, other'
    }
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [50, 'Amount must be at least ₦50'],
    max: [10000000, 'Amount must be at most ₦10,000,000']
  },
  currency: {
    type: String,
    default: 'NGN',
    enum: ['NGN']
  },
  dueDate: {
    type: Date
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrenceRule: {
    type: recurrenceRuleSchema,
    validate: {
      validator: function(v) {
        // recurrenceRule is required if isRecurring is true
        if (this.isRecurring && !v) return false;
        return true;
      },
      message: 'Recurrence rule is required for recurring fees'
    }
  },
  schoolProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: [true, 'School profile is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  applicableTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
feeCategorySchema.index({ schoolProfile: 1, isActive: 1, dueDate: 1 });
feeCategorySchema.index({ createdBy: 1 });
feeCategorySchema.index({ schoolProfile: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('FeeCategory', feeCategorySchema);

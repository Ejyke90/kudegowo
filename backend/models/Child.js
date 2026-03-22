const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character'],
    maxlength: [100, 'First name must be at most 100 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character'],
    maxlength: [100, 'Last name must be at most 100 characters']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  schoolProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: [true, 'School profile is required']
  },
  grade: {
    type: String,
    trim: true,
    maxlength: [50, 'Grade must be at most 50 characters']
  },
  studentId: {
    type: String,
    trim: true,
    maxlength: [50, 'Student ID must be at most 50 characters']
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound indexes
childSchema.index({ parent: 1, schoolProfile: 1 });
childSchema.index({ parent: 1, isActive: 1 });
childSchema.index(
  { parent: 1, firstName: 1, lastName: 1, schoolProfile: 1 },
  { unique: true }
);

// Virtual: full name
childSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Child', childSchema);

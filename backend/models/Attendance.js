const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  checkInPassphrase: {
    type: String,
    default: null,
  },
  checkOutPassphrase: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['absent', 'checked_in', 'checked_out', 'late'],
    default: 'absent',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Compound index for unique attendance per child per day
attendanceSchema.index({ childId: 1, date: 1 }, { unique: true });

// Index for school daily queries
attendanceSchema.index({ schoolId: 1, date: 1 });

// Index for status queries
attendanceSchema.index({ schoolId: 1, status: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);

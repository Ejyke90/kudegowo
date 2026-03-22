const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  category: String,
});

const mealOrderSchema = new mongoose.Schema({
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
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentReference: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
  cancelledAt: {
    type: Date,
    default: null,
  },
  cancelReason: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index for child orders
mealOrderSchema.index({ childId: 1, orderDate: 1 });

// Index for school orders
mealOrderSchema.index({ schoolId: 1, orderDate: 1 });

// Index for status queries
mealOrderSchema.index({ schoolId: 1, status: 1, orderDate: 1 });

// Check if order can be cancelled
mealOrderSchema.methods.canCancel = function() {
  // Can cancel if pending and order date is in the future
  const now = new Date();
  const orderDate = new Date(this.orderDate);
  orderDate.setHours(18, 0, 0, 0); // Deadline is 6 PM day before
  
  return this.status === 'pending' && now < orderDate;
};

module.exports = mongoose.model('MealOrder', mealOrderSchema);

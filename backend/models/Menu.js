const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'snack', 'drink'],
    default: 'lunch',
  },
  allergens: [{
    type: String,
    enum: ['nuts', 'dairy', 'gluten', 'eggs', 'seafood', 'soy'],
  }],
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
});

const dayMenuSchema = new mongoose.Schema({
  dayOfWeek: {
    type: Number, // 0 = Sunday, 1 = Monday, etc.
    required: true,
  },
  items: [menuItemSchema],
});

const menuSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolProfile',
    required: true,
  },
  weekStart: {
    type: Date,
    required: true,
  },
  weekEnd: {
    type: Date,
    required: true,
  },
  days: [dayMenuSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Unique index for school week
menuSchema.index({ schoolId: 1, weekStart: 1 }, { unique: true });

// Index for active menus
menuSchema.index({ schoolId: 1, isActive: 1 });

// Get menu for a specific day
menuSchema.methods.getMenuForDay = function(dayOfWeek) {
  return this.days.find(d => d.dayOfWeek === dayOfWeek);
};

// Get all available items for a day
menuSchema.methods.getAvailableItems = function(dayOfWeek) {
  const dayMenu = this.getMenuForDay(dayOfWeek);
  if (!dayMenu) return [];
  return dayMenu.items.filter(item => item.available);
};

module.exports = mongoose.model('Menu', menuSchema);

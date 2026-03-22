const mongoose = require('mongoose');

const dietaryPreferenceSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
    unique: true,
  },
  allergies: [{
    type: String,
    enum: ['nuts', 'dairy', 'gluten', 'eggs', 'seafood', 'soy', 'other'],
  }],
  otherAllergies: {
    type: String,
    default: '',
  },
  restrictions: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'halal', 'kosher', 'no_pork', 'no_beef'],
  }],
  preferences: [{
    type: String,
  }],
  dislikes: [{
    type: String,
  }],
  notes: {
    type: String,
    maxlength: 500,
    default: '',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for child lookup
dietaryPreferenceSchema.index({ childId: 1 });

// Check if item contains allergens
dietaryPreferenceSchema.methods.hasAllergens = function(itemAllergens) {
  if (!itemAllergens || itemAllergens.length === 0) return false;
  return this.allergies.some(allergy => itemAllergens.includes(allergy));
};

module.exports = mongoose.model('DietaryPreference', dietaryPreferenceSchema);

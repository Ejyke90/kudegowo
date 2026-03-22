const express = require('express');
const router = express.Router();
const DietaryPreference = require('../models/DietaryPreference');
const Child = require('../models/Child');
const { authenticateToken } = require('../middleware/auth');

// Get dietary preferences for a child
router.get('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    
    let preferences = await DietaryPreference.findOne({ childId });
    
    if (!preferences) {
      // Return default empty preferences
      preferences = {
        childId,
        allergies: [],
        restrictions: [],
        preferences: [],
        dislikes: [],
        notes: '',
      };
    }
    
    res.json({ status: true, data: preferences });
  } catch (error) {
    console.error('Get dietary preferences error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create or update dietary preferences
router.put('/child/:childId', authenticateToken, async (req, res) => {
  try {
    const { childId } = req.params;
    const { allergies, otherAllergies, restrictions, preferences, dislikes, notes } = req.body;
    
    let dietaryPref = await DietaryPreference.findOne({ childId });
    
    if (dietaryPref) {
      if (allergies !== undefined) dietaryPref.allergies = allergies;
      if (otherAllergies !== undefined) dietaryPref.otherAllergies = otherAllergies;
      if (restrictions !== undefined) dietaryPref.restrictions = restrictions;
      if (preferences !== undefined) dietaryPref.preferences = preferences;
      if (dislikes !== undefined) dietaryPref.dislikes = dislikes;
      if (notes !== undefined) dietaryPref.notes = notes;
      dietaryPref.updatedBy = req.user.id;
      
      await dietaryPref.save();
    } else {
      dietaryPref = await DietaryPreference.create({
        childId,
        allergies: allergies || [],
        otherAllergies: otherAllergies || '',
        restrictions: restrictions || [],
        preferences: preferences || [],
        dislikes: dislikes || [],
        notes: notes || '',
        updatedBy: req.user.id,
      });
    }
    
    res.json({
      status: true,
      message: 'Dietary preferences updated',
      data: dietaryPref,
    });
  } catch (error) {
    console.error('Update dietary preferences error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get dietary preferences for all parent's children
router.get('/my-children', authenticateToken, async (req, res) => {
  try {
    const parentId = req.user.id;
    
    const children = await Child.find({ parentId });
    
    const result = await Promise.all(
      children.map(async (child) => {
        const preferences = await DietaryPreference.findOne({ childId: child._id });
        
        return {
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
          },
          preferences: preferences || {
            allergies: [],
            restrictions: [],
            preferences: [],
            dislikes: [],
            notes: '',
          },
        };
      })
    );
    
    res.json({ status: true, data: result });
  } catch (error) {
    console.error('Get my children dietary preferences error:', error);
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get allergen options
router.get('/allergens', authenticateToken, async (req, res) => {
  res.json({
    status: true,
    data: {
      allergens: ['nuts', 'dairy', 'gluten', 'eggs', 'seafood', 'soy', 'other'],
      restrictions: ['vegetarian', 'vegan', 'halal', 'kosher', 'no_pork', 'no_beef'],
    },
  });
});

module.exports = router;

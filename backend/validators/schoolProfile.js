const { body, param, query } = require('express-validator');

const createSchoolProfile = [
  body('name')
    .trim()
    .notEmpty().withMessage('School name is required')
    .isLength({ min: 2, max: 200 }).withMessage('School name must be 2-200 characters')
    .escape(),
  body('schoolType')
    .notEmpty().withMessage('School type is required')
    .isIn(['primary', 'secondary', 'combined', 'nursery'])
    .withMessage('School type must be one of: primary, secondary, combined, nursery'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Address must be at most 500 characters')
    .escape(),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City must be at most 100 characters')
    .escape(),
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State must be at most 100 characters')
    .escape(),
  body('contactEmail')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('contactPhone')
    .optional()
    .trim()
    .matches(/^\+?\d{10,15}$/).withMessage('Please provide a valid phone number')
];

const updateSchoolProfile = [
  param('id').isMongoId().withMessage('Invalid school profile ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('School name must be 2-200 characters')
    .escape(),
  body('schoolType')
    .optional()
    .isIn(['primary', 'secondary', 'combined', 'nursery'])
    .withMessage('School type must be one of: primary, secondary, combined, nursery'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Address must be at most 500 characters')
    .escape(),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City must be at most 100 characters')
    .escape(),
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State must be at most 100 characters')
    .escape(),
  body('contactEmail')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('contactPhone')
    .optional()
    .trim()
    .matches(/^\+?\d{10,15}$/).withMessage('Please provide a valid phone number'),
  body('isVerified')
    .not().exists().withMessage('Cannot modify system-managed field: isVerified'),
  body('createdBy')
    .not().exists().withMessage('Cannot modify system-managed field: createdBy')
];

const getSchoolProfile = [
  param('id').isMongoId().withMessage('Invalid school profile ID')
];

const listSchoolProfiles = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt(),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search term must be at most 200 characters')
    .escape()
];

module.exports = {
  createSchoolProfile,
  updateSchoolProfile,
  getSchoolProfile,
  listSchoolProfiles
};

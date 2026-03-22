const { body, param, query } = require('express-validator');

const createChild = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 1, max: 100 }).withMessage('First name must be 1-100 characters')
    .escape(),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 1, max: 100 }).withMessage('Last name must be 1-100 characters')
    .escape(),
  body('schoolProfile')
    .notEmpty().withMessage('School profile is required')
    .isMongoId().withMessage('Invalid school profile ID'),
  body('grade')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Grade must be at most 50 characters')
    .escape(),
  body('studentId')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Student ID must be at most 50 characters')
    .escape(),
  body('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid ISO 8601 date')
    .custom(value => {
      if (new Date(value) >= new Date()) {
        throw new Error('Date of birth must be in the past');
      }
      return true;
    })
];

const updateChild = [
  param('id').isMongoId().withMessage('Invalid child ID'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('First name must be 1-100 characters')
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Last name must be 1-100 characters')
    .escape(),
  body('schoolProfile')
    .optional()
    .isMongoId().withMessage('Invalid school profile ID'),
  body('grade')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Grade must be at most 50 characters')
    .escape(),
  body('studentId')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Student ID must be at most 50 characters')
    .escape(),
  body('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid ISO 8601 date')
    .custom(value => {
      if (new Date(value) >= new Date()) {
        throw new Error('Date of birth must be in the past');
      }
      return true;
    }),
  body('parent')
    .not().exists().withMessage('Cannot modify parent field')
];

const getChild = [
  param('id').isMongoId().withMessage('Invalid child ID')
];

const listChildren = [
  query('schoolProfile')
    .optional()
    .isMongoId().withMessage('Invalid school profile ID'),
  query('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt()
];

module.exports = {
  createChild,
  updateChild,
  getChild,
  listChildren
};

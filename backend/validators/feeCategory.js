const { body, param, query } = require('express-validator');

const createFeeCategory = [
  body('name')
    .trim()
    .notEmpty().withMessage('Fee category name is required')
    .isLength({ min: 2, max: 200 }).withMessage('Name must be 2-200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters')
    .escape(),
  body('category')
    .notEmpty().withMessage('Category type is required')
    .isIn(['tuition', 'meals', 'transport', 'uniform', 'books', 'trips', 'extracurricular', 'other'])
    .withMessage('Category must be one of: tuition, meals, transport, uniform, books, trips, extracurricular, other'),
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ min: 50, max: 10000000 }).withMessage('Amount must be between ₦50 and ₦10,000,000'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
  body('isRecurring')
    .optional()
    .isBoolean().withMessage('isRecurring must be a boolean'),
  body('recurrenceRule')
    .optional()
    .isObject().withMessage('Recurrence rule must be an object'),
  body('recurrenceRule.frequency')
    .if(body('isRecurring').equals(true))
    .notEmpty().withMessage('Frequency is required for recurring fees')
    .isIn(['weekly', 'biweekly', 'monthly', 'termly', 'annually'])
    .withMessage('Frequency must be one of: weekly, biweekly, monthly, termly, annually'),
  body('recurrenceRule.startDate')
    .if(body('isRecurring').equals(true))
    .notEmpty().withMessage('Start date is required for recurring fees')
    .isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  body('recurrenceRule.endDate')
    .optional()
    .isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  body('recurrenceRule.dayOfMonth')
    .optional()
    .isInt({ min: 1, max: 31 }).withMessage('Day of month must be between 1 and 31'),
  body('schoolProfile')
    .notEmpty().withMessage('School profile is required')
    .isMongoId().withMessage('Invalid school profile ID'),
  body('applicableTo')
    .optional()
    .isArray().withMessage('applicableTo must be an array'),
  body('applicableTo.*')
    .optional()
    .isMongoId().withMessage('Each child ID must be a valid ID')
];

const updateFeeCategory = [
  param('id').isMongoId().withMessage('Invalid fee category ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('Name must be 2-200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters')
    .escape(),
  body('category')
    .optional()
    .isIn(['tuition', 'meals', 'transport', 'uniform', 'books', 'trips', 'extracurricular', 'other'])
    .withMessage('Category must be one of: tuition, meals, transport, uniform, books, trips, extracurricular, other'),
  body('amount')
    .optional()
    .isFloat({ min: 50, max: 10000000 }).withMessage('Amount must be between ₦50 and ₦10,000,000'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
  body('isRecurring')
    .optional()
    .isBoolean().withMessage('isRecurring must be a boolean'),
  body('applicableTo')
    .optional()
    .isArray().withMessage('applicableTo must be an array'),
  body('applicableTo.*')
    .optional()
    .isMongoId().withMessage('Each child ID must be a valid ID'),
  body('createdBy')
    .not().exists().withMessage('Cannot modify createdBy field'),
  body('schoolProfile')
    .not().exists().withMessage('Cannot modify schoolProfile field')
];

const getFeeCategory = [
  param('id').isMongoId().withMessage('Invalid fee category ID')
];

const listFeeCategories = [
  query('schoolProfile')
    .optional()
    .isMongoId().withMessage('Invalid school profile ID'),
  query('category')
    .optional()
    .isIn(['tuition', 'meals', 'transport', 'uniform', 'books', 'trips', 'extracurricular', 'other'])
    .withMessage('Invalid category filter'),
  query('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  query('isRecurring')
    .optional()
    .isBoolean().withMessage('isRecurring must be a boolean'),
  query('dueBefore')
    .optional()
    .isISO8601().withMessage('dueBefore must be a valid ISO 8601 date'),
  query('dueAfter')
    .optional()
    .isISO8601().withMessage('dueAfter must be a valid ISO 8601 date'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt()
];

const upcomingFees = [
  query('days')
    .optional()
    .isInt({ min: 1, max: 90 }).withMessage('Days must be between 1 and 90')
    .toInt()
];

const updateFuturePayments = [
  param('id').isMongoId().withMessage('Invalid fee category ID'),
  body('newAmount')
    .notEmpty().withMessage('New amount is required')
    .isFloat({ min: 50, max: 10000000 }).withMessage('Amount must be between ₦50 and ₦10,000,000')
];

module.exports = {
  createFeeCategory,
  updateFeeCategory,
  getFeeCategory,
  listFeeCategories,
  upcomingFees,
  updateFuturePayments
};

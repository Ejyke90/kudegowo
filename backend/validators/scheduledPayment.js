const { body, param, query } = require('express-validator');

const createScheduledPayment = [
  body('child')
    .notEmpty().withMessage('Child is required')
    .isMongoId().withMessage('Invalid child ID'),
  body('feeCategory')
    .notEmpty().withMessage('Fee category is required')
    .isMongoId().withMessage('Invalid fee category ID'),
  body('scheduledDate')
    .notEmpty().withMessage('Scheduled date is required')
    .isISO8601().withMessage('Scheduled date must be a valid ISO 8601 date')
    .custom(value => {
      if (new Date(value) <= new Date()) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    })
];

const bulkCreateScheduledPayment = [
  body('feeCategory')
    .notEmpty().withMessage('Fee category is required')
    .isMongoId().withMessage('Invalid fee category ID'),
  body('scheduledDate')
    .notEmpty().withMessage('Scheduled date is required')
    .isISO8601().withMessage('Scheduled date must be a valid ISO 8601 date')
    .custom(value => {
      if (new Date(value) <= new Date()) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    })
];

const getScheduledPayment = [
  param('id').isMongoId().withMessage('Invalid scheduled payment ID')
];

const listScheduledPayments = [
  query('status')
    .optional()
    .isIn(['pending', 'processing', 'completed', 'failed', 'cancelled', 'skipped'])
    .withMessage('Invalid status filter'),
  query('child')
    .optional()
    .isMongoId().withMessage('Invalid child ID'),
  query('feeCategory')
    .optional()
    .isMongoId().withMessage('Invalid fee category ID'),
  query('fromDate')
    .optional()
    .isISO8601().withMessage('fromDate must be a valid ISO 8601 date'),
  query('toDate')
    .optional()
    .isISO8601().withMessage('toDate must be a valid ISO 8601 date'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt()
];

const actionOnPayment = [
  param('id').isMongoId().withMessage('Invalid scheduled payment ID')
];

module.exports = {
  createScheduledPayment,
  bulkCreateScheduledPayment,
  getScheduledPayment,
  listScheduledPayments,
  actionOnPayment
};

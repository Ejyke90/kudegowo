const crypto = require('crypto');

/**
 * Generates a unique request ID for tracing.
 * Attaches it to req.requestId and the X-Request-Id response header.
 */
const requestIdMiddleware = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
};

/**
 * Global error handler middleware.
 * Catches unhandled errors from route handlers and returns a structured response.
 * Must be registered AFTER all routes in Express.
 */
const globalErrorHandler = (err, req, res, next) => {
  const requestId = req.requestId || 'unknown';

  // Log the error with request context
  console.error(`[Error] [${requestId}] ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      error: 'Validation failed',
      errors,
      requestId
    });
  }

  // Mongoose cast error (invalid ObjectId etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: `Invalid ${err.path}: ${err.value}`,
      requestId
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      error: `Duplicate value for ${field}`,
      requestId
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      requestId
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      requestId
    });
  }

  // Default to 500
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : err.message,
    requestId
  });
};

module.exports = { requestIdMiddleware, globalErrorHandler };

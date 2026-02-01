const express = require('express');
const router = express.Router();

// Health check endpoint for Railway
router.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    database: 'connected' // You can add actual DB connection check
  };
  
  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).json(healthCheck);
  }
});

module.exports = router;

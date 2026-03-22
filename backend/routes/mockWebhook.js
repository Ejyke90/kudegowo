const express = require('express');
const router = express.Router();
const mockPaystack = require('../services/mockPaystack');

// Complete a mock payment (called from mock checkout UI)
router.post('/complete', async (req, res) => {
  try {
    const { reference, cardNumber } = req.body;
    
    if (!reference || !cardNumber) {
      return res.status(400).json({
        status: false,
        message: 'Reference and card number are required',
      });
    }
    
    const result = mockPaystack.completeTransaction(reference, cardNumber);
    
    // Send webhook after delay
    const webhookDelay = parseInt(process.env.MOCK_WEBHOOK_DELAY) || 1000;
    const webhookUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/webhooks/paystack`;
    
    // Fire and forget webhook
    mockPaystack.sendWebhook(reference, webhookUrl, webhookDelay).catch(console.error);
    
    res.json(result);
  } catch (error) {
    console.error('Mock payment completion error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Initialize a mock transaction
router.post('/initialize', (req, res) => {
  try {
    const { email, amount, metadata } = req.body;
    
    if (!email || !amount) {
      return res.status(400).json({
        status: false,
        message: 'Email and amount are required',
      });
    }
    
    const result = mockPaystack.initializeTransaction({ email, amount, metadata });
    res.json(result);
  } catch (error) {
    console.error('Mock transaction initialization error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Verify a mock transaction
router.get('/verify/:reference', (req, res) => {
  try {
    const { reference } = req.params;
    const result = mockPaystack.verifyTransaction(reference);
    res.json(result);
  } catch (error) {
    console.error('Mock transaction verification error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Charge authorization (recurring payments)
router.post('/charge', (req, res) => {
  try {
    const { authorization_code, email, amount, metadata } = req.body;
    
    if (!authorization_code || !email || !amount) {
      return res.status(400).json({
        status: false,
        message: 'Authorization code, email, and amount are required',
      });
    }
    
    const result = mockPaystack.chargeAuthorization({
      authorization_code,
      email,
      amount,
      metadata,
    });
    res.json(result);
  } catch (error) {
    console.error('Mock charge error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get all transactions (demo purposes)
router.get('/transactions', (req, res) => {
  try {
    const transactions = mockPaystack.getAllTransactions();
    res.json({
      status: true,
      data: transactions,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Clear all transactions (demo reset)
router.delete('/transactions', (req, res) => {
  try {
    const result = mockPaystack.clearTransactions();
    res.json(result);
  } catch (error) {
    console.error('Clear transactions error:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get test card info
router.get('/test-cards', (req, res) => {
  res.json({
    status: true,
    data: {
      success: { number: '4084 0840 8408 4081', description: 'Successful payment' },
      insufficient_funds: { number: '4084 0840 8408 4082', description: 'Insufficient funds' },
      declined: { number: '4084 0840 8408 4083', description: 'Card declined' },
    },
  });
});

module.exports = router;

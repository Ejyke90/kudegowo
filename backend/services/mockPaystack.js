/**
 * Mock Paystack Service
 * Simulates Paystack API for demo purposes
 */

// In-memory transaction store
const transactions = new Map();

// Test card scenarios
const TEST_CARDS = {
  '4084084084084081': { status: 'success', message: 'Payment successful' },
  '4084084084084082': { status: 'failed', message: 'Insufficient funds' },
  '4084084084084083': { status: 'failed', message: 'Card declined' },
};

// Generate unique reference
function generateReference() {
  return `KDG_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Initialize transaction
function initializeTransaction({ email, amount, metadata = {} }) {
  const reference = generateReference();
  const authorizationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/mock-payment?reference=${reference}&amount=${amount}&email=${email}`;
  
  transactions.set(reference, {
    reference,
    email,
    amount,
    metadata,
    status: 'pending',
    createdAt: new Date(),
  });
  
  return {
    status: true,
    message: 'Authorization URL created',
    data: {
      authorization_url: authorizationUrl,
      access_code: reference,
      reference,
    },
  };
}

// Verify transaction
function verifyTransaction(reference) {
  const transaction = transactions.get(reference);
  
  if (!transaction) {
    return {
      status: false,
      message: 'Transaction not found',
      data: null,
    };
  }
  
  return {
    status: true,
    message: transaction.status === 'success' ? 'Verification successful' : 'Transaction failed',
    data: {
      reference: transaction.reference,
      amount: transaction.amount,
      currency: 'NGN',
      status: transaction.status,
      gateway_response: transaction.gatewayResponse || 'Pending',
      paid_at: transaction.paidAt || null,
      channel: 'card',
      metadata: transaction.metadata,
      customer: {
        email: transaction.email,
      },
    },
  };
}

// Complete transaction (called from mock checkout)
function completeTransaction(reference, cardNumber) {
  const transaction = transactions.get(reference);
  
  if (!transaction) {
    return {
      status: false,
      message: 'Transaction not found',
    };
  }
  
  // Determine outcome based on card
  const cleanCard = cardNumber.replace(/\s/g, '');
  const scenario = TEST_CARDS[cleanCard] || TEST_CARDS['4084084084084081']; // Default to success
  
  transaction.status = scenario.status;
  transaction.gatewayResponse = scenario.message;
  transaction.paidAt = scenario.status === 'success' ? new Date() : null;
  transaction.cardLast4 = cleanCard.slice(-4);
  
  transactions.set(reference, transaction);
  
  return {
    status: true,
    message: scenario.message,
    data: {
      reference: transaction.reference,
      status: transaction.status,
    },
  };
}

// Charge authorization (for recurring payments)
function chargeAuthorization({ authorization_code, email, amount, metadata = {} }) {
  const reference = generateReference();
  
  // Simulate successful recurring charge
  const transaction = {
    reference,
    email,
    amount,
    metadata,
    status: 'success',
    gatewayResponse: 'Approved',
    paidAt: new Date(),
    createdAt: new Date(),
    authorization_code,
  };
  
  transactions.set(reference, transaction);
  
  return {
    status: true,
    message: 'Charge attempted',
    data: {
      reference,
      amount,
      currency: 'NGN',
      status: 'success',
      gateway_response: 'Approved',
      paid_at: transaction.paidAt,
    },
  };
}

// Simulate webhook delivery
async function sendWebhook(reference, webhookUrl, delay = 1000) {
  const transaction = transactions.get(reference);
  
  if (!transaction) {
    return { status: false, message: 'Transaction not found' };
  }
  
  const eventType = transaction.status === 'success' ? 'charge.success' : 'charge.failed';
  
  const webhookPayload = {
    event: eventType,
    data: {
      reference: transaction.reference,
      amount: transaction.amount,
      currency: 'NGN',
      status: transaction.status,
      gateway_response: transaction.gatewayResponse,
      paid_at: transaction.paidAt,
      channel: 'card',
      metadata: transaction.metadata,
      customer: {
        email: transaction.email,
      },
    },
  };
  
  // Delay webhook delivery
  await new Promise(resolve => setTimeout(resolve, delay));
  
  try {
    const fetch = (await import('node-fetch')).default;
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Paystack-Signature': 'mock-signature',
      },
      body: JSON.stringify(webhookPayload),
    });
    
    return { status: true, message: 'Webhook sent' };
  } catch (error) {
    console.error('Webhook delivery failed:', error.message);
    return { status: false, message: error.message };
  }
}

// Get all transactions (for demo purposes)
function getAllTransactions() {
  return Array.from(transactions.values());
}

// Clear all transactions (for demo reset)
function clearTransactions() {
  transactions.clear();
  return { status: true, message: 'All transactions cleared' };
}

module.exports = {
  initializeTransaction,
  verifyTransaction,
  completeTransaction,
  chargeAuthorization,
  sendWebhook,
  getAllTransactions,
  clearTransactions,
  TEST_CARDS,
};

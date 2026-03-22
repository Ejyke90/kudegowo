/**
 * SMS Notification Service
 * Uses Termii for production, mock for development
 */

const MOCK_MODE = process.env.MOCK_SMS === 'true';
const TERMII_API_KEY = process.env.TERMII_API_KEY;
const TERMII_SENDER_ID = process.env.TERMII_SENDER_ID || 'KudEgOwo';

/**
 * Send SMS notification
 */
async function send({ userId, type, title, body, data, user }) {
  const phone = user.phone;
  
  if (!phone) {
    throw new Error('User phone not found');
  }
  
  // Format message (SMS has character limits)
  const message = `${title}\n${body}`.substring(0, 160);
  
  if (MOCK_MODE || !TERMII_API_KEY) {
    return mockSend({ phone, message });
  }
  
  return termiiSend({ phone, message });
}

/**
 * Mock SMS send (logs to console)
 */
function mockSend({ phone, message }) {
  console.log('═══════════════════════════════════════════');
  console.log('[MOCK SMS]');
  console.log(`To: ${phone}`);
  console.log(`Message: ${message}`);
  console.log('═══════════════════════════════════════════');
  
  return {
    provider: 'mock',
    status: 'sent',
    messageId: `mock_sms_${Date.now()}`,
  };
}

/**
 * Send via Termii
 */
async function termiiSend({ phone, message }) {
  try {
    const response = await fetch('https://api.ng.termii.com/api/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TERMII_API_KEY,
        to: phone,
        from: TERMII_SENDER_ID,
        sms: message,
        type: 'plain',
        channel: 'generic',
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok || result.code !== 'ok') {
      throw new Error(result.message || 'Termii API error');
    }
    
    return {
      provider: 'termii',
      status: 'sent',
      messageId: result.message_id,
    };
  } catch (error) {
    console.error('[SMS] Termii error:', error.message);
    throw error;
  }
}

module.exports = { send };

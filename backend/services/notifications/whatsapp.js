/**
 * WhatsApp Notification Service
 * Mock implementation for demo purposes
 */

/**
 * Send WhatsApp notification (mock)
 */
async function send({ userId, type, title, body, data, user }) {
  const phone = user.phone;
  
  if (!phone) {
    throw new Error('User phone not found');
  }
  
  // Always mock for now (WhatsApp Business API requires approval)
  return mockSend({ phone, title, body });
}

/**
 * Mock WhatsApp send (logs to console)
 */
function mockSend({ phone, title, body }) {
  console.log('═══════════════════════════════════════════');
  console.log('[MOCK WHATSAPP]');
  console.log(`To: ${phone}`);
  console.log(`Title: ${title}`);
  console.log(`Message: ${body}`);
  console.log('═══════════════════════════════════════════');
  
  return {
    provider: 'mock',
    status: 'sent',
    messageId: `mock_wa_${Date.now()}`,
  };
}

module.exports = { send };

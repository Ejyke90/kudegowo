/**
 * Push Notification Service
 * Mock implementation for demo purposes (would use FCM in production)
 */

/**
 * Send push notification (mock)
 */
async function send({ userId, type, title, body, data, user }) {
  // Always mock for now (FCM requires setup)
  return mockSend({ userId, title, body, data });
}

/**
 * Mock push send (logs to console)
 */
function mockSend({ userId, title, body, data }) {
  console.log('═══════════════════════════════════════════');
  console.log('[MOCK PUSH]');
  console.log(`To User: ${userId}`);
  console.log(`Title: ${title}`);
  console.log(`Body: ${body}`);
  if (data) console.log(`Data: ${JSON.stringify(data)}`);
  console.log('═══════════════════════════════════════════');
  
  return {
    provider: 'mock',
    status: 'sent',
    messageId: `mock_push_${Date.now()}`,
  };
}

module.exports = { send };

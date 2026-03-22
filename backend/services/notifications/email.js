/**
 * Email Notification Service
 * Uses Resend for production, mock for development
 */

const MOCK_MODE = process.env.MOCK_EMAIL === 'true';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/**
 * Send email notification
 */
async function send({ userId, type, title, body, data, user }) {
  const email = user.email;
  
  if (!email) {
    throw new Error('User email not found');
  }
  
  if (MOCK_MODE || !RESEND_API_KEY) {
    return mockSend({ email, title, body, data });
  }
  
  return resendSend({ email, title, body, data });
}

/**
 * Mock email send (logs to console)
 */
function mockSend({ email, title, body, data }) {
  console.log('═══════════════════════════════════════════');
  console.log('[MOCK EMAIL]');
  console.log(`To: ${email}`);
  console.log(`Subject: ${title}`);
  console.log(`Body: ${body}`);
  if (data) console.log(`Data: ${JSON.stringify(data)}`);
  console.log('═══════════════════════════════════════════');
  
  return {
    provider: 'mock',
    status: 'sent',
    messageId: `mock_${Date.now()}`,
  };
}

/**
 * Send via Resend
 */
async function resendSend({ email, title, body, data }) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'KudEgOwo <noreply@kudegowo.com>',
        to: [email],
        subject: title,
        html: formatEmailHtml(title, body, data),
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Resend API error');
    }
    
    return {
      provider: 'resend',
      status: 'sent',
      messageId: result.id,
    };
  } catch (error) {
    console.error('[EMAIL] Resend error:', error.message);
    throw error;
  }
}

/**
 * Format email HTML
 */
function formatEmailHtml(title, body, data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10B981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>KudEgOwo</h1>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>${body}</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} KudEgOwo. All rights reserved.</p>
          <p>Nigeria's Smartest School Payment Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { send };

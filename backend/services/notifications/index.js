/**
 * Notification Dispatcher
 * Central service for sending notifications across multiple channels
 */

const emailService = require('./email');
const smsService = require('./sms');
const whatsappService = require('./whatsapp');
const pushService = require('./push');
const templates = require('./templates');

// Channel handlers
const channelHandlers = {
  email: emailService.send,
  sms: smsService.send,
  whatsapp: whatsappService.send,
  push: pushService.send,
};

/**
 * Send notification to multiple channels
 * @param {Object} options
 * @param {string} options.userId - User ID
 * @param {string} options.type - Notification type
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {string[]} options.channels - Channels to send to
 * @param {Object} options.data - Additional data
 * @param {Object} options.user - User object with contact info
 */
async function dispatch({ userId, type, title, body, channels, data = {}, user = {} }) {
  const results = {};
  
  for (const channel of channels) {
    const handler = channelHandlers[channel];
    
    if (!handler) {
      results[channel] = { status: 'failed', error: 'Unknown channel' };
      continue;
    }
    
    try {
      const result = await handler({
        userId,
        type,
        title,
        body,
        data,
        user,
      });
      results[channel] = { status: 'sent', result };
    } catch (error) {
      console.error(`[${channel.toUpperCase()}] Delivery failed:`, error.message);
      results[channel] = { status: 'failed', error: error.message };
    }
  }
  
  return results;
}

/**
 * Send notification using a template
 * @param {string} templateName - Template name
 * @param {Object} templateData - Data to fill template
 * @param {string[]} channels - Channels to send to
 * @param {Object} user - User object
 */
async function sendFromTemplate(templateName, templateData, channels, user) {
  const template = templates[templateName];
  
  if (!template) {
    throw new Error(`Template not found: ${templateName}`);
  }
  
  const { title, body, type } = template(templateData);
  
  return dispatch({
    userId: user._id || user.id,
    type,
    title,
    body,
    channels,
    data: templateData,
    user,
  });
}

/**
 * Send payment confirmation notification
 */
async function sendPaymentConfirmation(user, paymentData) {
  return sendFromTemplate('paymentConfirmation', paymentData, ['email', 'push'], user);
}

/**
 * Send payment reminder notification
 */
async function sendPaymentReminder(user, reminderData) {
  return sendFromTemplate('paymentReminder', reminderData, ['email', 'sms', 'push'], user);
}

/**
 * Send attendance alert notification
 */
async function sendAttendanceAlert(user, attendanceData) {
  return sendFromTemplate('attendanceAlert', attendanceData, ['sms', 'push'], user);
}

/**
 * Send emergency alert notification
 */
async function sendEmergencyAlert(user, alertData) {
  return sendFromTemplate('emergencyAlert', alertData, ['sms', 'whatsapp', 'push', 'email'], user);
}

module.exports = {
  dispatch,
  sendFromTemplate,
  sendPaymentConfirmation,
  sendPaymentReminder,
  sendAttendanceAlert,
  sendEmergencyAlert,
  templates,
};

/**
 * Notification Templates
 */

/**
 * Payment confirmation template
 */
function paymentConfirmation({ amount, childName, feeType, schoolName, reference }) {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
  
  return {
    type: 'payment_confirmation',
    title: '✅ Payment Successful',
    body: `Your payment of ${formattedAmount} for ${childName}'s ${feeType} at ${schoolName} was successful. Reference: ${reference}`,
  };
}

/**
 * Payment reminder template
 */
function paymentReminder({ amount, childName, feeType, schoolName, dueDate }) {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
  
  const formattedDate = new Date(dueDate).toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return {
    type: 'payment_reminder',
    title: '⏰ Payment Reminder',
    body: `Reminder: ${formattedAmount} for ${childName}'s ${feeType} at ${schoolName} is due on ${formattedDate}. Pay now to avoid late fees.`,
  };
}

/**
 * Attendance alert template
 */
function attendanceAlert({ childName, action, time, schoolName }) {
  const formattedTime = new Date(time).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const emoji = action === 'check_in' ? '🏫' : '🏠';
  const actionText = action === 'check_in' ? 'checked in' : 'checked out';
  
  return {
    type: 'attendance_alert',
    title: `${emoji} ${childName} ${actionText}`,
    body: `${childName} ${actionText} at ${schoolName} at ${formattedTime}.`,
  };
}

/**
 * Emergency alert template
 */
function emergencyAlert({ schoolName, alertType, severity, message }) {
  const severityEmoji = {
    low: 'ℹ️',
    medium: '⚠️',
    high: '🚨',
    critical: '🆘',
  };
  
  return {
    type: 'emergency_alert',
    title: `${severityEmoji[severity] || '🚨'} ${severity.toUpperCase()}: ${alertType}`,
    body: `${schoolName}: ${message}`,
  };
}

/**
 * Passphrase notification template
 */
function dailyPassphrase({ childName, passphrase, validUntil }) {
  const formattedTime = new Date(validUntil).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return {
    type: 'daily_passphrase',
    title: `🔐 Today's Passphrase for ${childName}`,
    body: `Your child's gate passphrase for today is: ${passphrase}. Valid until ${formattedTime}.`,
  };
}

/**
 * Savings goal reached template
 */
function savingsGoalReached({ childName, goalName, amount }) {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
  
  return {
    type: 'savings_goal_reached',
    title: `🎉 ${childName} reached their goal!`,
    body: `Congratulations! ${childName} has saved ${formattedAmount} and reached their "${goalName}" goal!`,
  };
}

/**
 * Quiz completion template
 */
function quizCompleted({ childName, quizTitle, score, kudiCoinsEarned }) {
  return {
    type: 'quiz_completed',
    title: `📚 ${childName} completed a quiz!`,
    body: `${childName} scored ${score}% on "${quizTitle}" and earned ${kudiCoinsEarned} KudiCoins!`,
  };
}

/**
 * Meal order confirmation template
 */
function mealOrderConfirmation({ childName, orderDate, items, totalAmount }) {
  const formattedDate = new Date(orderDate).toLocaleDateString('en-NG', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(totalAmount);
  
  return {
    type: 'meal_order_confirmation',
    title: `🍽️ Meal Order Confirmed`,
    body: `Meal order for ${childName} on ${formattedDate} confirmed. ${items.length} items, total: ${formattedAmount}.`,
  };
}

module.exports = {
  paymentConfirmation,
  paymentReminder,
  attendanceAlert,
  emergencyAlert,
  dailyPassphrase,
  savingsGoalReached,
  quizCompleted,
  mealOrderConfirmation,
};

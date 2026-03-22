/**
 * Compute the next occurrence date for a recurring fee based on the current date
 * and the recurrence rule.
 *
 * @param {Date} currentDate - The current occurrence date
 * @param {Object} rule - The recurrence rule
 * @param {string} rule.frequency - weekly | biweekly | monthly | termly | annually
 * @param {number} [rule.dayOfMonth] - Day of month (1-31) for monthly frequency
 * @param {Date} [rule.endDate] - Optional end date for the recurrence
 * @returns {Date|null} - The next occurrence date, or null if past endDate
 */
function computeNextDate(currentDate, rule) {
  if (!currentDate || !rule || !rule.frequency) return null;

  const date = new Date(currentDate);

  switch (rule.frequency) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'biweekly':
      date.setDate(date.getDate() + 14);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      if (rule.dayOfMonth) {
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        date.setDate(Math.min(rule.dayOfMonth, lastDay));
      }
      break;
    case 'termly':
      // Nigerian school terms are roughly 4 months apart
      date.setMonth(date.getMonth() + 4);
      break;
    case 'annually':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      return null;
  }

  // Check if past end date
  if (rule.endDate && date > new Date(rule.endDate)) {
    return null;
  }

  return date;
}

module.exports = { computeNextDate };

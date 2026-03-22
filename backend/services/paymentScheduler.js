const ScheduledPayment = require('../models/ScheduledPayment');
const FeeCategory = require('../models/FeeCategory');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { computeNextDate } = require('../utils/recurrence');

const BATCH_SIZE = 50;
const MAX_RETRIES = 3;
// Retry delays: 1 hour, 6 hours, 24 hours (in milliseconds)
const RETRY_DELAYS = [
  1 * 60 * 60 * 1000,
  6 * 60 * 60 * 1000,
  24 * 60 * 60 * 1000
];

/**
 * Process all due scheduled payments in batches.
 * Called by the cron job every 15 minutes.
 */
async function processDuePayments() {
  const now = new Date();

  const duePayments = await ScheduledPayment.find({
    status: 'pending',
    scheduledDate: { $lte: now }
  })
  .sort({ scheduledDate: 1 })
  .limit(BATCH_SIZE)
  .populate('feeCategory');

  const results = { processed: 0, succeeded: 0, failed: 0, skipped: 0 };

  for (const payment of duePayments) {
    try {
      // Acquire optimistic lock
      const locked = await ScheduledPayment.findOneAndUpdate(
        { _id: payment._id, status: 'pending', version: payment.version },
        { $set: { status: 'processing' }, $inc: { version: 1 } },
        { new: true }
      );

      if (!locked) {
        results.skipped++;
        continue; // Already processing or status changed
      }

      results.processed++;

      // Execute payment
      const result = await executePayment(locked);

      if (result.success) {
        results.succeeded++;
        await generateNextOccurrence(locked);
      } else {
        results.failed++;
        await handleFailure(locked, result.reason);
      }
    } catch (error) {
      console.error(`[PaymentScheduler] Error processing payment ${payment._id}:`, error.message);
      // Reset to pending on unexpected error
      try {
        await ScheduledPayment.findByIdAndUpdate(payment._id, {
          $set: { status: 'pending' }
        });
      } catch (resetErr) {
        console.error(`[PaymentScheduler] Failed to reset payment ${payment._id}:`, resetErr.message);
      }
    }
  }

  return results;
}

/**
 * Execute a single scheduled payment: check balance, deduct, create transaction.
 */
async function executePayment(scheduledPayment) {
  // Atomic balance deduction with guard
  const user = await User.findOneAndUpdate(
    { _id: scheduledPayment.parent, balance: { $gte: scheduledPayment.amount } },
    { $inc: { balance: -scheduledPayment.amount } },
    { new: true }
  );

  if (!user) {
    return { success: false, reason: 'Insufficient balance' };
  }

  // Create transaction
  const transaction = new Transaction({
    user: scheduledPayment.parent,
    type: 'payment',
    amount: scheduledPayment.amount,
    status: 'completed',
    reference: `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    paymentMethod: 'auto',
    metadata: {
      scheduledPaymentId: scheduledPayment._id,
      childId: scheduledPayment.child,
      feeCategoryId: scheduledPayment.feeCategory
    }
  });
  await transaction.save();

  // Mark scheduled payment as completed
  await ScheduledPayment.findByIdAndUpdate(scheduledPayment._id, {
    $set: { status: 'completed', transaction: transaction._id }
  });

  return { success: true, transaction };
}

/**
 * Handle a failed payment: retry with backoff or mark as terminal failure.
 */
async function handleFailure(payment, reason) {
  const retryCount = payment.retryCount + 1;

  if (retryCount >= MAX_RETRIES) {
    // Terminal failure
    await ScheduledPayment.findByIdAndUpdate(payment._id, {
      $set: {
        status: 'failed',
        failureReason: reason,
        retryCount,
        lastRetryAt: new Date()
      }
    });
    console.log(`[PaymentScheduler] Payment ${payment._id} permanently failed after ${MAX_RETRIES} retries: ${reason}`);
  } else {
    // Re-queue with exponential backoff
    const delay = RETRY_DELAYS[retryCount - 1];
    const nextRetryDate = new Date(Date.now() + delay);

    await ScheduledPayment.findByIdAndUpdate(payment._id, {
      $set: {
        status: 'pending',
        failureReason: reason,
        scheduledDate: nextRetryDate,
        retryCount,
        lastRetryAt: new Date()
      }
    });
    console.log(`[PaymentScheduler] Payment ${payment._id} re-queued for retry #${retryCount} at ${nextRetryDate.toISOString()}`);
  }
}

/**
 * Generate the next occurrence for a recurring fee after payment completes or is skipped.
 */
async function generateNextOccurrence(completedPayment) {
  const feeCategory = await FeeCategory.findById(
    completedPayment.feeCategory._id || completedPayment.feeCategory
  );

  if (!feeCategory || !feeCategory.isRecurring || !feeCategory.isActive) return null;

  const nextDate = computeNextDate(
    completedPayment.scheduledDate,
    feeCategory.recurrenceRule
  );

  if (!nextDate) return null; // Past end date or invalid rule

  try {
    const next = await ScheduledPayment.create({
      parent: completedPayment.parent,
      child: completedPayment.child,
      feeCategory: completedPayment.feeCategory._id || completedPayment.feeCategory,
      amount: feeCategory.amount,
      scheduledDate: nextDate,
      status: 'pending',
      isAutoGenerated: true,
      sourcePayment: completedPayment._id
    });
    return next;
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate — next occurrence already exists, which is fine
      return null;
    }
    throw error;
  }
}

/**
 * Recover scheduled payments stuck in 'processing' for more than 30 minutes.
 * Called by a secondary cron job every 60 minutes.
 */
async function recoverStaleLocks() {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const result = await ScheduledPayment.updateMany(
    {
      status: 'processing',
      updatedAt: { $lt: thirtyMinutesAgo }
    },
    { $set: { status: 'pending' } }
  );

  if (result.modifiedCount > 0) {
    console.log(`[PaymentScheduler] Recovered ${result.modifiedCount} stale processing payments`);
  }

  return result.modifiedCount;
}

module.exports = {
  processDuePayments,
  executePayment,
  handleFailure,
  generateNextOccurrence,
  recoverStaleLocks
};

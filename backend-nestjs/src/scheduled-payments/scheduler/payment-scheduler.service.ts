import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ScheduledPayment,
  ScheduledPaymentDocument,
} from '../schemas/scheduled-payment.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { NotificationsService } from '../../notifications/notifications.service';
import {
  PaymentStatus,
  NotificationType,
  RecurrenceFrequency,
} from '../../common/enums';

const BATCH_SIZE = 50;
const MAX_RETRIES = 3;
const BACKOFF_HOURS = [1, 6, 24];
const STALE_LOCK_MINUTES = 30;

@Injectable()
export class PaymentSchedulerService {
  private readonly logger = new Logger(PaymentSchedulerService.name);

  constructor(
    @InjectModel(ScheduledPayment.name)
    private readonly paymentModel: Model<ScheduledPaymentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(process.env.PAYMENT_CRON_INTERVAL || '*/15 * * * *')
  async processDuePayments(): Promise<void> {
    this.logger.log('Processing due payments...');
    const now = new Date();

    const duePayments = await this.paymentModel
      .find({
        status: PaymentStatus.PENDING,
        scheduledDate: { $lte: now },
      })
      .limit(BATCH_SIZE)
      .exec();

    this.logger.log(`Found ${duePayments.length} due payments`);

    for (const payment of duePayments) {
      await this.processPayment(payment);
    }
  }

  @Cron('0 8 * * *')
  async sendUpcomingNotifications(): Promise<void> {
    this.logger.log('Sending upcoming payment notifications...');
    const now = new Date();
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const upcomingPayments = await this.paymentModel
      .find({
        status: PaymentStatus.PENDING,
        scheduledDate: { $gte: now, $lte: threeDaysFromNow },
      })
      .populate('child', 'firstName lastName')
      .exec();

    for (const payment of upcomingPayments) {
      const child = payment.child as unknown as { firstName: string; lastName: string };
      const daysUntil = Math.ceil(
        (payment.scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      await this.notificationsService.create({
        userId: payment.parent.toString(),
        type: NotificationType.PAYMENT_DUE,
        title: `Payment due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`,
        message: `₦${payment.amount.toLocaleString()} ${payment.feeType} payment for ${child.firstName} ${child.lastName} is due ${daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`}.`,
        metadata: {
          scheduledPaymentId: (payment._id as Types.ObjectId).toString(),
          childId: payment.child.toString(),
          schoolProfileId: payment.schoolProfile.toString(),
          amount: payment.amount,
          feeType: payment.feeType,
        },
      });
    }

    const overduePayments = await this.paymentModel
      .find({
        status: PaymentStatus.PENDING,
        scheduledDate: { $lt: now },
      })
      .populate('child', 'firstName lastName')
      .exec();

    for (const payment of overduePayments) {
      const child = payment.child as unknown as { firstName: string; lastName: string };
      await this.notificationsService.create({
        userId: payment.parent.toString(),
        type: NotificationType.PAYMENT_OVERDUE,
        title: 'Payment overdue',
        message: `₦${payment.amount.toLocaleString()} ${payment.feeType} payment for ${child.firstName} ${child.lastName} is overdue.`,
        metadata: {
          scheduledPaymentId: (payment._id as Types.ObjectId).toString(),
          childId: payment.child.toString(),
          schoolProfileId: payment.schoolProfile.toString(),
          amount: payment.amount,
          feeType: payment.feeType,
        },
      });
    }

    this.logger.log(
      `Sent ${upcomingPayments.length} upcoming + ${overduePayments.length} overdue notifications`,
    );
  }

  @Cron('0 * * * *')
  async recoverStaleLocks(): Promise<void> {
    const staleThreshold = new Date();
    staleThreshold.setMinutes(staleThreshold.getMinutes() - STALE_LOCK_MINUTES);

    const result = await this.paymentModel.updateMany(
      {
        status: PaymentStatus.PROCESSING,
        updatedAt: { $lt: staleThreshold },
      },
      {
        $set: { status: PaymentStatus.PENDING },
      },
    );

    if (result.modifiedCount > 0) {
      this.logger.warn(`Recovered ${result.modifiedCount} stale payment locks`);
    }
  }

  private async processPayment(
    payment: ScheduledPaymentDocument,
  ): Promise<void> {
    const locked = await this.paymentModel.findOneAndUpdate(
      {
        _id: payment._id,
        status: PaymentStatus.PENDING,
        version: payment.version,
      },
      {
        $set: { status: PaymentStatus.PROCESSING },
        $inc: { version: 1 },
      },
      { new: true },
    );

    if (!locked) {
      this.logger.debug(`Payment ${payment._id} already being processed`);
      return;
    }

    try {
      const user = await this.userModel.findOneAndUpdate(
        {
          _id: payment.parent,
          balance: { $gte: payment.amount },
        },
        { $inc: { balance: -payment.amount } },
        { new: true },
      );

      if (!user) {
        await this.handleFailure(locked, 'Insufficient balance');
        return;
      }

      locked.status = PaymentStatus.COMPLETED;
      await locked.save();

      await this.notificationsService.create({
        userId: payment.parent.toString(),
        type: NotificationType.PAYMENT_COMPLETED,
        title: 'Payment completed',
        message: `₦${payment.amount.toLocaleString()} ${payment.feeType} payment processed successfully.`,
        metadata: {
          scheduledPaymentId: (payment._id as Types.ObjectId).toString(),
          amount: payment.amount,
          feeType: payment.feeType,
        },
      });

      if (locked.isRecurring && locked.recurrenceRule) {
        await this.createNextOccurrence(locked);
      }

      this.logger.log(`Payment ${payment._id} completed`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error';
      await this.handleFailure(locked, message);
    }
  }

  private async handleFailure(
    payment: ScheduledPaymentDocument,
    reason: string,
  ): Promise<void> {
    payment.retryCount += 1;
    payment.lastRetryAt = new Date();
    payment.failureReason = reason;

    if (payment.retryCount < MAX_RETRIES) {
      const backoffHours = BACKOFF_HOURS[payment.retryCount - 1] || 24;
      const nextRetry = new Date();
      nextRetry.setHours(nextRetry.getHours() + backoffHours);
      payment.scheduledDate = nextRetry;
      payment.status = PaymentStatus.PENDING;
      this.logger.warn(
        `Payment ${payment._id} failed (${reason}), retry ${payment.retryCount}/${MAX_RETRIES} in ${backoffHours}h`,
      );
    } else {
      payment.status = PaymentStatus.FAILED;
      this.logger.error(
        `Payment ${payment._id} permanently failed: ${reason}`,
      );
    }

    await payment.save();

    await this.notificationsService.create({
      userId: payment.parent.toString(),
      type: NotificationType.PAYMENT_FAILED,
      title:
        payment.status === PaymentStatus.FAILED
          ? 'Payment permanently failed'
          : 'Payment failed — will retry',
      message: `₦${payment.amount.toLocaleString()} ${payment.feeType} payment failed: ${reason}`,
      metadata: {
        scheduledPaymentId: (payment._id as Types.ObjectId).toString(),
        amount: payment.amount,
        feeType: payment.feeType,
      },
    });
  }

  private async createNextOccurrence(
    payment: ScheduledPaymentDocument,
  ): Promise<void> {
    if (!payment.recurrenceRule) return;

    const nextDate = this.computeNextDate(
      payment.scheduledDate,
      payment.recurrenceRule.frequency,
    );

    if (
      payment.recurrenceRule.endDate &&
      nextDate > payment.recurrenceRule.endDate
    ) {
      return;
    }

    const idempotencyKey = `${payment.child}:${payment.feeType}:${nextDate.toISOString()}`;

    const nextPayment = new this.paymentModel({
      parent: payment.parent,
      child: payment.child,
      schoolProfile: payment.schoolProfile,
      feeType: payment.feeType,
      description: payment.description,
      amount: payment.amount,
      currency: payment.currency,
      scheduledDate: nextDate,
      dueDate: nextDate,
      isRecurring: true,
      recurrenceRule: payment.recurrenceRule,
      isAutoGenerated: true,
      sourcePayment: payment._id,
      idempotencyKey,
    });

    try {
      await nextPayment.save();
      this.logger.log(
        `Created next occurrence for payment ${payment._id} on ${nextDate.toISOString()}`,
      );
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as Record<string, unknown>).code === 11000
      ) {
        this.logger.debug(
          `Next occurrence already exists for payment ${payment._id}`,
        );
      } else {
        throw error;
      }
    }
  }

  private computeNextDate(current: Date, frequency: RecurrenceFrequency): Date {
    const next = new Date(current);
    switch (frequency) {
      case RecurrenceFrequency.WEEKLY:
        next.setDate(next.getDate() + 7);
        break;
      case RecurrenceFrequency.BIWEEKLY:
        next.setDate(next.getDate() + 14);
        break;
      case RecurrenceFrequency.MONTHLY: {
        const targetDay = next.getDate();
        next.setMonth(next.getMonth() + 1);
        if (next.getDate() !== targetDay) {
          next.setDate(0);
        }
        break;
      }
      case RecurrenceFrequency.TERMLY:
        next.setMonth(next.getMonth() + 4);
        break;
      case RecurrenceFrequency.ANNUALLY:
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
    return next;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { NotificationType, FeeType } from '../common/enums';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: {
    scheduledPaymentId?: string;
    childId?: string;
    schoolProfileId?: string;
    amount?: number;
    feeType?: FeeType;
  };
}

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(input: CreateNotificationInput): Promise<NotificationDocument> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const notification = new this.notificationModel({
      user: new Types.ObjectId(input.userId),
      type: input.type,
      title: input.title,
      message: input.message,
      metadata: input.metadata,
      expiresAt,
    });
    return notification.save();
  }

  async findAll(
    userId: string,
    query: { isRead?: boolean; page?: number; limit?: number },
  ): Promise<PaginatedResponse<NotificationDocument>> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const filter: Record<string, unknown> = { user: new Types.ObjectId(userId) };
    if (query.isRead !== undefined) filter.isRead = query.isRead;

    const [data, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.notificationModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({
      user: new Types.ObjectId(userId),
      isRead: false,
    });
  }

  async markAsRead(
    userId: string,
    notificationId: string,
  ): Promise<NotificationDocument> {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: notificationId, user: new Types.ObjectId(userId) },
      { $set: { isRead: true, readAt: new Date() } },
      { new: true },
    );
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.notificationModel.updateMany(
      { user: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true, readAt: new Date() } },
    );
    return result.modifiedCount;
  }
}

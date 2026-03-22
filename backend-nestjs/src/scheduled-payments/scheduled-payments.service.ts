import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ScheduledPayment,
  ScheduledPaymentDocument,
} from './schemas/scheduled-payment.schema';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { QueryScheduledPaymentDto } from './dto/query-scheduled-payment.dto';
import { ChildrenService } from '../children/children.service';
import { PaymentStatus } from '../common/enums';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

const MAX_PENDING_PAYMENTS = 100;

@Injectable()
export class ScheduledPaymentsService {
  constructor(
    @InjectModel(ScheduledPayment.name)
    private readonly scheduledPaymentModel: Model<ScheduledPaymentDocument>,
    private readonly childrenService: ChildrenService,
  ) {}

  async create(
    userId: string,
    dto: CreateScheduledPaymentDto,
  ): Promise<ScheduledPaymentDocument> {
    await this.childrenService.findOne(userId, dto.child);

    const pendingCount = await this.scheduledPaymentModel.countDocuments({
      parent: userId,
      status: PaymentStatus.PENDING,
    });
    if (pendingCount >= MAX_PENDING_PAYMENTS) {
      throw new BadRequestException(
        `Maximum pending payments reached (${MAX_PENDING_PAYMENTS})`,
      );
    }

    const scheduledDate = new Date(dto.scheduledDate);
    if (scheduledDate <= new Date()) {
      throw new BadRequestException('Scheduled date must be in the future');
    }

    const idempotencyKey = `${dto.child}:${dto.feeType}:${dto.scheduledDate}`;

    const payment = new this.scheduledPaymentModel({
      parent: new Types.ObjectId(userId),
      child: new Types.ObjectId(dto.child),
      schoolProfile: new Types.ObjectId(dto.schoolProfile),
      feeType: dto.feeType,
      description: dto.description,
      amount: dto.amount,
      scheduledDate,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      isRecurring: dto.isRecurring || false,
      recurrenceRule: dto.recurrenceRule
        ? {
            frequency: dto.recurrenceRule.frequency,
            startDate: new Date(dto.recurrenceRule.startDate),
            endDate: dto.recurrenceRule.endDate
              ? new Date(dto.recurrenceRule.endDate)
              : undefined,
          }
        : undefined,
      idempotencyKey,
    });

    return payment.save();
  }

  async findAll(
    userId: string,
    query: QueryScheduledPaymentDto,
  ): Promise<PaginatedResponse<ScheduledPaymentDocument>> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const filter: Record<string, unknown> = {
      parent: new Types.ObjectId(userId),
    };
    if (query.status) filter.status = query.status;
    if (query.feeType) filter.feeType = query.feeType;
    if (query.child) filter.child = new Types.ObjectId(query.child);
    if (query.schoolProfile)
      filter.schoolProfile = new Types.ObjectId(query.schoolProfile);

    const [data, total] = await Promise.all([
      this.scheduledPaymentModel
        .find(filter)
        .populate('child', 'firstName lastName')
        .populate('schoolProfile', 'name')
        .sort({ scheduledDate: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.scheduledPaymentModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async findOne(
    userId: string,
    id: string,
  ): Promise<ScheduledPaymentDocument> {
    const payment = await this.scheduledPaymentModel
      .findOne({ _id: id, parent: new Types.ObjectId(userId) })
      .populate('child', 'firstName lastName')
      .populate('schoolProfile', 'name')
      .exec();
    if (!payment) {
      throw new NotFoundException('Scheduled payment not found');
    }
    return payment;
  }

  async cancel(userId: string, id: string): Promise<ScheduledPaymentDocument> {
    const payment = await this.findOne(userId, id);
    if (payment.status !== PaymentStatus.PENDING) {
      throw new ConflictException('Only pending payments can be cancelled');
    }
    payment.status = PaymentStatus.CANCELLED;
    return payment.save();
  }

  async skip(userId: string, id: string): Promise<ScheduledPaymentDocument> {
    const payment = await this.findOne(userId, id);
    if (payment.status !== PaymentStatus.PENDING) {
      throw new ConflictException('Only pending payments can be skipped');
    }
    payment.status = PaymentStatus.SKIPPED;
    return payment.save();
  }

  async getSummary(userId: string): Promise<{
    pendingCount: number;
    pendingAmount: number;
    failedCount: number;
    completedCount: number;
  }> {
    const parentId = new Types.ObjectId(userId);

    const [pending, failed, completed] = await Promise.all([
      this.scheduledPaymentModel.aggregate([
        { $match: { parent: parentId, status: PaymentStatus.PENDING } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            total: { $sum: '$amount' },
          },
        },
      ]),
      this.scheduledPaymentModel.countDocuments({
        parent: parentId,
        status: PaymentStatus.FAILED,
      }),
      this.scheduledPaymentModel.countDocuments({
        parent: parentId,
        status: PaymentStatus.COMPLETED,
      }),
    ]);

    return {
      pendingCount: pending[0]?.count || 0,
      pendingAmount: pending[0]?.total || 0,
      failedCount: failed,
      completedCount: completed,
    };
  }
}

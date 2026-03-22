import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduledPaymentsService } from './scheduled-payments.service';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';
import { UserRole, PaymentStatus, FeeType } from '../common/enums';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('scheduled-payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PARENT)
export class ScheduledPaymentsController {
  constructor(private readonly service: ScheduledPaymentsService) {}

  @Post()
  async create(
    @CurrentUser() user: UserDocument,
    @Body() dto: CreateScheduledPaymentDto,
  ) {
    const payment = await this.service.create(user._id.toString(), dto);
    return { message: 'Scheduled payment created', scheduledPayment: payment };
  }

  @Get()
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query('status') status?: PaymentStatus,
    @Query('feeType') feeType?: FeeType,
    @Query('child') child?: string,
    @Query('schoolProfile') schoolProfile?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.service.findAll(user._id.toString(), {
      status,
      feeType,
      child,
      schoolProfile,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
    return {
      scheduledPayments: result.data,
      pagination: result.pagination,
    };
  }

  @Get('summary')
  async getSummary(@CurrentUser() user: UserDocument) {
    return this.service.getSummary(user._id.toString());
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const payment = await this.service.findOne(user._id.toString(), id);
    return { scheduledPayment: payment };
  }

  @Put(':id/cancel')
  async cancel(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const payment = await this.service.cancel(user._id.toString(), id);
    return { message: 'Payment cancelled', scheduledPayment: payment };
  }

  @Put(':id/skip')
  async skip(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const payment = await this.service.skip(user._id.toString(), id);
    return { message: 'Payment skipped', scheduledPayment: payment };
  }
}

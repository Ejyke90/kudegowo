import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduledPayment, ScheduledPaymentSchema } from './schemas/scheduled-payment.schema';
import { ScheduledPaymentsService } from './scheduled-payments.service';
import { ScheduledPaymentsController } from './scheduled-payments.controller';
import { PaymentSchedulerService } from './scheduler/payment-scheduler.service';
import { ChildrenModule } from '../children/children.module';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScheduledPayment.name, schema: ScheduledPaymentSchema },
    ]),
    ChildrenModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [ScheduledPaymentsController],
  providers: [ScheduledPaymentsService, PaymentSchedulerService],
  exports: [ScheduledPaymentsService],
})
export class ScheduledPaymentsModule {}

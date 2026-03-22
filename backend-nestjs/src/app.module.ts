import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SchoolProfilesModule } from './school-profiles/school-profiles.module';
import { ChildrenModule } from './children/children.module';
import { ScheduledPaymentsModule } from './scheduled-payments/scheduled-payments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/kudegowo',
    ),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    SchoolProfilesModule,
    ChildrenModule,
    ScheduledPaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}

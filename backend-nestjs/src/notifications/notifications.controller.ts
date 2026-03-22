import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query('isRead') isRead?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.service.findAll(user._id.toString(), {
      isRead: isRead !== undefined ? isRead === 'true' : undefined,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
    return { notifications: result.data, pagination: result.pagination };
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: UserDocument) {
    const count = await this.service.getUnreadCount(user._id.toString());
    return { unreadCount: count };
  }

  @Patch(':id/read')
  async markAsRead(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const notification = await this.service.markAsRead(user._id.toString(), id);
    return { message: 'Notification marked as read', notification };
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUser() user: UserDocument) {
    const count = await this.service.markAllAsRead(user._id.toString());
    return { message: `${count} notifications marked as read` };
  }
}

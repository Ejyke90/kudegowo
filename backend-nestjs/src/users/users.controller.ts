import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: UserDocument) {
    return { user: await this.usersService.findById(user._id.toString()) };
  }

  @Put('profile')
  async updateProfile(
    @CurrentUser() user: UserDocument,
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(user._id.toString(), dto);
    return { message: 'Profile updated', user: updated };
  }

  @Get('balance')
  async getBalance(@CurrentUser() user: UserDocument) {
    const balance = await this.usersService.getBalance(user._id.toString());
    return { balance };
  }
}

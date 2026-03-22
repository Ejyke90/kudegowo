import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';
import { UserRole } from '../common/enums';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('children')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PARENT)
export class ChildrenController {
  constructor(private readonly service: ChildrenService) {}

  @Post()
  async create(
    @CurrentUser() user: UserDocument,
    @Body() dto: CreateChildDto,
  ) {
    const child = await this.service.create(user._id.toString(), dto);
    return { message: 'Child added', child };
  }

  @Get()
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query('schoolProfile') schoolProfile?: string,
    @Query('isActive') isActive?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.service.findAll(user._id.toString(), {
      schoolProfile,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
    return { children: result.data, pagination: result.pagination };
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const child = await this.service.findOne(user._id.toString(), id);
    return { child };
  }

  @Put(':id')
  async update(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: UpdateChildDto,
  ) {
    const child = await this.service.update(user._id.toString(), id, dto);
    return { message: 'Child updated', child };
  }

  @Delete(':id')
  async deactivate(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const child = await this.service.deactivate(user._id.toString(), id);
    return { message: 'Child deactivated', child };
  }
}

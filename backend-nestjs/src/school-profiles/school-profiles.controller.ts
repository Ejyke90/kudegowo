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
import { SchoolProfilesService } from './school-profiles.service';
import { CreateSchoolProfileDto } from './dto/create-school-profile.dto';
import { UpdateSchoolProfileDto } from './dto/update-school-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';
import { UserRole } from '../common/enums';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('school-profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PARENT)
export class SchoolProfilesController {
  constructor(private readonly service: SchoolProfilesService) {}

  @Post()
  async create(
    @CurrentUser() user: UserDocument,
    @Body() dto: CreateSchoolProfileDto,
  ) {
    const schoolProfile = await this.service.create(user._id.toString(), dto);
    return { message: 'School profile created', schoolProfile };
  }

  @Get()
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.service.findAll(user._id.toString(), {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
    });
    return { schoolProfiles: result.data, pagination: result.pagination };
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    const schoolProfile = await this.service.findOne(user._id.toString(), id);
    return { schoolProfile };
  }

  @Put(':id')
  async update(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: UpdateSchoolProfileDto,
  ) {
    const schoolProfile = await this.service.update(
      user._id.toString(),
      id,
      dto,
    );
    return { message: 'School profile updated', schoolProfile };
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: UserDocument,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    await this.service.remove(user._id.toString(), id);
    return { message: 'School profile deactivated' };
  }
}

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolProfile, SchoolProfileDocument } from './schemas/school-profile.schema';
import { CreateSchoolProfileDto } from './dto/create-school-profile.dto';
import { UpdateSchoolProfileDto } from './dto/update-school-profile.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

const MAX_PROFILES_PER_PARENT = 10;

@Injectable()
export class SchoolProfilesService {
  constructor(
    @InjectModel(SchoolProfile.name)
    private readonly schoolProfileModel: Model<SchoolProfileDocument>,
  ) {}

  async create(
    userId: string,
    dto: CreateSchoolProfileDto,
  ): Promise<SchoolProfileDocument> {
    const count = await this.schoolProfileModel.countDocuments({
      createdBy: userId,
      isActive: true,
    });
    if (count >= MAX_PROFILES_PER_PARENT) {
      throw new BadRequestException(
        `Maximum school profiles reached (${MAX_PROFILES_PER_PARENT})`,
      );
    }

    const profile = new this.schoolProfileModel({
      ...dto,
      createdBy: userId,
    });
    return profile.save();
  }

  async findAll(
    userId: string,
    query: { page?: number; limit?: number; search?: string },
  ): Promise<PaginatedResponse<SchoolProfileDocument>> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const filter: Record<string, unknown> = {
      createdBy: userId,
      isActive: true,
    };
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }

    const [data, total] = await Promise.all([
      this.schoolProfileModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.schoolProfileModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async findOne(
    userId: string,
    id: string,
  ): Promise<SchoolProfileDocument> {
    const profile = await this.schoolProfileModel.findOne({
      _id: id,
      createdBy: userId,
      isActive: true,
    });
    if (!profile) {
      throw new NotFoundException('School profile not found');
    }
    return profile;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateSchoolProfileDto,
  ): Promise<SchoolProfileDocument> {
    const profile = await this.findOne(userId, id);
    Object.assign(profile, dto);
    return profile.save();
  }

  async remove(userId: string, id: string): Promise<void> {
    const profile = await this.findOne(userId, id);
    profile.isActive = false;
    await profile.save();
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Child, ChildDocument } from './schemas/child.schema';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { SchoolProfilesService } from '../school-profiles/school-profiles.service';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

const MAX_CHILDREN_PER_SCHOOL = 20;

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel(Child.name)
    private readonly childModel: Model<ChildDocument>,
    private readonly schoolProfilesService: SchoolProfilesService,
  ) {}

  async create(
    userId: string,
    dto: CreateChildDto,
  ): Promise<ChildDocument> {
    await this.schoolProfilesService.findOne(userId, dto.schoolProfile);

    const count = await this.childModel.countDocuments({
      schoolProfile: dto.schoolProfile,
      parent: userId,
      isActive: true,
    });
    if (count >= MAX_CHILDREN_PER_SCHOOL) {
      throw new BadRequestException(
        `Maximum children per school reached (${MAX_CHILDREN_PER_SCHOOL})`,
      );
    }

    const child = new this.childModel({ ...dto, parent: userId });
    return child.save();
  }

  async findAll(
    userId: string,
    query: {
      schoolProfile?: string;
      isActive?: boolean;
      page?: number;
      limit?: number;
    },
  ): Promise<PaginatedResponse<ChildDocument>> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const filter: Record<string, unknown> = { parent: userId };
    if (query.schoolProfile) filter.schoolProfile = query.schoolProfile;
    if (query.isActive !== undefined) filter.isActive = query.isActive;
    else filter.isActive = true;

    const [data, total] = await Promise.all([
      this.childModel
        .find(filter)
        .populate('schoolProfile', 'name schoolType')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.childModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async findOne(userId: string, id: string): Promise<ChildDocument> {
    const child = await this.childModel
      .findOne({ _id: id, parent: userId, isActive: true })
      .populate('schoolProfile', 'name schoolType')
      .exec();
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    return child;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateChildDto,
  ): Promise<ChildDocument> {
    const child = await this.findOne(userId, id);
    if (dto.schoolProfile && dto.schoolProfile !== child.schoolProfile.toString()) {
      await this.schoolProfilesService.findOne(userId, dto.schoolProfile);
    }
    Object.assign(child, dto);
    return child.save();
  }

  async deactivate(userId: string, id: string): Promise<ChildDocument> {
    const child = await this.findOne(userId, id);
    child.isActive = false;
    return child.save();
  }
}

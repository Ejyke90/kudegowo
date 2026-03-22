import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolProfileDto } from './create-school-profile.dto';

export class UpdateSchoolProfileDto extends PartialType(CreateSchoolProfileDto) {}

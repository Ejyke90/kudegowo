import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SchoolType } from '../../common/enums';

export type SchoolProfileDocument = HydratedDocument<SchoolProfile>;

@Schema({ timestamps: true })
export class SchoolProfile {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
  name: string;

  @Prop({ trim: true, maxlength: 200 })
  address?: string;

  @Prop({ trim: true, maxlength: 50 })
  city?: string;

  @Prop({ trim: true, maxlength: 50 })
  state?: string;

  @Prop({ type: String, enum: SchoolType, required: true })
  schoolType: SchoolType;

  @Prop({ trim: true, lowercase: true })
  contactEmail?: string;

  @Prop({ trim: true })
  contactPhone?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  createdBy: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;
}

export const SchoolProfileSchema = SchemaFactory.createForClass(SchoolProfile);

SchoolProfileSchema.index({ createdBy: 1, name: 1 }, { unique: true });

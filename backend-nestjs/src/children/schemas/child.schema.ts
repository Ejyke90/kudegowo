import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChildDocument = HydratedDocument<Child>;

@Schema({ timestamps: true })
export class Child {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 50 })
  firstName: string;

  @Prop({ required: true, trim: true, minlength: 2, maxlength: 50 })
  lastName: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  parent: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SchoolProfile', required: true, index: true })
  schoolProfile: Types.ObjectId;

  @Prop({ trim: true, maxlength: 20 })
  grade?: string;

  @Prop({ trim: true, maxlength: 30 })
  studentId?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ChildSchema = SchemaFactory.createForClass(Child);

ChildSchema.index(
  { parent: 1, firstName: 1, lastName: 1, schoolProfile: 1 },
  { unique: true },
);
ChildSchema.index({ parent: 1, isActive: 1 });

ChildSchema.virtual('fullName').get(function (this: ChildDocument) {
  return `${this.firstName} ${this.lastName}`;
});

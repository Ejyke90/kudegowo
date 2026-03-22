import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Child, ChildSchema } from './schemas/child.schema';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { SchoolProfilesModule } from '../school-profiles/school-profiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Child.name, schema: ChildSchema }]),
    SchoolProfilesModule,
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
  exports: [ChildrenService, MongooseModule],
})
export class ChildrenModule {}

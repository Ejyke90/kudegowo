import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolProfile, SchoolProfileSchema } from './schemas/school-profile.schema';
import { SchoolProfilesService } from './school-profiles.service';
import { SchoolProfilesController } from './school-profiles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolProfile.name, schema: SchoolProfileSchema },
    ]),
  ],
  controllers: [SchoolProfilesController],
  providers: [SchoolProfilesService],
  exports: [SchoolProfilesService, MongooseModule],
})
export class SchoolProfilesModule {}

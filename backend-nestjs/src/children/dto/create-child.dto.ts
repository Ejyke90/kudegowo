import { IsString, IsMongoId, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateChildDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsMongoId()
  schoolProfile: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  grade?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  studentId?: string;
}

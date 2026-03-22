import {
  IsMongoId,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
  ValidateNested,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FeeType, RecurrenceFrequency } from '../../common/enums';

export class RecurrenceRuleDto {
  @IsEnum(RecurrenceFrequency)
  frequency: RecurrenceFrequency;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class CreateScheduledPaymentDto {
  @IsMongoId()
  child: string;

  @IsMongoId()
  schoolProfile: string;

  @IsEnum(FeeType)
  feeType: FeeType;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsNumber()
  @Min(50)
  @Max(10_000_000)
  amount: number;

  @IsDateString()
  scheduledDate: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecurrenceRuleDto)
  recurrenceRule?: RecurrenceRuleDto;
}

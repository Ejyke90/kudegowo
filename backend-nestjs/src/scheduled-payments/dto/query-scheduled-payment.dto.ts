import { IsOptional, IsEnum, IsMongoId, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaymentStatus, FeeType } from '../../common/enums';

export class QueryScheduledPaymentDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsEnum(FeeType)
  feeType?: FeeType;

  @IsOptional()
  @IsMongoId()
  child?: string;

  @IsOptional()
  @IsMongoId()
  schoolProfile?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

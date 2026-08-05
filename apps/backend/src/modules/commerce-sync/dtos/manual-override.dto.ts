import { IsOptional, IsString } from 'class-validator';

export class ManualOrderOverrideDto {
  @IsOptional()
  @IsString()
  fulfillmentStatus?: string;

  @IsOptional()
  @IsString()
  financialStatus?: string;
}

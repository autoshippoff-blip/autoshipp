import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class GracePeriodOverrideDto {
  @IsInt()
  @Min(1)
  days: number;
}

export class SuspendAccessDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}

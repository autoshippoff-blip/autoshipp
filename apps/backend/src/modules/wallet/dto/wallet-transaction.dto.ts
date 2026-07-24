import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsObject,
  Length,
} from 'class-validator';

export class CreditWalletDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  idempotencyKey: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  referenceType: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  referenceId: string;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  description?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class DebitWalletDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  idempotencyKey: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  referenceType: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  referenceId: string;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  description?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

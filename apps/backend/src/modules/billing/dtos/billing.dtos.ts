import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  Min,
  IsUUID,
} from 'class-validator';
import { BillingCycle, InvoiceStatus, PaymentStatus } from '@prisma/client';

export class CreatePlanDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreatePlanPriceDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @IsNumber()
  @Min(0)
  amount: number;
}

export class ProcessPaymentDto {
  @IsUUID()
  paymentMethodId: string;
}

export interface PlanPriceResponseDto {
  id: string;
  currency: string;
  billingCycle: BillingCycle;
  amount: string;
  effectiveFrom: Date;
  effectiveTo: Date | null;
}

export interface PlanResponseDto {
  id: string;
  productId: string;
  code: string;
  name: string;
  active: boolean;
  prices?: PlanPriceResponseDto[];
}

export interface InvoiceItemResponseDto {
  id: string;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
}

export interface InvoiceResponseDto {
  id: string;
  organizationId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: string;
  taxTotal: string;
  discountTotal: string;
  grandTotal: string;
  currency: string;
  issueDate: Date | null;
  dueDate: Date | null;
  items?: InvoiceItemResponseDto[];
}

export interface PaymentResponseDto {
  id: string;
  invoiceId: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paidAt: Date | null;
}

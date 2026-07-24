import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME',
}

export class CreateProductDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  initialVersion: string;

  @IsString()
  initialEditionCode: string;

  @IsOptional()
  @IsString()
  apiEndpoint?: string;
}

export class EntitlementDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class CreateSubscriptionDto {
  @IsString()
  productId: string;

  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;

  @IsOptional()
  @IsDateString()
  effectiveUntil?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntitlementDto)
  entitlements?: EntitlementDto[];
}

export class CreateAssignmentDto {
  @IsString()
  targetOrgId: string;
}

export class ProductCategoryDto {
  id: string;
  code: string;
  name: string;
}

export class ProductResponseDto {
  id: string;
  code: string | null;
  name: string;
  description: string | null;
  apiEndpoint: string | null;
  status: string;
  createdAt: string;
  category: ProductCategoryDto | null;
  currentVersion: string | null;
  currentEdition: string | null;

  constructor(model: any) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.description = model.description;
    this.apiEndpoint = model.apiEndpoint;
    this.status = model.status;
    this.createdAt = model.createdAt.toISOString();
    this.category = model.category || null;
    this.currentVersion = model.currentVersion || null;
    this.currentEdition = model.currentEdition || null;
  }
}

export class CatalogResponseDto extends ProductResponseDto {
  isSubscribed: boolean;

  constructor(model: any) {
    super(model);
    this.isSubscribed = model.isSubscribed;
  }
}

export class SubscriptionResponseDto {
  id: string;
  productId: string;
  status: string;
  billingCycle: string;
  effectiveFrom: string;
  effectiveUntil: string | null;
  entitlements: EntitlementDto[];

  constructor(model: any) {
    this.id = model.id;
    this.productId = model.productId;
    this.status = model.status;
    this.billingCycle = model.billingCycle;
    this.effectiveFrom = model.effectiveFrom.toISOString();
    this.effectiveUntil = model.effectiveUntil
      ? model.effectiveUntil.toISOString()
      : null;
    this.entitlements = model.entitlements || [];
  }
}

export class AssignmentResponseDto {
  id: string;
  subscriptionId: string;
  organizationId: string;
  assignedAt: string;
  isActive: boolean;

  constructor(model: any) {
    this.id = model.id;
    this.subscriptionId = model.subscriptionId;
    this.organizationId = model.organizationId;
    this.assignedAt = model.assignedAt.toISOString();
    this.isActive = model.isActive;
  }
}

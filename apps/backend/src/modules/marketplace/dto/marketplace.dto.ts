import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME',
}

export class CreateProductCategoryDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  sortOrder: number;
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

export class CreateProductVersionDto {
  @IsString()
  version: string;
}

export class CreateProductEditionDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  sortOrder: number;
}

export class CreateProductFeatureDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
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

  @IsString()
  editionId: string;

  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;

  @IsOptional()
  @IsDateString()
  effectiveUntil?: string;
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

export class CategoryResponseDto {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;

  constructor(model: any) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.description = model.description;
    this.sortOrder = model.sortOrder;
  }
}

export class ProductFeatureResponseDto {
  id: string;
  code: string;
  name: string;
  description: string | null;

  constructor(model: any) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.description = model.description;
  }
}

export class ProductEditionResponseDto {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
  active: boolean;
  features?: ProductFeatureResponseDto[];

  constructor(model: any) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.description = model.description;
    this.sortOrder = model.sortOrder;
    this.active = model.active;
    if (model.features) {
      this.features = model.features.map(
        (f) => new ProductFeatureResponseDto(f),
      );
    }
  }
}

export class ProductVersionResponseDto {
  id: string;
  version: string;
  releasedAt: string;
  deprecatedAt: string | null;
  supported: boolean;

  constructor(model: any) {
    this.id = model.id;
    this.version = model.version;
    this.releasedAt = model.releasedAt.toISOString();
    this.deprecatedAt = model.deprecatedAt
      ? model.deprecatedAt.toISOString()
      : null;
    this.supported = model.supported;
  }
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
  editions?: ProductEditionResponseDto[];

  constructor(model: any) {
    super(model);
    this.isSubscribed = model.isSubscribed;
    if (model.editions) {
      this.editions = model.editions.map(
        (e) => new ProductEditionResponseDto(e),
      );
    }
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

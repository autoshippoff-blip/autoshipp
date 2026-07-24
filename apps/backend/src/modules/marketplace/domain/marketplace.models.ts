import { ProductStatus } from '@prisma/client';

export interface EntitlementModel {
  id: string;
  featureCode: string;
  limit: number | null;
  used: number;
}

export interface ProductCategoryModel {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
}

export interface ProductVersionModel {
  id: string;
  version: string;
  releasedAt: Date;
  deprecatedAt: Date | null;
  supported: boolean;
}

export interface ProductFeatureModel {
  id: string;
  code: string;
  name: string;
  description: string | null;
}

export interface ProductEditionModel {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
  active: boolean;
  features?: ProductFeatureModel[];
}

export interface ProductModel {
  id: string;
  name: string;
  description: string | null;
  version: string;
  apiEndpoint: string | null;
  status: ProductStatus;
  createdAt: Date;
}

export interface SubscriptionModel {
  id: string;
  organizationId: string;
  productId: string;
  status: 'ACTIVE' | 'CANCELED' | 'SUSPENDED' | 'EXPIRED';
  billingCycle: 'MONTHLY' | 'YEARLY' | 'ONE_TIME';
  effectiveFrom: Date;
  effectiveUntil: Date | null;
  createdAt: Date;
  entitlements: EntitlementModel[];
}

export interface AssignmentModel {
  id: string;
  subscriptionId: string;
  organizationId: string;
  assignedAt: Date;
  assignedBy: string | null;
  isActive: boolean; // Derived from subscription!
}

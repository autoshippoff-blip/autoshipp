import { ProductStatus } from '@prisma/client';

export interface EntitlementModel {
  id: string;
  key: string;
  value: string;
}

export interface ProductCategoryModel {
  id: string;
  code: string;
  name: string;
}

export interface ProductModel {
  id: string;
  code: string | null;
  name: string;
  description: string | null;
  apiEndpoint: string | null;
  status: ProductStatus;
  createdAt: Date;
  category: ProductCategoryModel | null;
  currentVersion: string | null;
  currentEdition: string | null;
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

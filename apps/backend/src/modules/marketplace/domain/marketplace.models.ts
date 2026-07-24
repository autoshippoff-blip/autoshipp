export interface EntitlementModel {
  id: string;
  key: string;
  value: string;
}

export interface ProductModel {
  id: string;
  name: string;
  description: string | null;
  version: string;
  apiEndpoint: string | null;
  status: 'ACTIVE' | 'DEPRECATED';
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

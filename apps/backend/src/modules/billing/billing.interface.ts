/**
 * AES-040 Public Interface Contract for Billing Domain Module
 */
export interface IBillingService {
  getSubscription(organizationId: string): Promise<any>;
  createSubscription(organizationId: string, planId: string): Promise<any>;
}

export interface ISubscriptionLifecycleService {
  handleGracePeriodExpiration(subscriptionId: string): Promise<void>;
  overrideGracePeriod(
    organizationId: string,
    customEndDate: Date,
  ): Promise<any>;
}

export const BILLING_SERVICE_INTERFACE = Symbol('IBillingService');
export const SUBSCRIPTION_LIFECYCLE_INTERFACE = Symbol(
  'ISubscriptionLifecycleService',
);

export class MarketplaceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ProductNotFoundException extends MarketplaceException {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found.`);
  }
}

export class ProductDeprecatedException extends MarketplaceException {
  constructor(productId: string) {
    super(`Cannot subscribe to deprecated product: ${productId}`);
  }
}

export class SubscriptionOverlapException extends MarketplaceException {
  constructor(orgId: string, productId: string) {
    super(
      `Organization ${orgId} already has an active overlapping subscription for product ${productId}.`,
    );
  }
}

export class SubscriptionNotFoundException extends MarketplaceException {
  constructor(subscriptionId: string) {
    super(`Subscription with ID ${subscriptionId} not found.`);
  }
}

export class SubscriptionInactiveException extends MarketplaceException {
  constructor(subscriptionId: string) {
    super(
      `Subscription with ID ${subscriptionId} is not active or valid today.`,
    );
  }
}

export class AssignmentAlreadyExistsException extends MarketplaceException {
  constructor(orgId: string, subscriptionId: string) {
    super(
      `Organization ${orgId} is already assigned to subscription ${subscriptionId}.`,
    );
  }
}

export class UnauthorizedHierarchyAssignmentException extends MarketplaceException {
  constructor(assignerId: string, targetOrgId: string) {
    super(
      `Assigner ${assignerId} does not have hierarchy authority to assign to ${targetOrgId}.`,
    );
  }
}

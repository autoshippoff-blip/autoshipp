/**
 * AES-040 Public Interface Contract for Marketplace Domain Module
 */
export interface IAssignmentService {
  assignProduct(
    subscriptionId: string,
    targetOrgId: string,
    assignerUserId: string,
    assignerOrgId: string,
  ): Promise<any>;
  suspendAssignmentsByOrgId(
    organizationId: string,
    reason?: string,
  ): Promise<number>;
  restoreAssignmentsByOrgId(
    organizationId: string,
    reasonFilter?: string,
  ): Promise<number>;
  getActiveAssignments(organizationId: string): Promise<any[]>;
}

export interface IProductRegistryService {
  registerProduct(data: any): Promise<any>;
  getProductById(id: string): Promise<any>;
}

export const ASSIGNMENT_SERVICE_INTERFACE = Symbol('IAssignmentService');
export const PRODUCT_REGISTRY_INTERFACE = Symbol('IProductRegistryService');

/**
 * AES-040 Public Interface Contract for Auth Domain Module
 */
export interface IAuthService {
  validateUser(email: string, pass: string): Promise<any>;
  login(user: any, preferredOrgId?: string): Promise<any>;
  switchOrganization(
    userId: string,
    targetOrganizationId: string,
  ): Promise<any>;
  register(data: any): Promise<any>;
}

export const AUTH_SERVICE_INTERFACE = Symbol('IAuthService');

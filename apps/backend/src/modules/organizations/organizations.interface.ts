/**
 * AES-040 Public Interface Contract for Organizations Domain Module
 */
export interface IOrganizationsService {
  findById(id: string): Promise<any>;
  create(data: any): Promise<any>;
}

export const ORGANIZATIONS_SERVICE_INTERFACE = Symbol('IOrganizationsService');

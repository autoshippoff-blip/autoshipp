import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;
    const requestedOrgId = params.orgId;

    if (!user) {
      throw new ForbiddenException('User context missing');
    }

    // Platform admins have access to all organizations
    if (user.organization_type === 'PLATFORM') {
      return true;
    }

    if (requestedOrgId) {
      // 1. Direct access check
      if (user.organization_id === requestedOrgId) {
        return true;
      }

      // 2. Hierarchy traversal (Aggregator checking if they MANAGE the requested brand)
      // Per architecture, Aggregators have a MANAGES relationship to Brands.
      const relationship = await this.prisma.organizationRelationship.findFirst(
        {
          where: {
            parentOrganizationId: user.organization_id, // The user's org is the parent (Aggregator)
            childOrganizationId: requestedOrgId, // The requested org is the child (Brand)
            relationshipType: 'MANAGES',
            active: true,
          },
        },
      );

      if (relationship) {
        return true;
      }

      throw new ForbiddenException('Access denied to this organization');
    }

    // Pass through if no orgId is required (e.g., /me routes)
    return true;
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/require-permissions.decorator';
import { PlatformPermission } from './permissions.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PlatformPermission[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // If user has no permissions or user object is missing, deny access
    // Note: In a full IAM system, user.permissions would be populated by a previous guard or auth strategy.
    // For this epic, we assume PLATFORM admins have all permissions implicitly for simplicity,
    // or we check a specific list if provided in the user context.

    if (!user) {
      throw new ForbiddenException('User context missing');
    }

    // Platform admins have full access
    if (user.organization_type === 'PLATFORM') {
      return true;
    }

    // If user has explicit permissions array (e.g. injected by JWT strategy)
    if (user.permissions && Array.isArray(user.permissions)) {
      const hasAllRequired = requiredPermissions.every((permission) =>
        user.permissions.includes(permission),
      );
      if (hasAllRequired) {
        return true;
      }
    }

    throw new ForbiddenException('Insufficient permissions');
  }
}

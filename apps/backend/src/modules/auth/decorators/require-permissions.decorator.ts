import { SetMetadata } from '@nestjs/common';
import { PlatformPermission } from '../permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: PlatformPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

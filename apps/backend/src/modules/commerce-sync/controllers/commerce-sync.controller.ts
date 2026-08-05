import {
  Controller,
  Patch,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommerceSyncService } from '../services/commerce-sync.service';
import { ManualOrderOverrideDto } from '../dtos/manual-override.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PlatformRoleGuard } from '../../auth/platform-role.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('commerce')
@UseGuards(JwtAuthGuard, PlatformRoleGuard, PermissionGuard)
export class CommerceSyncController {
  constructor(private readonly syncService: CommerceSyncService) {}

  @Patch('orders/:orderId/manual-override')
  @RequirePermissions(PlatformPermission.COMMERCE_SYNC_MANAGE)
  async applyManualOverride(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() dto: ManualOrderOverrideDto,
    @Req() req: any,
  ): Promise<{ status: string; order: any }> {
    const userId = req.user?.id || 'admin_user';
    const order = await this.syncService.applyManualOverride(orderId, userId, {
      fulfillmentStatus: dto.fulfillmentStatus,
      financialStatus: dto.financialStatus,
    });
    return { status: 'MANUAL_OVERRIDE_APPLIED', order };
  }

  @Post('orders/:orderId/release-override')
  @RequirePermissions(PlatformPermission.COMMERCE_SYNC_MANAGE)
  async releaseManualOverride(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<{ status: string; order: any }> {
    const order = await this.syncService.releaseManualOverride(orderId);
    return { status: 'MANUAL_OVERRIDE_RELEASED', order };
  }
}

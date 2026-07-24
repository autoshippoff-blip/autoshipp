import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ShopifyOAuthService } from '../services/shopify-oauth.service';
import { StoreResponseDto } from '../dto/shopify-integration.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { OrganizationGuard } from '../../../auth/organization.guard';
import { PermissionGuard } from '../../../auth/permission.guard';
import { RequirePermissions } from '../../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../../auth/permissions.enum';

@Controller('organizations/:orgId/stores')
@UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
export class OrganizationStoreController {
  constructor(private readonly oauthService: ShopifyOAuthService) {}

  @Get()
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async getStores(
    @Param('orgId', ParseUUIDPipe) orgId: string,
  ): Promise<StoreResponseDto[]> {
    return await this.oauthService.getStoresForOrganization(orgId);
  }

  @Delete(':storeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async disconnectStore(
    @Param('orgId', ParseUUIDPipe) orgId: string,
    @Param('storeId', ParseUUIDPipe) storeId: string,
  ): Promise<void> {
    await this.oauthService.disconnectStore(orgId, storeId);
  }
}

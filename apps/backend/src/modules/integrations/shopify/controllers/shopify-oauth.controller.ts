import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ShopifyOAuthService } from '../services/shopify-oauth.service';
import {
  InitiateShopifyOAuthDto,
  ShopifyOAuthCallbackDto,
  StoreResponseDto,
} from '../dto/shopify-integration.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../../auth/permission.guard';
import { RequirePermissions } from '../../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../../auth/permissions.enum';

@Controller('integrations/shopify')
export class ShopifyOAuthController {
  constructor(private readonly oauthService: ShopifyOAuthService) {}

  @Get('authorize')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async authorize(
    @Req() req: any,
    @Query() query: InitiateShopifyOAuthDto,
    @Res() res: any,
  ): Promise<void> {
    const orgId = req.user?.organization_id;
    const userId = req.user?.id;
    if (!orgId || !userId) {
      throw new ForbiddenException(
        'User is not associated with an organization',
      );
    }

    const authUrl = await this.oauthService.buildAuthorizeUrl(
      orgId,
      userId,
      query.shopDomain,
    );
    return res.redirect(authUrl);
  }

  @Get('callback')
  async callback(
    @Query() query: ShopifyOAuthCallbackDto,
  ): Promise<StoreResponseDto> {
    return await this.oauthService.handleCallback(query);
  }
}

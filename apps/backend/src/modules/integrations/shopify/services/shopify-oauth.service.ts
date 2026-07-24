import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';
import { ShopifyCryptoService } from './shopify-crypto.service';
import {
  ShopifyOAuthCallbackDto,
  StoreResponseDto,
} from '../dto/shopify-integration.dto';
import { StoreStatus, CommercePlatform } from '@prisma/client';

@Injectable()
export class ShopifyOAuthService {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly scopes: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: ShopifyCryptoService,
  ) {
    this.apiKey = process.env.SHOPIFY_API_KEY || 'mock_shopify_api_key';
    this.apiSecret =
      process.env.SHOPIFY_API_SECRET || 'mock_shopify_api_secret';
    this.scopes =
      process.env.SHOPIFY_SCOPES || 'read_orders,read_products,read_inventory';
  }

  /**
   * Builds the Shopify OAuth Authorization URL with a signed state token.
   */
  async buildAuthorizeUrl(
    organizationId: string,
    userId: string,
    rawDomain: string,
  ): Promise<string> {
    const domain = this.normalizeShopDomain(rawDomain);
    const state = this.cryptoService.generateStateToken(organizationId, userId);
    const redirectUri = encodeURIComponent(
      process.env.SHOPIFY_REDIRECT_URI ||
        'http://localhost:3001/integrations/shopify/callback',
    );

    return `https://${domain}/admin/oauth/authorize?client_id=${this.apiKey}&scope=${this.scopes}&redirect_uri=${redirectUri}&state=${state}`;
  }

  /**
   * Processes the Shopify OAuth callback, validates HMAC and state token, exchanges code for access token,
   * encrypts token, and persists the Store record.
   */
  async handleCallback(
    dto: ShopifyOAuthCallbackDto,
  ): Promise<StoreResponseDto> {
    const isValidHmac = this.cryptoService.verifyOAuthCallbackHmac(
      dto,
      this.apiSecret,
    );
    if (!isValidHmac) {
      throw new UnauthorizedException('Invalid Shopify HMAC signature');
    }

    const statePayload = this.cryptoService.verifyStateToken(dto.state);
    const domain = this.normalizeShopDomain(dto.shop);

    // Exchange temporary code for permanent access token
    const accessToken = await this.exchangeCodeForToken(domain, dto.code);
    const encryptedToken = this.cryptoService.encryptToken(accessToken);

    // Fetch Shop metadata (Name, external ID)
    const shopMeta = await this.fetchShopMetadata(domain, accessToken);

    // Transactionally upsert the Store record
    const store = await this.prisma.store.upsert({
      where: {
        organizationId_domain: {
          organizationId: statePayload.organizationId,
          domain,
        },
      },
      create: {
        organizationId: statePayload.organizationId,
        platform: CommercePlatform.SHOPIFY,
        externalStoreId: shopMeta.id?.toString() || null,
        name: shopMeta.name || domain,
        domain,
        accessTokenEncrypted: encryptedToken,
        scope: this.scopes,
        status: StoreStatus.ACTIVE,
      },
      update: {
        accessTokenEncrypted: encryptedToken,
        scope: this.scopes,
        status: StoreStatus.ACTIVE,
        updatedAt: new Date(),
      },
    });

    return new StoreResponseDto(store);
  }

  /**
   * Retrieves active connected stores for an organization.
   */
  async getStoresForOrganization(
    organizationId: string,
  ): Promise<StoreResponseDto[]> {
    const stores = await this.prisma.store.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
    return stores.map((s) => new StoreResponseDto(s));
  }

  /**
   * Disconnects a store (transitions status to DISCONNECTED and clears token).
   */
  async disconnectStore(
    organizationId: string,
    storeId: string,
  ): Promise<void> {
    const store = await this.prisma.store.findFirst({
      where: { id: storeId, organizationId },
    });

    if (!store) {
      throw new BadRequestException('Store not found or unauthorized');
    }

    await this.prisma.store.update({
      where: { id: storeId },
      data: {
        status: StoreStatus.DISCONNECTED,
        accessTokenEncrypted: null,
      },
    });
  }

  /**
   * Normalizes shop domain string to standard myshopify.com format.
   */
  normalizeShopDomain(domain: string): string {
    let cleaned = domain.trim().toLowerCase();
    cleaned = cleaned.replace(/^https?:\/\//, '');
    cleaned = cleaned.replace(/\/.*$/, '');
    if (!cleaned.endsWith('.myshopify.com')) {
      cleaned = `${cleaned}.myshopify.com`;
    }
    return cleaned;
  }

  private async exchangeCodeForToken(
    domain: string,
    code: string,
  ): Promise<string> {
    // In production, performs POST request to https://{domain}/admin/oauth/access_token
    // Returns access token string. For dev/testing, returns structured mock if API secret is mock.
    if (this.apiSecret === 'mock_shopify_api_secret') {
      return `shpat_mock_access_token_${Date.now()}`;
    }
    const response = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.apiKey,
        client_secret: this.apiSecret,
        code,
      }),
    });
    if (!response.ok) {
      throw new BadRequestException('Failed to exchange Shopify OAuth code');
    }
    const data: any = await response.json();
    return data.access_token;
  }

  private async fetchShopMetadata(
    domain: string,
    accessToken: string,
  ): Promise<{ id?: string; name?: string }> {
    if (this.apiSecret === 'mock_shopify_api_secret') {
      return { id: 'gid://shopify/Shop/12345', name: domain.split('.')[0] };
    }
    const response = await fetch(
      `https://${domain}/admin/api/2024-01/shop.json`,
      {
        headers: { 'X-Shopify-Access-Token': accessToken },
      },
    );
    if (!response.ok) {
      return { name: domain };
    }
    const data: any = await response.json();
    return { id: data.shop?.id?.toString(), name: data.shop?.name };
  }
}

import { IsString, IsOptional } from 'class-validator';
import { StoreStatus, CommercePlatform } from '@prisma/client';

export class InitiateShopifyOAuthDto {
  @IsString()
  shopDomain: string;

  @IsOptional()
  @IsString()
  redirectUrl?: string;
}

export class ShopifyOAuthCallbackDto {
  @IsString()
  code: string;

  @IsString()
  hmac: string;

  @IsString()
  shop: string;

  @IsString()
  state: string;

  @IsString()
  timestamp: string;

  @IsOptional()
  @IsString()
  host?: string;
}

export class StoreResponseDto {
  id: string;
  organizationId: string;
  platform: CommercePlatform;
  externalStoreId: string | null;
  name: string;
  domain: string;
  scope: string | null;
  status: StoreStatus;
  syncedAt: string | null;
  createdAt: string;

  constructor(model: any) {
    this.id = model.id;
    this.organizationId = model.organizationId;
    this.platform = model.platform;
    this.externalStoreId = model.externalStoreId;
    this.name = model.name;
    this.domain = model.domain;
    this.scope = model.scope;
    this.status = model.status;
    this.syncedAt = model.syncedAt ? model.syncedAt.toISOString() : null;
    this.createdAt = model.createdAt.toISOString();
  }
}

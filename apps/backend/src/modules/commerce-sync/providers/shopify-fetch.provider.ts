import { Injectable, Logger } from '@nestjs/common';
import { Store } from '@prisma/client';
import {
  CommerceFetchProvider,
  CommerceOrderPage,
} from '../interfaces/commerce-fetch-provider.interface';

@Injectable()
export class ShopifyFetchProvider implements CommerceFetchProvider {
  private readonly logger = new Logger(ShopifyFetchProvider.name);

  /**
   * Mock/MVP implementation of fetching an order page from Shopify Admin API.
   * Treats pagination cursor as an opaque continuation token.
   */
  async fetchOrderPage(
    store: Store,
    cursor?: string,
    limit: number = 250,
  ): Promise<CommerceOrderPage> {
    this.logger.log(
      `Fetching order page for Store [${store.id}] (Cursor: ${cursor || 'START'}, Limit: ${limit})`,
    );

    // Default return structure — if no cursor is passed or end reached
    return {
      orders: [],
      nextCursor: undefined,
      hasMore: false,
    };
  }
}

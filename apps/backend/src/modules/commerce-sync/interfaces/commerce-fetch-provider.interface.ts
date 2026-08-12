import { Store } from '@prisma/client';

export interface RawCommerceOrderItem {
  id: string;
  productId?: string;
  variantId?: string;
  title: string;
  quantity: number;
  price: string;
  sku?: string;
}

export interface RawCommerceOrder {
  id: string;
  orderNumber: string;
  currency: string;
  totalPrice: string;
  subtotalPrice: string;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  updatedAt: string;
  lineItems: RawCommerceOrderItem[];
}

export interface CommerceOrderPage {
  orders: RawCommerceOrder[];
  nextCursor?: string;
  hasMore: boolean;
}

/**
 * Generic interface for commerce platforms (Shopify, WooCommerce, etc.)
 * treating pagination cursors as opaque continuation tokens.
 */
export interface CommerceFetchProvider {
  fetchOrderPage(
    store: Store,
    cursor?: string,
    limit?: number,
  ): Promise<CommerceOrderPage>;
}

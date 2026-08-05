import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  CommerceConflictService,
  ConflictResolutionOutcome,
} from './commerce-conflict.service';

export interface SyncJobData {
  webhookId: string;
  topic: string;
  shopDomain: string;
  organizationId: string | null;
  storeId: string | null;
  payload: any;
  receivedAt: string;
}

@Injectable()
export class CommerceSyncService {
  private readonly logger = new Logger(CommerceSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly conflictService: CommerceConflictService,
  ) {}

  /**
   * Synchronizes an incoming Shopify Order webhook payload.
   */
  async syncOrder(jobData: SyncJobData): Promise<void> {
    const { payload, organizationId, storeId } = jobData;
    if (!organizationId || !storeId) {
      this.logger.warn(
        `Skipping order sync: Missing tenant context (orgId: ${organizationId}, storeId: ${storeId})`,
      );
      return;
    }

    const externalOrderId = payload.id?.toString();
    const externalUpdatedAtStr = payload.updated_at || payload.created_at;

    if (!externalOrderId) {
      this.logger.warn('Skipping order sync: Missing external order ID');
      return;
    }

    // 1. Query existing DB record
    const existingOrder = await this.prisma.commerceOrder.findUnique({
      where: {
        storeId_externalOrderId: {
          storeId,
          externalOrderId,
        },
      },
    });

    // 2. Evaluate AES-038 OCC Conflict
    const evaluation = this.conflictService.evaluateConflict(
      externalUpdatedAtStr,
      existingOrder?.externalUpdatedAt,
      existingOrder?.manualOverride ?? false,
    );

    // 3. Log Audit Outcome
    await this.prisma.commerceSyncLog.create({
      data: {
        organizationId,
        storeId,
        entityType: 'ORDER',
        externalEntityId: externalOrderId,
        action: evaluation.outcome,
        message: evaluation.message,
      },
    });

    if (!evaluation.shouldWrite) {
      this.logger.log(`Order Sync [${externalOrderId}]: ${evaluation.message}`);
      return;
    }

    // 4. Perform Transactional Write
    const externalCreatedAt = payload.created_at
      ? new Date(payload.created_at)
      : new Date();
    const externalUpdatedAt = externalUpdatedAtStr
      ? new Date(externalUpdatedAtStr)
      : new Date();
    const nextSyncVersion =
      evaluation.incrementVersion && existingOrder
        ? existingOrder.syncVersion + 1
        : 1;

    await this.prisma.$transaction(async (tx) => {
      const order = await tx.commerceOrder.upsert({
        where: {
          storeId_externalOrderId: {
            storeId,
            externalOrderId,
          },
        },
        create: {
          storeId,
          organizationId,
          externalOrderId,
          orderNumber:
            payload.order_number?.toString() || payload.name || externalOrderId,
          currency: payload.currency || 'USD',
          totalPrice: payload.total_price || '0.00',
          subtotalPrice: payload.subtotal_price || '0.00',
          financialStatus: payload.financial_status || 'pending',
          fulfillmentStatus: payload.fulfillment_status || 'unfulfilled',
          externalCreatedAt,
          externalUpdatedAt,
          syncVersion: 1,
          syncSource: jobData.payload.sync_source || 'WEBHOOK',
          manualOverride: false,
        },
        update: {
          orderNumber:
            payload.order_number?.toString() || payload.name || externalOrderId,
          currency: payload.currency || 'USD',
          totalPrice: payload.total_price || '0.00',
          subtotalPrice: payload.subtotal_price || '0.00',
          financialStatus: payload.financial_status || 'pending',
          fulfillmentStatus: payload.fulfillment_status || 'unfulfilled',
          externalUpdatedAt,
          syncVersion: nextSyncVersion,
          syncSource: jobData.payload.sync_source || 'WEBHOOK',
        },
      });

      // Synchronize Order Items if available in payload
      if (Array.isArray(payload.line_items)) {
        await tx.commerceOrderItem.deleteMany({ where: { orderId: order.id } });
        await tx.commerceOrderItem.createMany({
          data: payload.line_items.map((item: any) => ({
            orderId: order.id,
            externalItemId: item.id?.toString() || `${order.id}_${item.sku}`,
            externalProductId: item.product_id?.toString() || null,
            externalVariantId: item.variant_id?.toString() || null,
            title: item.title || item.name || 'Item',
            quantity: item.quantity || 1,
            price: item.price || '0.00',
            sku: item.sku || null,
          })),
        });
      }
    });

    this.logger.log(
      `Order Sync Success [${externalOrderId}]: Written with version ${nextSyncVersion}`,
    );
  }

  /**
   * Synchronizes an incoming Shopify Product webhook payload.
   */
  async syncProduct(jobData: SyncJobData): Promise<void> {
    const { payload, organizationId, storeId } = jobData;
    if (!organizationId || !storeId) {
      this.logger.warn(
        `Skipping product sync: Missing tenant context (orgId: ${organizationId}, storeId: ${storeId})`,
      );
      return;
    }

    const externalProductId = payload.id?.toString();
    const externalUpdatedAtStr = payload.updated_at || payload.created_at;

    if (!externalProductId) {
      this.logger.warn('Skipping product sync: Missing external product ID');
      return;
    }

    const existingProduct = await this.prisma.commerceProduct.findUnique({
      where: {
        storeId_externalProductId: {
          storeId,
          externalProductId,
        },
      },
    });

    const incomingHash = this.conflictService.computePayloadHash(payload);
    if (existingProduct && existingProduct.lastSyncHash === incomingHash) {
      this.logger.log(
        `Product Sync [${externalProductId}]: Payload hash unchanged. Skip write (AES-038 §8).`,
      );
      return;
    }

    const evaluation = this.conflictService.evaluateConflict(
      externalUpdatedAtStr,
      existingProduct?.externalUpdatedAt,
    );

    await this.prisma.commerceSyncLog.create({
      data: {
        organizationId,
        storeId,
        entityType: 'PRODUCT',
        externalEntityId: externalProductId,
        action: evaluation.outcome,
        message: evaluation.message,
      },
    });

    if (!evaluation.shouldWrite) {
      this.logger.log(
        `Product Sync [${externalProductId}]: ${evaluation.message}`,
      );
      return;
    }

    const externalCreatedAt = payload.created_at
      ? new Date(payload.created_at)
      : new Date();
    const externalUpdatedAt = externalUpdatedAtStr
      ? new Date(externalUpdatedAtStr)
      : new Date();
    const nextSyncVersion =
      evaluation.incrementVersion && existingProduct
        ? existingProduct.syncVersion + 1
        : 1;

    await this.prisma.commerceProduct.upsert({
      where: {
        storeId_externalProductId: {
          storeId,
          externalProductId,
        },
      },
      create: {
        storeId,
        organizationId,
        externalProductId,
        title: payload.title || 'Untitled Product',
        description: payload.body_html || payload.description || null,
        vendor: payload.vendor || null,
        productType: payload.product_type || null,
        status: payload.status || 'ACTIVE',
        externalCreatedAt,
        externalUpdatedAt,
        syncVersion: 1,
        lastSyncHash: incomingHash,
        syncSource: jobData.payload.sync_source || 'WEBHOOK',
      },
      update: {
        title: payload.title || 'Untitled Product',
        description: payload.body_html || payload.description || null,
        vendor: payload.vendor || null,
        productType: payload.product_type || null,
        status: payload.status || 'ACTIVE',
        externalUpdatedAt,
        syncVersion: nextSyncVersion,
        lastSyncHash: incomingHash,
        syncSource: jobData.payload.sync_source || 'WEBHOOK',
      },
    });

    this.logger.log(
      `Product Sync Success [${externalProductId}]: Written with version ${nextSyncVersion}`,
    );
  }

  async applyManualOverride(
    orderId: string,
    adminUserId: string,
    updates: { fulfillmentStatus?: string; financialStatus?: string },
  ): Promise<any> {
    return await this.prisma.commerceOrder.update({
      where: { id: orderId },
      data: {
        ...(updates.fulfillmentStatus && {
          fulfillmentStatus: updates.fulfillmentStatus,
        }),
        ...(updates.financialStatus && {
          financialStatus: updates.financialStatus,
        }),
        manualOverride: true,
        manualOverrideAt: new Date(),
        manualOverrideBy: adminUserId,
        syncSource: 'MANUAL_OVERRIDE',
      },
    });
  }

  async releaseManualOverride(orderId: string): Promise<any> {
    return await this.prisma.commerceOrder.update({
      where: { id: orderId },
      data: {
        manualOverride: false,
        manualOverrideAt: null,
        manualOverrideBy: null,
      },
    });
  }
}

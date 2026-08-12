import {
  Injectable,
  Logger,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SyncStatus, SyncEntityType } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { CommerceConflictService } from './commerce-conflict.service';
import type {
  CommerceFetchProvider,
  RawCommerceOrder,
} from '../interfaces/commerce-fetch-provider.interface';
import {
  OrderSyncTelemetryService,
  SyncTelemetryDto,
} from './order-sync-telemetry.service';

export interface PageProcessResult {
  storeId: string;
  pagesProcessed: number;
  recordsProcessed: number;
  status: SyncStatus;
  hasMore: boolean;
}

@Injectable()
export class OrderSyncService {
  private readonly logger = new Logger(OrderSyncService.name);
  private readonly batchSize: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly conflictService: CommerceConflictService,
    private readonly configService: ConfigService,
    @Inject('CommerceFetchProvider')
    private readonly fetchProvider: CommerceFetchProvider,
  ) {
    this.batchSize = this.configService.get<number>(
      'COMMERCE_SYNC_BATCH_SIZE',
      250,
    );
  }

  /**
   * Acquire atomic Compare-And-Swap (CAS) lock for store historical synchronization.
   */
  async startOrResumeSync(
    organizationId: string,
    storeId: string,
  ): Promise<SyncTelemetryDto> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException(`Store [${storeId}] not found.`);
    }

    // Ensure checkpoint record exists
    const existing = await this.prisma.commerceSyncCheckpoint.findUnique({
      where: { storeId },
    });

    if (!existing) {
      await this.prisma.commerceSyncCheckpoint.create({
        data: {
          organizationId,
          storeId,
          entityType: SyncEntityType.ORDER,
          status: SyncStatus.IDLE,
        },
      });
    }

    // Atomic CAS update: lock only if status is IDLE, PAUSED, FAILED, or COMPLETED
    const acquired = await this.prisma.commerceSyncCheckpoint.updateMany({
      where: {
        storeId,
        status: {
          in: [
            SyncStatus.IDLE,
            SyncStatus.PAUSED,
            SyncStatus.FAILED,
            SyncStatus.COMPLETED,
          ],
        },
      },
      data: {
        status: SyncStatus.IN_PROGRESS,
        lastError: null,
      },
    });

    if (acquired.count === 0) {
      throw new ConflictException(
        `Sync lock acquisition failed for Store [${storeId}]: Synchronization is already IN_PROGRESS.`,
      );
    }

    const updated = await this.prisma.commerceSyncCheckpoint.findUnique({
      where: { storeId },
    });
    this.logger.log(
      `CAS lock acquired for Store [${storeId}]. Status -> IN_PROGRESS`,
    );

    return OrderSyncTelemetryService.toDto(updated);
  }

  /**
   * Processes a single page of historical orders atomically.
   * Combined inside a single Prisma $transaction for atomic data write & checkpoint advancement.
   */
  async processPageBatch(
    organizationId: string,
    storeId: string,
    ordersOverride?: RawCommerceOrder[],
    nextCursorOverride?: string,
  ): Promise<PageProcessResult> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException(`Store [${storeId}] not found.`);
    }

    const checkpoint = await this.prisma.commerceSyncCheckpoint.findUnique({
      where: { storeId },
    });

    if (!checkpoint) {
      throw new NotFoundException(
        `Checkpoint for Store [${storeId}] not found. Must initiate sync via startOrResumeSync first.`,
      );
    }

    // Fetch page using opaque continuation token
    let orders: RawCommerceOrder[] = [];
    let nextCursor: string | undefined = undefined;
    let hasMore = false;

    if (ordersOverride) {
      orders = ordersOverride;
      nextCursor = nextCursorOverride;
      hasMore = Boolean(nextCursorOverride);
    } else {
      const page = await this.fetchProvider.fetchOrderPage(
        store,
        checkpoint.nextCursor || undefined,
        this.batchSize,
      );
      orders = page.orders;
      nextCursor = page.nextCursor;
      hasMore = page.hasMore;
    }

    let writtenCount = 0;

    // Single interactive Prisma $transaction ensuring atomic writes and checkpoint advancement
    await this.prisma.$transaction(async (tx) => {
      for (const rawOrder of orders) {
        const externalOrderId = rawOrder.id.toString();
        const externalUpdatedAtStr = rawOrder.updatedAt || rawOrder.createdAt;

        // Query existing DB record for OCC evaluation
        const existingOrder = await tx.commerceOrder.findUnique({
          where: {
            storeId_externalOrderId: {
              storeId,
              externalOrderId,
            },
          },
        });

        // Evaluate OCC timestamps
        const evaluation = this.conflictService.evaluateConflict(
          externalUpdatedAtStr,
          existingOrder?.externalUpdatedAt,
        );

        if (!evaluation.shouldWrite) {
          continue;
        }

        const externalCreatedAt = rawOrder.createdAt
          ? new Date(rawOrder.createdAt)
          : new Date();
        const externalUpdatedAt = externalUpdatedAtStr
          ? new Date(externalUpdatedAtStr)
          : new Date();
        const nextSyncVersion =
          evaluation.incrementVersion && existingOrder
            ? existingOrder.syncVersion + 1
            : 1;

        const orderRecord = await tx.commerceOrder.upsert({
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
            orderNumber: rawOrder.orderNumber || externalOrderId,
            currency: rawOrder.currency || 'USD',
            totalPrice: rawOrder.totalPrice || '0.00',
            subtotalPrice: rawOrder.subtotalPrice || '0.00',
            financialStatus: rawOrder.financialStatus || 'pending',
            fulfillmentStatus: rawOrder.fulfillmentStatus || 'unfulfilled',
            externalCreatedAt,
            externalUpdatedAt,
            syncVersion: 1,
          },
          update: {
            orderNumber: rawOrder.orderNumber || externalOrderId,
            currency: rawOrder.currency || 'USD',
            totalPrice: rawOrder.totalPrice || '0.00',
            subtotalPrice: rawOrder.subtotalPrice || '0.00',
            financialStatus: rawOrder.financialStatus || 'pending',
            fulfillmentStatus: rawOrder.fulfillmentStatus || 'unfulfilled',
            externalUpdatedAt,
            syncVersion: nextSyncVersion,
          },
        });

        if (
          Array.isArray(rawOrder.lineItems) &&
          rawOrder.lineItems.length > 0
        ) {
          await tx.commerceOrderItem.deleteMany({
            where: { orderId: orderRecord.id },
          });
          await tx.commerceOrderItem.createMany({
            data: rawOrder.lineItems.map((item) => ({
              orderId: orderRecord.id,
              externalItemId: item.id.toString(),
              externalProductId: item.productId || null,
              externalVariantId: item.variantId || null,
              title: item.title || 'Item',
              quantity: item.quantity || 1,
              price: item.price || '0.00',
              sku: item.sku || null,
            })),
          });
        }

        writtenCount++;
      }

      // Completion criteria check: if no nextCursor remains, mark COMPLETED
      const finalStatus =
        hasMore && nextCursor ? SyncStatus.IN_PROGRESS : SyncStatus.COMPLETED;

      await tx.commerceSyncCheckpoint.update({
        where: { storeId },
        data: {
          nextCursor: nextCursor || null,
          pagesProcessed: checkpoint.pagesProcessed + 1,
          recordsProcessed: checkpoint.recordsProcessed + writtenCount,
          status: finalStatus,
          lastCheckpointAt: new Date(),
        },
      });
    });

    const finalCheckpoint = await this.prisma.commerceSyncCheckpoint.findUnique(
      {
        where: { storeId },
      },
    );

    this.logger.log(
      `Processed Page Batch for Store [${storeId}]: Page ${finalCheckpoint?.pagesProcessed}, Written ${writtenCount} orders, Status: ${finalCheckpoint?.status}`,
    );

    return {
      storeId,
      pagesProcessed: finalCheckpoint?.pagesProcessed || 0,
      recordsProcessed: finalCheckpoint?.recordsProcessed || 0,
      status: finalCheckpoint?.status || SyncStatus.COMPLETED,
      hasMore: Boolean(
        nextCursor && finalCheckpoint?.status === SyncStatus.IN_PROGRESS,
      ),
    };
  }

  /**
   * Retrieves operational telemetry for a tenant store.
   */
  async getTelemetry(storeId: string): Promise<SyncTelemetryDto> {
    const checkpoint = await this.prisma.commerceSyncCheckpoint.findUnique({
      where: { storeId },
    });

    if (!checkpoint) {
      throw new NotFoundException(
        `Sync checkpoint for Store [${storeId}] not found.`,
      );
    }

    return OrderSyncTelemetryService.toDto(checkpoint);
  }
}

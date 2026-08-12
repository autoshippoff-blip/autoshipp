import { ConflictException } from '@nestjs/common';
import { SyncStatus, SyncEntityType } from '@prisma/client';
import { OrderSyncService } from './order-sync.service';
import { CommerceConflictService } from './commerce-conflict.service';
import { ConfigService } from '@nestjs/config';

describe('OrderSyncService', () => {
  let service: OrderSyncService;
  let prismaMock: any;
  let conflictService: CommerceConflictService;
  let configService: ConfigService;
  let fetchProviderMock: any;

  const mockStore = {
    id: 'store-1',
    organizationId: 'org-1',
    domain: 'test-store.myshopify.com',
  };

  beforeEach(() => {
    prismaMock = {
      store: {
        findUnique: jest.fn().mockResolvedValue(mockStore),
      },
      commerceSyncCheckpoint: {
        findUnique: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
        update: jest.fn(),
      },
      commerceOrder: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      commerceOrderItem: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (cb) => {
        const tx = {
          commerceOrder: prismaMock.commerceOrder,
          commerceOrderItem: prismaMock.commerceOrderItem,
          commerceSyncCheckpoint: prismaMock.commerceSyncCheckpoint,
        };
        return cb(tx);
      }),
    };

    conflictService = new CommerceConflictService();
    configService = {
      get: jest.fn().mockReturnValue(250),
    } as unknown as ConfigService;

    fetchProviderMock = {
      fetchOrderPage: jest.fn(),
    };

    service = new OrderSyncService(
      prismaMock,
      conflictService,
      configService,
      fetchProviderMock,
    );
  });

  describe('CAS Lock Acquisition (Single Active Sync Invariant)', () => {
    it('successfully acquires CAS lock when checkpoint status is IDLE', async () => {
      prismaMock.commerceSyncCheckpoint.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          storeId: 'store-1',
          organizationId: 'org-1',
          status: SyncStatus.IN_PROGRESS,
          pagesProcessed: 0,
          recordsProcessed: 0,
        });
      prismaMock.commerceSyncCheckpoint.updateMany.mockResolvedValue({
        count: 1,
      });

      const telemetry = await service.startOrResumeSync('org-1', 'store-1');

      expect(prismaMock.commerceSyncCheckpoint.updateMany).toHaveBeenCalledWith(
        {
          where: {
            storeId: 'store-1',
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
        },
      );
      expect(telemetry.status).toBe(SyncStatus.IN_PROGRESS);
    });

    it('throws ConflictException when lock acquisition fails (already IN_PROGRESS)', async () => {
      prismaMock.commerceSyncCheckpoint.findUnique.mockResolvedValue({
        storeId: 'store-1',
        status: SyncStatus.IN_PROGRESS,
      });
      prismaMock.commerceSyncCheckpoint.updateMany.mockResolvedValue({
        count: 0,
      });

      await expect(
        service.startOrResumeSync('org-1', 'store-1'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('Page Processing & Crash Recovery', () => {
    it('processes page batch and updates checkpoint atomically', async () => {
      prismaMock.commerceSyncCheckpoint.findUnique
        .mockResolvedValueOnce({
          storeId: 'store-1',
          organizationId: 'org-1',
          nextCursor: 'cursor-page-41',
          pagesProcessed: 40,
          recordsProcessed: 1000,
          status: SyncStatus.IN_PROGRESS,
        })
        .mockResolvedValueOnce({
          storeId: 'store-1',
          organizationId: 'org-1',
          nextCursor: 'cursor-page-42',
          pagesProcessed: 41,
          recordsProcessed: 1001,
          status: SyncStatus.IN_PROGRESS,
        });

      const rawOrders = [
        {
          id: 'ord-101',
          orderNumber: '1001',
          currency: 'USD',
          totalPrice: '150.00',
          subtotalPrice: '150.00',
          financialStatus: 'paid',
          fulfillmentStatus: 'fulfilled',
          createdAt: '2026-08-07T10:00:00Z',
          updatedAt: '2026-08-07T10:05:00Z',
          lineItems: [],
        },
      ];

      prismaMock.commerceOrder.findUnique.mockResolvedValue(null);
      prismaMock.commerceOrder.upsert.mockResolvedValue({
        id: 'db-ord-101',
        syncVersion: 1,
      });

      const result = await service.processPageBatch(
        'org-1',
        'store-1',
        rawOrders,
        'cursor-page-42',
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.commerceOrder.upsert).toHaveBeenCalled();
      expect(prismaMock.commerceSyncCheckpoint.update).toHaveBeenCalledWith({
        where: { storeId: 'store-1' },
        data: expect.objectContaining({
          nextCursor: 'cursor-page-42',
          pagesProcessed: 41,
          recordsProcessed: 1001,
          status: SyncStatus.IN_PROGRESS,
        }),
      });
      expect(result.pagesProcessed).toBe(41);
    });

    it('Crash Recovery: resumes directly from page 42 cursor without duplicate processing', async () => {
      // Simulate post-crash state: page 41 committed, nextCursor points to page 42
      prismaMock.commerceSyncCheckpoint.findUnique
        .mockResolvedValueOnce({
          storeId: 'store-1',
          organizationId: 'org-1',
          nextCursor: 'cursor-page-42',
          pagesProcessed: 41,
          recordsProcessed: 1025,
          status: SyncStatus.IN_PROGRESS,
        })
        .mockResolvedValueOnce({
          storeId: 'store-1',
          organizationId: 'org-1',
          nextCursor: null,
          pagesProcessed: 42,
          recordsProcessed: 1026,
          status: SyncStatus.COMPLETED,
        });

      const rawOrdersPage42 = [
        {
          id: 'ord-102',
          orderNumber: '1002',
          currency: 'USD',
          totalPrice: '200.00',
          subtotalPrice: '200.00',
          financialStatus: 'paid',
          fulfillmentStatus: 'unfulfilled',
          createdAt: '2026-08-07T11:00:00Z',
          updatedAt: '2026-08-07T11:00:00Z',
          lineItems: [],
        },
      ];

      prismaMock.commerceOrder.findUnique.mockResolvedValue(null);
      prismaMock.commerceOrder.upsert.mockResolvedValue({
        id: 'db-ord-102',
        syncVersion: 1,
      });

      const result = await service.processPageBatch(
        'org-1',
        'store-1',
        rawOrdersPage42,
        null as any, // Final page
      );

      expect(prismaMock.commerceSyncCheckpoint.update).toHaveBeenCalledWith({
        where: { storeId: 'store-1' },
        data: expect.objectContaining({
          nextCursor: null,
          pagesProcessed: 42,
          recordsProcessed: 1026,
          status: SyncStatus.COMPLETED,
        }),
      });
      expect(result.status).toBe(SyncStatus.COMPLETED);
    });
  });

  describe('OCC Coexistence & Idempotency', () => {
    it('skips stale historical page order if newer real-time webhook order exists in DB', async () => {
      prismaMock.commerceSyncCheckpoint.findUnique.mockResolvedValue({
        storeId: 'store-1',
        organizationId: 'org-1',
        nextCursor: null,
        pagesProcessed: 0,
        recordsProcessed: 0,
        status: SyncStatus.IN_PROGRESS,
      });

      // Existing DB record updated at 12:00 via real-time webhook
      prismaMock.commerceOrder.findUnique.mockResolvedValue({
        id: 'db-ord-1',
        externalUpdatedAt: new Date('2026-08-07T12:00:00Z'),
        syncVersion: 2,
      });

      // Stale historical page item from 10:00
      const staleHistoricalOrder = [
        {
          id: 'ord-1',
          orderNumber: '1001',
          currency: 'USD',
          totalPrice: '100.00',
          subtotalPrice: '100.00',
          financialStatus: 'paid',
          fulfillmentStatus: 'fulfilled',
          createdAt: '2026-08-07T09:00:00Z',
          updatedAt: '2026-08-07T10:00:00Z',
          lineItems: [],
        },
      ];

      await service.processPageBatch(
        'org-1',
        'store-1',
        staleHistoricalOrder,
        undefined,
      );

      // OCC evaluation should skip the write
      expect(prismaMock.commerceOrder.upsert).not.toHaveBeenCalled();
    });
  });
});

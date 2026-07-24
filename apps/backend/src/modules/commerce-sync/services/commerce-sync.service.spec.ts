import { Test, TestingModule } from '@nestjs/testing';
import { CommerceSyncService } from './commerce-sync.service';
import { CommerceConflictService } from './commerce-conflict.service';
import { PrismaService } from '../../../prisma.service';

describe('CommerceSyncService', () => {
  let syncService: CommerceSyncService;
  let prismaService: any;

  beforeEach(async () => {
    prismaService = {
      commerceOrder: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      commerceProduct: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      commerceSyncLog: {
        create: jest.fn(),
      },
      commerceOrderItem: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(prismaService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommerceSyncService,
        CommerceConflictService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    syncService = module.get<CommerceSyncService>(CommerceSyncService);
  });

  it('should skip sync if organizationId or storeId is missing', async () => {
    await syncService.syncOrder({
      webhookId: 'evt-1',
      topic: 'orders/create',
      shopDomain: 'test.myshopify.com',
      organizationId: null,
      storeId: null,
      payload: { id: 123 },
      receivedAt: new Date().toISOString(),
    });

    expect(prismaService.commerceOrder.findUnique).not.toHaveBeenCalled();
  });

  it('should process new order and log CREATED audit action', async () => {
    prismaService.commerceOrder.findUnique.mockResolvedValue(null);

    await syncService.syncOrder({
      webhookId: 'evt-1',
      topic: 'orders/create',
      shopDomain: 'test.myshopify.com',
      organizationId: 'org-123',
      storeId: 'store-456',
      payload: {
        id: 999,
        created_at: '2026-07-24T10:00:00Z',
        updated_at: '2026-07-24T10:00:00Z',
        total_price: '100.00',
        currency: 'USD',
      },
      receivedAt: new Date().toISOString(),
    });

    expect(prismaService.commerceSyncLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        organizationId: 'org-123',
        storeId: 'store-456',
        entityType: 'ORDER',
        externalEntityId: '999',
      }),
    });
    expect(prismaService.commerceOrder.upsert).toHaveBeenCalled();
  });

  it('should reject stale product webhook and skip DB write', async () => {
    prismaService.commerceProduct.findUnique.mockResolvedValue({
      id: 'prod-uuid-1',
      externalUpdatedAt: new Date('2026-07-24T12:00:00Z'), // Stored is at 12:00
      syncVersion: 2,
    });

    await syncService.syncProduct({
      webhookId: 'evt-2',
      topic: 'products/update',
      shopDomain: 'test.myshopify.com',
      organizationId: 'org-123',
      storeId: 'store-456',
      payload: {
        id: 888,
        updated_at: '2026-07-24T10:00:00Z', // Incoming is at 10:00 (Stale)
      },
      receivedAt: new Date().toISOString(),
    });

    expect(prismaService.commerceSyncLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: 'REJECT_STALE',
      }),
    });
    expect(prismaService.commerceProduct.upsert).not.toHaveBeenCalled();
  });
});

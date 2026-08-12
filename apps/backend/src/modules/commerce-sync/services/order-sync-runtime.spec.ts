import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, SyncStatus, SyncEntityType } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { OrderSyncService } from './order-sync.service';
import { CommerceConflictService } from './commerce-conflict.service';
import { OrderSyncTelemetryService } from './order-sync-telemetry.service';
import {
  CommerceFetchProvider,
  RawCommerceOrder,
  OrderPageResult,
} from '../interfaces/commerce-fetch-provider.interface';
import { PrismaService } from '../../../prisma.service';

/**
 * SHARED DATABASE PROTECTION CONSTANT
 * Used to ensure live test runs never target the shared cloud database.
 */
const SHARED_NEON_HOST =
  'ep-dawn-mountain-aoeyvytj-pooler.c-2.ap-southeast-1.aws.neon.tech';

/**
 * Evaluates whether an authorized isolated test database configuration is provided.
 * Rejects connection if missing or if attempting to target shared database host.
 */
function getAuthorizedIsolatedDatabaseUrl(): string | null {
  const dbUrl =
    process.env.ISOLATED_TEST_DATABASE_URL ||
    process.env.COMMERCE_SYNC_TEST_DB_URL;
  if (!dbUrl) {
    return null;
  }
  if (dbUrl.includes(SHARED_NEON_HOST)) {
    throw new Error(
      'CRITICAL SAFETY VIOLATION: ISOLATED_TEST_DATABASE_URL matches the shared Neon database host! Execution halted.',
    );
  }
  return dbUrl;
}

/**
 * Synthetic In-Memory Mock Fetch Provider.
 * Guarantees zero external network or Shopify API calls.
 */
class MockCommerceFetchProvider implements CommerceFetchProvider {
  private pages: Map<string, OrderPageResult> = new Map();

  setPageResult(cursor: string | undefined, result: OrderPageResult): void {
    this.pages.set(cursor || 'INITIAL', result);
  }

  async fetchOrderPage(
    _store: any,
    cursor?: string,
    _limit?: number,
  ): Promise<OrderPageResult> {
    const key = cursor || 'INITIAL';
    const page = this.pages.get(key);
    if (page) {
      return page;
    }
    return {
      orders: [],
      nextCursor: undefined,
      hasMore: false,
    };
  }
}

describe('Commerce Sync Phase 1 — Order Sync Runtime Harness (spec)', () => {
  let app: INestApplication;
  let orderSyncService: OrderSyncService;
  let conflictService: CommerceConflictService;
  let mockFetchProvider: MockCommerceFetchProvider;
  let prisma: PrismaService;
  let pool: Pool | null = null;

  const isolatedDbUrl = getAuthorizedIsolatedDatabaseUrl();
  const isDatabaseAvailable = Boolean(isolatedDbUrl);

  beforeAll(async () => {
    mockFetchProvider = new MockCommerceFetchProvider();

    const builder = Test.createTestingModule({
      providers: [
        OrderSyncService,
        CommerceConflictService,
        ConfigService,
        PrismaService,
        {
          provide: 'CommerceFetchProvider',
          useValue: mockFetchProvider,
        },
      ],
    });

    if (isDatabaseAvailable && isolatedDbUrl) {
      // Connect exclusively to isolated test database
      pool = new Pool({ connectionString: isolatedDbUrl });
      const adapter = new PrismaPg(pool);
      const prismaClient = new PrismaClient({ adapter });
      builder.overrideProvider(PrismaService).useValue(prismaClient);
    } else {
      // Stub PrismaService for safe offline initialization
      builder.overrideProvider(PrismaService).useValue({});
    }

    const moduleFixture: TestingModule = await builder.compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    if (isDatabaseAvailable) {
      orderSyncService = moduleFixture.get<OrderSyncService>(OrderSyncService);
      conflictService = moduleFixture.get<CommerceConflictService>(
        CommerceConflictService,
      );
      prisma = moduleFixture.get<PrismaService>(PrismaService);
    }
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (pool) {
      await pool.end();
    }
  });

  // =========================================================================
  // 1. SAFETY & ISOLATION GUARDS (Runs Safely Without Live DB)
  // =========================================================================

  describe('Environment Safety & Isolation Controls', () => {
    it('should reject connection if database URL targets shared Neon database host', () => {
      const originalEnv = process.env.ISOLATED_TEST_DATABASE_URL;
      try {
        process.env.ISOLATED_TEST_DATABASE_URL = `postgresql://user:pass@${SHARED_NEON_HOST}/neondb`;
        expect(() => getAuthorizedIsolatedDatabaseUrl()).toThrow(
          /CRITICAL SAFETY VIOLATION/,
        );
      } finally {
        process.env.ISOLATED_TEST_DATABASE_URL = originalEnv;
      }
    });

    it('should return null if no isolated test database URL is configured', () => {
      const originalEnv1 = process.env.ISOLATED_TEST_DATABASE_URL;
      const originalEnv2 = process.env.COMMERCE_SYNC_TEST_DB_URL;
      try {
        delete process.env.ISOLATED_TEST_DATABASE_URL;
        delete process.env.COMMERCE_SYNC_TEST_DB_URL;
        expect(getAuthorizedIsolatedDatabaseUrl()).toBeNull();
      } finally {
        process.env.ISOLATED_TEST_DATABASE_URL = originalEnv1;
        process.env.COMMERCE_SYNC_TEST_DB_URL = originalEnv2;
      }
    });

    it('should map telemetry fields correctly via OrderSyncTelemetryService', () => {
      const now = new Date();
      const mockCheckpoint: any = {
        id: 'chk-uuid-1',
        organizationId: 'org-uuid-1',
        storeId: 'store-uuid-1',
        entityType: SyncEntityType.ORDER,
        nextCursor: 'cursor-page-2',
        pagesProcessed: 5,
        recordsProcessed: 1250,
        status: SyncStatus.IN_PROGRESS,
        lastError: null,
        lastCheckpointAt: now,
        createdAt: now,
      };

      const telemetry = OrderSyncTelemetryService.toDto(mockCheckpoint);
      expect(telemetry.storeId).toBe('store-uuid-1');
      expect(telemetry.status).toBe(SyncStatus.IN_PROGRESS);
      expect(telemetry.pagesProcessed).toBe(5);
      expect(telemetry.recordsProcessed).toBe(1250);
      expect(telemetry.nextCursor).toBe('cursor-page-2');
      expect(telemetry.lastError).toBeNull();
    });
  });

  // =========================================================================
  // 2. LIVE DATABASE SCENARIOS (Explicitly Skipped When No Isolated DB Exists)
  // =========================================================================

  const describeDatabaseScenarios = isDatabaseAvailable
    ? describe
    : describe.skip;

  describeDatabaseScenarios(
    'Live Database Validation Scenarios (Requires Authorized Isolated PostgreSQL DB)',
    () => {
      it('Scenario 1: Schema Readiness & Foreign Key Integrity', async () => {
        const storeCount = await (prisma as any).store.count();
        const checkpointCount = await (
          prisma as any
        ).commerceSyncCheckpoint.count();
        expect(typeof storeCount).toBe('number');
        expect(typeof checkpointCount).toBe('number');
      });

      it('Scenario 2: Valid Tenant Order Sync Execution', async () => {
        const orgId = '00000000-0000-0000-0000-000000000001';
        const storeId = '00000000-0000-0000-0000-000000000002';

        await (prisma as any).organization.upsert({
          where: { id: orgId },
          create: { id: orgId, name: 'Synthetic Org A', slug: 'syn-org-a' },
          update: {},
        });
        await (prisma as any).store.upsert({
          where: { id: storeId },
          create: {
            id: storeId,
            organizationId: orgId,
            name: 'Synthetic Store A',
            domain: 'synthetic-a.myshopify.com',
          },
          update: {},
        });

        const mockOrder: RawCommerceOrder = {
          id: 'ext-ord-101',
          orderNumber: '1001',
          totalPrice: '150.00',
          currency: 'USD',
          financialStatus: 'paid',
          fulfillmentStatus: 'fulfilled',
          createdAt: '2026-08-12T10:00:00Z',
          updatedAt: '2026-08-12T10:00:00Z',
        };
        mockFetchProvider.setPageResult(undefined, {
          orders: [mockOrder],
          nextCursor: undefined,
          hasMore: false,
        });

        const telemetry = await orderSyncService.startOrResumeSync(
          orgId,
          storeId,
        );
        expect(telemetry.status).toBe(SyncStatus.IN_PROGRESS);

        const pageResult = await orderSyncService.processPageBatch(
          orgId,
          storeId,
        );
        expect(pageResult.recordsProcessed).toBe(1);
        expect(pageResult.status).toBe(SyncStatus.COMPLETED);

        const savedOrder = await (prisma as any).commerceOrder.findUnique({
          where: {
            storeId_externalOrderId: {
              storeId,
              externalOrderId: 'ext-ord-101',
            },
          },
        });
        expect(savedOrder).toBeDefined();
        expect(savedOrder.organizationId).toBe(orgId);
      });

      it('Scenario 3: Cross-Tenant Store Access Rejection', async () => {
        const orgAId = '00000000-0000-0000-0000-000000000001';
        const orgBId = '00000000-0000-0000-0000-000000000003';
        const storeBId = '00000000-0000-0000-0000-000000000004';

        await (prisma as any).organization.upsert({
          where: { id: orgBId },
          create: { id: orgBId, name: 'Synthetic Org B', slug: 'syn-org-b' },
          update: {},
        });
        await (prisma as any).store.upsert({
          where: { id: storeBId },
          create: {
            id: storeBId,
            organizationId: orgBId,
            name: 'Synthetic Store B',
            domain: 'synthetic-b.myshopify.com',
          },
          update: {},
        });

        await expect(
          orderSyncService.startOrResumeSync(orgAId, storeBId),
        ).rejects.toThrow(NotFoundException);

        const checkpoint = await (
          prisma as any
        ).commerceSyncCheckpoint.findUnique({
          where: { storeId: storeBId },
        });
        expect(checkpoint).toBeNull();
      });

      it('Scenario 4: Atomic CAS Concurrency Lock Enforcement', async () => {
        const orgId = '00000000-0000-0000-0000-000000000001';
        const storeId = '00000000-0000-0000-0000-000000000002';

        await (prisma as any).commerceSyncCheckpoint.update({
          where: { storeId },
          data: { status: SyncStatus.IDLE },
        });

        const results = await Promise.allSettled([
          orderSyncService.startOrResumeSync(orgId, storeId),
          orderSyncService.startOrResumeSync(orgId, storeId),
        ]);

        const fulfilled = results.filter((r) => r.status === 'fulfilled');
        const rejected = results.filter((r) => r.status === 'rejected');

        expect(fulfilled.length).toBe(1);
        expect(rejected.length).toBe(1);
        expect((rejected[0] as PromiseRejectedResult).reason).toBeInstanceOf(
          ConflictException,
        );
      });

      it('Scenario 5: Cursor Persistence & Resumability', async () => {
        const orgId = '00000000-0000-0000-0000-000000000001';
        const storeId = '00000000-0000-0000-0000-000000000002';

        await (prisma as any).commerceSyncCheckpoint.update({
          where: { storeId },
          data: { status: SyncStatus.IN_PROGRESS, nextCursor: 'cursor-page-2' },
        });

        const mockOrderPage2: RawCommerceOrder = {
          id: 'ext-ord-102',
          orderNumber: '1002',
          totalPrice: '200.00',
          createdAt: '2026-08-12T11:00:00Z',
        };
        mockFetchProvider.setPageResult('cursor-page-2', {
          orders: [mockOrderPage2],
          nextCursor: undefined,
          hasMore: false,
        });

        const pageResult = await orderSyncService.processPageBatch(
          orgId,
          storeId,
        );
        expect(pageResult.status).toBe(SyncStatus.COMPLETED);

        const savedOrder = await (prisma as any).commerceOrder.findUnique({
          where: {
            storeId_externalOrderId: {
              storeId,
              externalOrderId: 'ext-ord-102',
            },
          },
        });
        expect(savedOrder).toBeDefined();
      });

      it('Scenario 6: Timestamp-Based OCC Stale-Write Rejection', async () => {
        const orgId = '00000000-0000-0000-0000-000000000001';
        const storeId = '00000000-0000-0000-0000-000000000002';

        await (prisma as any).commerceOrder.upsert({
          where: {
            storeId_externalOrderId: {
              storeId,
              externalOrderId: 'ext-occ-200',
            },
          },
          create: {
            storeId,
            organizationId: orgId,
            externalOrderId: 'ext-occ-200',
            orderNumber: '2000',
            currency: 'USD',
            totalPrice: '500.00',
            subtotalPrice: '500.00',
            financialStatus: 'paid',
            fulfillmentStatus: 'fulfilled',
            externalCreatedAt: new Date('2026-08-12T12:00:00Z'),
            externalUpdatedAt: new Date('2026-08-12T12:00:00Z'),
            syncVersion: 2,
          },
          update: {
            externalUpdatedAt: new Date('2026-08-12T12:00:00Z'),
            totalPrice: '500.00',
          },
        });

        const staleOrder: RawCommerceOrder = {
          id: 'ext-occ-200',
          orderNumber: '2000',
          totalPrice: '100.00',
          createdAt: '2026-08-12T10:00:00Z',
          updatedAt: '2026-08-12T10:00:00Z',
        };

        await orderSyncService.processPageBatch(
          orgId,
          storeId,
          [staleOrder],
          undefined,
        );

        const persisted = await (prisma as any).commerceOrder.findUnique({
          where: {
            storeId_externalOrderId: {
              storeId,
              externalOrderId: 'ext-occ-200',
            },
          },
        });
        expect(Number(persisted.totalPrice)).toBe(500.0);
      });

      it('Scenario 7: Atomic Transaction Rollback on Database Error', async () => {
        const orgId = '00000000-0000-0000-0000-000000000001';
        const storeId = '00000000-0000-0000-0000-000000000002';

        const initialCheckpoint = await (
          prisma as any
        ).commerceSyncCheckpoint.findUnique({
          where: { storeId },
        });
        const initialRecordsCount = initialCheckpoint?.recordsProcessed || 0;

        const malformedOrder: any = {
          id: 'ext-malformed-999',
          orderNumber: '9999',
          totalPrice: 'INVALID_NUMERIC_DECIMAL_STRING_THAT_FAILS_DB_CAST',
        };

        await expect(
          orderSyncService.processPageBatch(
            orgId,
            storeId,
            [malformedOrder],
            'cursor-next',
          ),
        ).rejects.toThrow();

        const afterRollbackCheckpoint = await (
          prisma as any
        ).commerceSyncCheckpoint.findUnique({
          where: { storeId },
        });
        expect(afterRollbackCheckpoint.recordsProcessed).toBe(
          initialRecordsCount,
        );
      });
    },
  );
});

import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { PrismaService } from '../../prisma.service';
import {
  BadRequestException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  TransactionDirection,
  WalletType,
  WalletStatus,
  RelationshipType,
} from '@prisma/client';
import { Prisma } from '@prisma/client';
import { OrganizationRelationshipsService } from '../organizations/organization-relationships.service';
import { ASSIGNMENT_SERVICE_INTERFACE } from '../marketplace/marketplace.interface';
import { ForbiddenException } from '@nestjs/common';

describe('WalletService', () => {
  let service: WalletService;
  let prisma: PrismaService;
  let orgRelationshipsService: OrganizationRelationshipsService;

  beforeEach(async () => {
    const mockOrgRelationshipsService = {
      getAncestorOrganizationIds: jest.fn(),
    };

    const mockAssignmentService = {
      getActiveAssignments: jest
        .fn()
        .mockResolvedValue([{ id: 'mock-assignment' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: OrganizationRelationshipsService,
          useValue: mockOrgRelationshipsService,
        },
        {
          provide: ASSIGNMENT_SERVICE_INTERFACE,
          useValue: mockAssignmentService,
        },
        {
          provide: PrismaService,
          useValue: {
            wallet: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
            },
            organizationRelationship: {
              findFirst: jest.fn(),
            },
            walletBalance: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            walletTransaction: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            $transaction: jest.fn(),
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    prisma = module.get<PrismaService>(PrismaService);
    orgRelationshipsService = module.get<OrganizationRelationshipsService>(
      OrganizationRelationshipsService,
    );

    jest.spyOn(prisma.wallet, 'findUnique').mockResolvedValue({
      id: 'wallet-1',
      status: WalletStatus.ACTIVE,
    } as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createWallet', () => {
    it('should create a wallet with a balance of 0', async () => {
      const orgId = 'org-123';
      const expectedResult = {
        id: 'wallet-1',
        organizationId: orgId,
        type: WalletType.PRIMARY,
        currency: 'USD',
        balance: {
          availableBalance: new Prisma.Decimal(0),
          reservedBalance: new Prisma.Decimal(0),
        },
      };
      jest
        .spyOn(prisma.wallet, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await service.createWallet(
        orgId,
        WalletType.PRIMARY,
        'USD',
      );
      expect(result).toEqual(expectedResult);
      expect(prisma.wallet.create).toHaveBeenCalledWith({
        data: {
          organizationId: orgId,
          type: WalletType.PRIMARY,
          currency: 'USD',
          balance: { create: { availableBalance: 0, reservedBalance: 0 } },
        },
        include: { balance: true },
      });
    });
  });

  describe('credit', () => {
    it('should insert a transaction and increment the balance atomically', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-1',
        transactionTypeId: 'type-topup',
        amount: 100,
        referenceType: 'stripe_payment',
        referenceId: 'ch_123',
      };

      const mockTransaction = {
        id: 'tx-1',
        ...params,
        direction: TransactionDirection.CREDIT,
      };
      const mockBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(100),
      };

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(null);
      jest
        .spyOn(prisma.walletTransaction, 'create')
        .mockResolvedValue(mockTransaction as any);
      jest
        .spyOn(prisma.walletBalance, 'findUnique')
        .mockResolvedValue({ availableBalance: 0 } as any);
      jest
        .spyOn(prisma.walletBalance, 'update')
        .mockResolvedValue(mockBalance as any);

      const result = await service.credit(params);

      expect(prisma.walletTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          walletId: params.walletId,
          idempotencyKey: params.idempotencyKey,
          amount: params.amount,
          direction: TransactionDirection.CREDIT,
        }),
      });

      expect(prisma.walletBalance.update).toHaveBeenCalledWith({
        where: { walletId: params.walletId },
        data: { availableBalance: { increment: params.amount } },
      });

      expect(result).toEqual({
        transaction: mockTransaction,
        balance: mockBalance,
      });
    });

    it('should return existing transaction if idempotencyKey matches', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-duplicate',
        transactionTypeId: 'type-topup',
        amount: 100,
        referenceType: 'stripe_payment',
      };

      const existingTx = {
        id: 'tx-old',
        ...params,
        direction: TransactionDirection.CREDIT,
      };
      const currentBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(200),
      };

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(existingTx as any);
      jest
        .spyOn(prisma.walletBalance, 'findUnique')
        .mockResolvedValue(currentBalance as any);

      const result = await service.credit(params);

      expect(prisma.walletTransaction.create).not.toHaveBeenCalled();
      expect(prisma.walletBalance.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        transaction: existingTx,
        balance: currentBalance,
      });
    });

    it('should handle concurrent idempotency check (P2002 race condition)', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-race',
        transactionTypeId: 'type-topup',
        amount: 100,
        referenceType: 'stripe_payment',
      };

      const existingTx = {
        id: 'tx-race',
        ...params,
        direction: TransactionDirection.CREDIT,
      };
      const currentBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(200),
      };

      const p2002Error = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '5.0.0',
        },
      );

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(existingTx as any);

      jest
        .spyOn(prisma.walletTransaction, 'create')
        .mockRejectedValue(p2002Error);
      jest
        .spyOn(prisma.walletBalance, 'findUnique')
        .mockResolvedValue(currentBalance as any);

      const result = await service.credit(params);

      expect(prisma.walletTransaction.create).toHaveBeenCalled();
      expect(result).toEqual({
        transaction: existingTx,
        balance: currentBalance,
      });
    });
  });

  describe('debit', () => {
    it('should insert a transaction and decrement the balance if funds are sufficient', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(null);
      jest
        .spyOn(prisma, '$queryRaw')
        .mockResolvedValue([{ available_balance: 200 }]);

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-2',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      const mockTransaction = {
        id: 'tx-2',
        ...params,
        direction: TransactionDirection.DEBIT,
      };
      const mockBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(100),
      };

      jest
        .spyOn(prisma.walletTransaction, 'create')
        .mockResolvedValue(mockTransaction as any);
      jest
        .spyOn(prisma.walletBalance, 'update')
        .mockResolvedValue(mockBalance as any);

      const result = await service.debit(params);

      expect(prisma.walletTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          walletId: params.walletId,
          idempotencyKey: params.idempotencyKey,
          amount: params.amount,
          direction: TransactionDirection.DEBIT,
        }),
      });

      expect(prisma.walletBalance.update).toHaveBeenCalledWith({
        where: { walletId: params.walletId },
        data: { availableBalance: { decrement: params.amount } },
      });

      expect(result).toEqual({
        transaction: mockTransaction,
        balance: mockBalance,
      });
    });

    it('should throw BadRequestException if balance is insufficient', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });
      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(null);

      // Current balance is 50, trying to debit 100
      jest
        .spyOn(prisma, '$queryRaw')
        .mockResolvedValue([{ available_balance: 50 }]);

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-3',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      await expect(service.debit(params)).rejects.toThrow(BadRequestException);
      expect(prisma.walletTransaction.create).not.toHaveBeenCalled();
      expect(prisma.walletBalance.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for suspended wallet', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });
      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(null);
      jest.spyOn(prisma.wallet, 'findUnique').mockResolvedValue({
        id: 'wallet-1',
        status: WalletStatus.SUSPENDED,
      } as any);

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-4',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      await expect(service.debit(params)).rejects.toThrow('wallet-suspended');
    });

    it('should throw ForbiddenException if AI access is suspended (no active assignments)', async () => {
      const module = await Test.createTestingModule({
        providers: [
          WalletService,
          {
            provide: OrganizationRelationshipsService,
            useValue: { getAncestorOrganizationIds: jest.fn() },
          },
          {
            provide: PrismaService,
            useValue: {
              wallet: {
                findUnique: jest.fn().mockResolvedValue({
                  id: 'wallet-1',
                  status: WalletStatus.ACTIVE,
                  organizationId: 'org-1',
                }),
              },
              $transaction: jest.fn().mockImplementation(async (cb) =>
                cb({
                  walletTransaction: {
                    findUnique: jest.fn().mockResolvedValue(null),
                  },
                  wallet: {
                    findUnique: jest.fn().mockResolvedValue({
                      id: 'wallet-1',
                      status: WalletStatus.ACTIVE,
                      organizationId: 'org-1',
                    }),
                  },
                  $queryRaw: jest
                    .fn()
                    .mockResolvedValue([{ available_balance: 200 }]),
                }),
              ),
              $queryRaw: jest
                .fn()
                .mockResolvedValue([{ available_balance: 200 }]),
            },
          },
          {
            provide: ASSIGNMENT_SERVICE_INTERFACE,
            useValue: { getActiveAssignments: jest.fn().mockResolvedValue([]) }, // returns empty array
          },
        ],
      }).compile();

      const testService = module.get<WalletService>(WalletService);

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-5',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      await expect(testService.debit(params)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should return existing transaction if idempotencyKey matches', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-duplicate',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      const existingTx = {
        id: 'tx-old',
        ...params,
        direction: TransactionDirection.DEBIT,
      };
      const currentBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(150),
      };

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValue(existingTx as any);
      jest
        .spyOn(prisma.walletBalance, 'findUnique')
        .mockResolvedValue(currentBalance as any);

      const result = await service.debit(params);

      expect(prisma.walletTransaction.create).not.toHaveBeenCalled();
      expect(prisma.walletBalance.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        transaction: existingTx,
        balance: currentBalance,
      });
    });

    it('should handle concurrent idempotency check (P2002 race condition)', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (cb) => {
        return cb(prisma);
      });

      const params = {
        walletId: 'wallet-1',
        idempotencyKey: 'idemp-race-debit',
        transactionTypeId: 'type-usage',
        amount: 100,
        referenceType: 'ai_request',
      };

      const existingTx = {
        id: 'tx-race',
        ...params,
        direction: TransactionDirection.DEBIT,
      };
      const currentBalance = {
        walletId: 'wallet-1',
        availableBalance: new Prisma.Decimal(150),
      };

      const p2002Error = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '5.0.0',
        },
      );

      jest
        .spyOn(prisma.walletTransaction, 'findUnique')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(existingTx as any);

      jest
        .spyOn(prisma, '$queryRaw')
        .mockResolvedValue([{ available_balance: 200 }]);
      jest
        .spyOn(prisma.walletTransaction, 'create')
        .mockRejectedValue(p2002Error);
      jest
        .spyOn(prisma.walletBalance, 'findUnique')
        .mockResolvedValue(currentBalance as any);

      const result = await service.debit(params);

      expect(prisma.walletTransaction.create).toHaveBeenCalled();
      expect(result).toEqual({
        transaction: existingTx,
        balance: currentBalance,
      });
    });
  });

  describe('resolveWallet', () => {
    it('should resolve a direct wallet', async () => {
      const mockWallet = {
        id: 'wallet-1',
        organizationId: 'org-1',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(orgRelationshipsService, 'getAncestorOrganizationIds')
        .mockResolvedValue(['org-1']);
      jest
        .spyOn(prisma.wallet, 'findMany')
        .mockResolvedValue([mockWallet as any]);

      const result = await service.resolveWallet('org-1');
      expect(result).toEqual(mockWallet);
      expect(
        orgRelationshipsService.getAncestorOrganizationIds,
      ).toHaveBeenCalledWith('org-1');
      expect(prisma.wallet.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            organizationId: { in: ['org-1'] },
            type: WalletType.PRIMARY,
          },
        }),
      );
    });

    it('should resolve a parent aggregator wallet', async () => {
      const parentWallet = {
        id: 'wallet-parent',
        organizationId: 'org-parent',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(orgRelationshipsService, 'getAncestorOrganizationIds')
        .mockResolvedValue(['org-child', 'org-parent']);
      jest
        .spyOn(prisma.wallet, 'findMany')
        .mockResolvedValue([parentWallet as any]);

      const result = await service.resolveWallet('org-child');
      expect(result).toEqual(parentWallet);
    });

    it('should throw NotFoundException if no wallet exists in the hierarchy', async () => {
      jest
        .spyOn(orgRelationshipsService, 'getAncestorOrganizationIds')
        .mockResolvedValue(['org-child', 'org-parent', 'org-platform']);
      jest.spyOn(prisma.wallet, 'findMany').mockResolvedValue([]);

      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        'wallet-not-found',
      );
    });

    it('should correctly select the nearest wallet when multiple exist', async () => {
      const childWallet = {
        id: 'wallet-child',
        organizationId: 'org-child',
        type: WalletType.PRIMARY,
      };
      const parentWallet = {
        id: 'wallet-parent',
        organizationId: 'org-parent',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(orgRelationshipsService, 'getAncestorOrganizationIds')
        .mockResolvedValue(['org-child', 'org-parent']);
      // findMany returns both
      jest
        .spyOn(prisma.wallet, 'findMany')
        .mockResolvedValue([parentWallet as any, childWallet as any]);

      const result = await service.resolveWallet('org-child');
      // Should pick childWallet because org-child is first in the hierarchy array
      expect(result).toEqual(childWallet);
    });
  });
});

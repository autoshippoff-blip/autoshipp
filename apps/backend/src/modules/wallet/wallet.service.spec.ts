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

describe('WalletService', () => {
  let service: WalletService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: PrismaService,
          useValue: {
            wallet: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
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
        .spyOn(prisma.wallet, 'findFirst')
        .mockResolvedValue(mockWallet as any);

      const result = await service.resolveWallet('org-1');
      expect(result).toEqual(mockWallet);
      expect(prisma.wallet.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { organizationId: 'org-1', type: WalletType.PRIMARY },
        }),
      );
      expect(prisma.organizationRelationship.findFirst).not.toHaveBeenCalled();
    });

    it('should resolve a parent aggregator wallet', async () => {
      const parentWallet = {
        id: 'wallet-parent',
        organizationId: 'org-parent',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(prisma.wallet, 'findFirst')
        .mockResolvedValueOnce(null) // Not found for child
        .mockResolvedValueOnce(parentWallet as any); // Found for parent

      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-parent',
          childOrganizationId: 'org-child',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any);

      const result = await service.resolveWallet('org-child');
      expect(result).toEqual(parentWallet);
      expect(prisma.organizationRelationship.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            childOrganizationId: 'org-child',
            relationshipType: RelationshipType.MANAGES,
            active: true,
          },
        }),
      );
    });

    it('should resolve the correct wallet after a parent transfer', async () => {
      const newParentWallet = {
        id: 'wallet-new-parent',
        organizationId: 'org-new-parent',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(prisma.wallet, 'findFirst')
        .mockResolvedValueOnce(null) // Not found for child
        .mockResolvedValueOnce(newParentWallet as any); // Found for new parent

      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-new-parent',
          childOrganizationId: 'org-child',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any);

      const result = await service.resolveWallet('org-child');
      expect(result).toEqual(newParentWallet);
      expect(prisma.organizationRelationship.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            childOrganizationId: 'org-child',
            relationshipType: RelationshipType.MANAGES,
            active: true,
          },
        }),
      );
    });

    it('should resolve a multi-level hierarchy wallet', async () => {
      const grandParentWallet = {
        id: 'wallet-grandparent',
        organizationId: 'org-grandparent',
        type: WalletType.PRIMARY,
      };

      jest
        .spyOn(prisma.wallet, 'findFirst')
        .mockResolvedValueOnce(null) // Not found for child
        .mockResolvedValueOnce(null) // Not found for parent
        .mockResolvedValueOnce(grandParentWallet as any); // Found for grandparent

      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-parent',
          childOrganizationId: 'org-child',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any)
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-grandparent',
          childOrganizationId: 'org-parent',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any);

      const result = await service.resolveWallet('org-child');
      expect(result).toEqual(grandParentWallet);
    });

    it('should ignore historical inactive relationships', async () => {
      jest.spyOn(prisma.wallet, 'findFirst').mockResolvedValue(null);
      // Simulate inactive by returning null (as the query filters for active: true)
      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValue(null);

      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        'wallet-not-found',
      );
    });

    it('should correctly identify a zero-parent root organization', async () => {
      jest.spyOn(prisma.wallet, 'findFirst').mockResolvedValue(null);

      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-root',
          childOrganizationId: 'org-child',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any)
        .mockResolvedValueOnce(null); // Root has no parent

      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        'wallet-not-found',
      );
    });

    it('should detect cycles and prevent infinite loops', async () => {
      jest.spyOn(prisma.wallet, 'findFirst').mockResolvedValue(null);

      // Cycle: child -> parent -> child
      jest
        .spyOn(prisma.organizationRelationship, 'findFirst')
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-parent',
          childOrganizationId: 'org-child',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any)
        .mockResolvedValueOnce({
          parentOrganizationId: 'org-child',
          childOrganizationId: 'org-parent',
          relationshipType: RelationshipType.MANAGES,
          active: true,
        } as any);

      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.resolveWallet('org-child')).rejects.toThrow(
        'wallet-not-found',
      );
    });
  });
});

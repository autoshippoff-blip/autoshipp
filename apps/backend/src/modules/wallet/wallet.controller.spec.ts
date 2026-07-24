import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../auth/organization.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { ForbiddenException } from '@nestjs/common';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  const mockWalletService = {
    resolveWallet: jest.fn(),
    getBalance: jest.fn(),
    getTransactions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(OrganizationGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(PermissionGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyWalletBalance', () => {
    it('should throw ForbiddenException if no orgId in request user', async () => {
      const req = { user: {} };
      await expect(controller.getMyWalletBalance(req)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should map domain objects to DTO correctly', async () => {
      const req = { user: { organization_id: 'org-1' } };

      const mockWallet = {
        id: 'wallet-1',
        organizationId: 'org-1',
        status: 'ACTIVE',
        type: 'PRIMARY',
        currency: 'USD',
      };

      const mockBalance = {
        availableBalance: { toString: () => '100.50' },
        reservedBalance: { toString: () => '0.00' },
        updatedAt: new Date(),
      };

      mockWalletService.resolveWallet.mockResolvedValue(mockWallet);
      mockWalletService.getBalance.mockResolvedValue(mockBalance);

      const result = await controller.getMyWalletBalance(req);

      expect(result).toEqual({
        organizationId: 'org-1',
        status: 'ACTIVE',
        type: 'PRIMARY',
        currency: 'USD',
        availableBalance: '100.50',
        reservedBalance: '0.00',
        updatedAt: mockBalance.updatedAt,
      });
      // Verifies Prisma models are NOT exposed directly
      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('walletId');
    });
  });

  describe('getMyWalletTransactions', () => {
    it('should correctly parse pagination and map transactions', async () => {
      const req = { user: { organization_id: 'org-1' } };

      const mockWallet = { id: 'wallet-1', organizationId: 'org-1' };

      const mockTransaction = {
        id: 'tx-1',
        idempotencyKey: 'key-1',
        direction: 'CREDIT',
        amount: { toString: () => '50.00' },
        referenceType: 'ORDER',
        referenceId: 'ord-1',
        description: null,
        metadata: null,
        createdAt: new Date(),
      };

      mockWalletService.resolveWallet.mockResolvedValue(mockWallet);
      mockWalletService.getTransactions.mockResolvedValue({
        transactions: [mockTransaction],
        total: 1,
      });

      // '0' should default to 1, '200' should max out at 100
      const result = await controller.getMyWalletTransactions(req, '0', '200');

      expect(mockWalletService.getTransactions).toHaveBeenCalledWith(
        'wallet-1',
        1,
        100,
      );

      expect(result.meta).toEqual({
        total: 1,
        page: 1,
        limit: 100,
      });

      expect(result.data[0]).toEqual({
        transactionId: 'tx-1',
        idempotencyKey: 'key-1',
        direction: 'CREDIT',
        amount: '50.00',
        referenceType: 'ORDER',
        referenceId: 'ord-1',
        description: null,
        metadata: null,
        createdAt: mockTransaction.createdAt,
      });
      expect(result.data[0]).not.toHaveProperty('id');
    });
  });
});

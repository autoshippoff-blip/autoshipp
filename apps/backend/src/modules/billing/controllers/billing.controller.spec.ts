import { Test, TestingModule } from '@nestjs/testing';
import { AdminBillingController } from './admin-billing.controller';
import { OrganizationBillingController } from './organization-billing.controller';
import { PlanService } from '../services/plan.service';
import { BillingService } from '../services/billing.service';
import { PaymentService } from '../services/payment.service';
import {
  PrismaClient,
  BillingCycle,
  InvoiceStatus,
  PaymentStatus,
} from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BillingDtoMapper } from '../mappers/billing.mapper';
import {
  PaymentFailedException,
  PlanNotFoundException,
} from '../exceptions/billing.exceptions';
import { BillingExceptionFilter } from '../filters/billing-exception.filter';

describe('Billing Controllers', () => {
  let adminController: AdminBillingController;
  let orgController: OrganizationBillingController;

  const mockPlanService = {
    createPlan: jest.fn(),
    addPlanPrice: jest.fn(),
    getPlanPrices: jest.fn(),
  };

  const mockBillingService = {
    issueInvoice: jest.fn(),
  };

  const mockPaymentService = {
    processWalletPayment: jest.fn(),
  };

  const mockPrisma = {
    invoice: {
      findMany: jest.fn(),
      findFirstOrThrow: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBillingController, OrganizationBillingController],
      providers: [
        { provide: PlanService, useValue: mockPlanService },
        { provide: BillingService, useValue: mockBillingService },
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: PrismaClient, useValue: mockPrisma },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    adminController = module.get<AdminBillingController>(
      AdminBillingController,
    );
    orgController = module.get<OrganizationBillingController>(
      OrganizationBillingController,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AdminBillingController', () => {
    it('should map PlanService output to DTO via Mapper', async () => {
      const planId = '85e0df79-d51d-4eb7-bebd-62e5b8d23d8c';
      const mockPlan = {
        id: planId,
        productId: 'prod_123',
        code: 'BASIC',
        name: 'Basic Plan',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [],
      };

      mockPlanService.createPlan.mockResolvedValue(mockPlan);
      const dto = { productId: 'prod_123', code: 'BASIC', name: 'Basic Plan' };

      const result = await adminController.createPlan(dto);

      expect(mockPlanService.createPlan).toHaveBeenCalledWith(dto);
      expect(result).toEqual(BillingDtoMapper.toPlanResponse(mockPlan));
    });

    it('should return 404 via filter if PlanNotFoundException thrown', () => {
      // Tested via e2e or testing filter independently
      const filter = new BillingExceptionFilter();
      const mockJson = jest.fn();
      const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
      const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
      const mockHttpArgumentsHost = jest
        .fn()
        .mockReturnValue({ getResponse: mockGetResponse });
      const mockArgumentsHost = { switchToHttp: mockHttpArgumentsHost };

      const error = new PlanNotFoundException('xyz');

      filter.catch(error, mockArgumentsHost as any);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 404 }),
      );
    });
  });

  describe('OrganizationBillingController', () => {
    it('should reject payment if Idempotency-Key is missing', async () => {
      const orgId = '75e0df79-d51d-4eb7-bebd-62e5b8d23d8c';
      const invId = '65e0df79-d51d-4eb7-bebd-62e5b8d23d8c';

      await expect(
        orgController.processPayment(orgId, invId, '', {
          paymentMethodId: 'pm_123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should map PaymentService output to PaymentResponseDto', async () => {
      const orgId = '75e0df79-d51d-4eb7-bebd-62e5b8d23d8c';
      const invId = '65e0df79-d51d-4eb7-bebd-62e5b8d23d8c';
      const key = 'idemp_key_123';

      mockPrisma.invoice.findFirstOrThrow.mockResolvedValue({
        id: invId,
        organizationId: orgId,
      });

      const mockPayment = {
        id: 'pay_123',
        invoiceId: invId,
        amount: { toString: () => '100' },
        currency: 'USD',
        status: PaymentStatus.SUCCESS,
        paidAt: new Date(),
      };

      mockPaymentService.processWalletPayment.mockResolvedValue(mockPayment);

      const result = await orgController.processPayment(orgId, invId, key, {
        paymentMethodId: 'pm_123',
      });

      expect(mockPaymentService.processWalletPayment).toHaveBeenCalledWith(
        invId,
        'pm_123',
        key,
      );
      expect(result.id).toBe('pay_123');
      expect(result.amount).toBe('100');
    });

    it('should return 422 if Wallet Settlement fails (PaymentFailedException)', () => {
      const filter = new BillingExceptionFilter();
      const mockJson = jest.fn();
      const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
      const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
      const mockHttpArgumentsHost = jest
        .fn()
        .mockReturnValue({ getResponse: mockGetResponse });
      const mockArgumentsHost = { switchToHttp: mockHttpArgumentsHost };

      const error = new PaymentFailedException('inv_123', 'Insufficient funds');

      filter.catch(error, mockArgumentsHost as any);

      expect(mockStatus).toHaveBeenCalledWith(422);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 422,
          error: 'PaymentFailedException',
        }),
      );
    });
  });
});

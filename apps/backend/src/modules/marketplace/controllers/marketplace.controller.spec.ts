import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceCatalogService } from '../services/marketplace-catalog.service';
import { AssignmentService } from '../services/assignment.service';
import { SubscriptionService } from '../services/subscription.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { SubscriptionOverlapException } from '../exceptions/marketplace.exceptions';
import { CreateSubscriptionDto, BillingCycle } from '../dto/marketplace.dto';

describe('MarketplaceController', () => {
  let controller: MarketplaceController;
  let subscriptionService: jest.Mocked<SubscriptionService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketplaceController],
      providers: [
        {
          provide: MarketplaceCatalogService,
          useValue: { getCatalogForOrganization: jest.fn() },
        },
        {
          provide: AssignmentService,
          useValue: { getActiveAssignments: jest.fn() },
        },
        {
          provide: SubscriptionService,
          useValue: { createSubscription: jest.fn() },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(PermissionGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MarketplaceController>(MarketplaceController);
    subscriptionService = module.get(SubscriptionService);
  });

  it('should propagate SubscriptionOverlapException to the ExceptionFilter boundary', async () => {
    const req = { user: { organization_id: 'org-1' } };
    const dto: CreateSubscriptionDto = {
      productId: 'prod-1',
      billingCycle: BillingCycle.MONTHLY,
    };

    // Simulate domain service throwing the business exception
    subscriptionService.createSubscription.mockRejectedValue(
      new SubscriptionOverlapException('org-1', 'prod-1'),
    );

    // Controller should NOT catch it, letting the MarketplaceExceptionFilter translate it to 409 Conflict
    await expect(controller.createSubscription(req, dto)).rejects.toThrow(
      SubscriptionOverlapException,
    );
  });

  it('should map the domain model returned by service to a Response DTO', async () => {
    const req = { user: { organization_id: 'org-1' } };
    const dto: CreateSubscriptionDto = {
      productId: 'prod-1',
      billingCycle: BillingCycle.MONTHLY,
    };

    const mockDomainSub = {
      id: 'sub-1',
      organizationId: 'org-1',
      productId: 'prod-1',
      status: 'ACTIVE' as const,
      billingCycle: 'MONTHLY' as const,
      effectiveFrom: new Date('2026-07-20T00:00:00.000Z'),
      effectiveUntil: null,
      createdAt: new Date('2026-07-20T00:00:00.000Z'),
      entitlements: [],
    };

    subscriptionService.createSubscription.mockResolvedValue(mockDomainSub);

    const result = await controller.createSubscription(req, dto);

    // Verify it is an instance of the DTO with mapped ISO strings
    expect(result.id).toEqual('sub-1');
    expect(result.effectiveFrom).toEqual('2026-07-20T00:00:00.000Z');
    expect(result.effectiveUntil).toBeNull();
  });
});

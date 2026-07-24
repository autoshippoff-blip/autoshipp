import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceCatalogService } from './marketplace-catalog.service';
import { PrismaService } from '../../../prisma.service';
import { ProductStatus } from '@prisma/client';

describe('MarketplaceCatalogService', () => {
  let service: MarketplaceCatalogService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplaceCatalogService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
            },
            subscription: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MarketplaceCatalogService>(MarketplaceCatalogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCatalogForOrganization', () => {
    it('should correctly map products and identify subscribed ones', async () => {
      const mockProducts = [
        {
          id: 'prod-1',
          code: 'P-1',
          name: 'Product 1',
          description: 'Desc 1',
          apiEndpoint: '/api/p1',
          status: ProductStatus.ACTIVE,
          createdAt: new Date(),
          category: { id: 'cat-1', code: 'C-1', name: 'Cat 1' },
          currentVersion: '1.0.0',
          editions: [{ code: 'STANDARD' }],
        },
        {
          id: 'prod-2',
          code: 'P-2',
          name: 'Product 2',
          description: 'Desc 2',
          apiEndpoint: '/api/p2',
          status: ProductStatus.ACTIVE,
          createdAt: new Date(),
          category: null,
          currentVersion: '2.0.0',
          editions: [],
        },
      ];

      const mockSubscriptions = [{ productId: 'prod-1' }];

      jest
        .spyOn(prisma.product, 'findMany')
        .mockResolvedValue(mockProducts as any);
      jest
        .spyOn(prisma.subscription, 'findMany')
        .mockResolvedValue(mockSubscriptions as any);

      const catalog = await service.getCatalogForOrganization('org-1');

      expect(catalog).toHaveLength(2);

      const p1 = catalog.find((c) => c.id === 'prod-1');
      expect(p1).toBeDefined();
      expect(p1?.isSubscribed).toBe(true);
      expect(p1?.category?.code).toBe('C-1');
      expect(p1?.currentEdition).toBe('STANDARD');

      const p2 = catalog.find((c) => c.id === 'prod-2');
      expect(p2).toBeDefined();
      expect(p2?.isSubscribed).toBe(false);
      expect(p2?.category).toBeNull();
      expect(p2?.currentEdition).toBeNull();
    });
  });
});

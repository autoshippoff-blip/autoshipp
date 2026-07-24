import { Test, TestingModule } from '@nestjs/testing';
import { ProductRegistryService } from './product-registry.service';
import { PrismaService } from '../../../prisma.service';
import { CreateProductDto } from '../dto/marketplace.dto';
import { ProductNotFoundException } from '../exceptions/marketplace.exceptions';
import { ProductStatus, Prisma } from '@prisma/client';

describe('ProductRegistryService', () => {
  let service: ProductRegistryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRegistryService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductRegistryService>(ProductRegistryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerProduct', () => {
    it('should successfully register a product with nested version and edition', async () => {
      const dto: CreateProductDto = {
        code: 'PROD-01',
        name: 'Test Product',
        categoryId: 'cat-1',
        initialVersion: '1.0.0',
        initialEditionCode: 'STANDARD',
      };

      const mockCreatedProduct = {
        id: 'prod-uuid',
        code: dto.code,
        name: dto.name,
        description: null,
        apiEndpoint: null,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
        category: { id: 'cat-1', code: 'CAT', name: 'Category' },
        currentVersion: '1.0.0',
        editions: [{ code: 'STANDARD' }],
      };

      jest
        .spyOn(prisma.product, 'create')
        .mockResolvedValue(mockCreatedProduct as any);

      const result = await service.registerProduct(dto);

      expect(prisma.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            code: dto.code,
            name: dto.name,
            categoryId: dto.categoryId,
            currentVersion: dto.initialVersion,
            versions: {
              create: [{ version: dto.initialVersion }],
            },
            editions: {
              create: [
                expect.objectContaining({
                  code: dto.initialEditionCode,
                }),
              ],
            },
          }),
        }),
      );

      expect(result.code).toBe(dto.code);
      expect(result.currentVersion).toBe(dto.initialVersion);
      expect(result.currentEdition).toBe(dto.initialEditionCode);
      expect(result.category).toBeDefined();
    });

    it('should rollback and throw if nested creation fails (e.g. missing categoryId)', async () => {
      const dto: CreateProductDto = {
        code: 'PROD-02',
        name: 'Failing Product',
        categoryId: 'invalid-cat',
        initialVersion: '1.0.0',
        initialEditionCode: 'STANDARD',
      };

      jest.spyOn(prisma.product, 'create').mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Foreign key constraint failed',
          {
            code: 'P2003',
            clientVersion: '1',
          },
        ),
      );

      await expect(service.registerProduct(dto)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });

    it('should throw if code is duplicate (P2002)', async () => {
      const dto: CreateProductDto = {
        code: 'DUP-01',
        name: 'Duplicate Product',
        categoryId: 'cat-1',
        initialVersion: '1.0.0',
        initialEditionCode: 'STANDARD',
      };

      jest.spyOn(prisma.product, 'create').mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '1',
        }),
      );

      await expect(service.registerProduct(dto)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
  });

  describe('updateProductMetadata', () => {
    it('should throw ProductNotFoundException if product does not exist', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      await expect(
        service.updateProductMetadata('invalid-id', { name: 'New Name' }),
      ).rejects.toThrow(ProductNotFoundException);
    });
  });
});

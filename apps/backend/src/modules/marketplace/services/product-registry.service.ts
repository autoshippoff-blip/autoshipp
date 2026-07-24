import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  ProductModel,
  ProductCategoryModel,
  ProductVersionModel,
  ProductEditionModel,
  ProductFeatureModel,
} from '../domain/marketplace.models';
import { ProductNotFoundException } from '../exceptions/marketplace.exceptions';
import {
  CreateProductDto,
  CreateProductCategoryDto,
  CreateProductVersionDto,
  CreateProductEditionDto,
  CreateProductFeatureDto,
} from '../dto/marketplace.dto';
import { ProductStatus } from '@prisma/client';

/**
 * ProductRegistryService (Marketplace & Licensing Domain)
 *
 * Responsibility: The authoritative inventory of AutoShipp products.
 * Usage: Intended for internal administrative use to manage the global catalog of products
 * available for subscription (e.g. Fit Intelligence, Delivery ETA).
 */
@Injectable()
export class ProductRegistryService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaProduct: any): ProductModel {
    return {
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description,
      version: prismaProduct.version,
      apiEndpoint: prismaProduct.apiEndpoint,
      status: prismaProduct.status,
      createdAt: prismaProduct.createdAt,
    };
  }

  async createCategory(
    dto: CreateProductCategoryDto,
  ): Promise<ProductCategoryModel> {
    return await this.prisma.productCategory.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async listCategories(): Promise<ProductCategoryModel[]> {
    return await this.prisma.productCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async registerProduct(dto: CreateProductDto): Promise<ProductModel> {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        categoryId: dto.categoryId,
        version: dto.version || '1.0.0',
        apiEndpoint: dto.apiEndpoint,
        status: ProductStatus.ACTIVE,
      },
    });
    return this.mapToDomain(product);
  }

  async updateProductMetadata(
    id: string,
    dto: Partial<CreateProductDto>,
  ): Promise<ProductModel> {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ProductNotFoundException(id);
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        categoryId: dto.categoryId,
        version: dto.version,
        apiEndpoint: dto.apiEndpoint,
      },
    });
    return this.mapToDomain(product);
  }

  async deprecateProduct(id: string): Promise<ProductModel> {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ProductNotFoundException(id);
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.DEPRECATED },
    });
    return this.mapToDomain(product);
  }

  async getAllProducts(
    includeDeprecated: boolean = false,
  ): Promise<ProductModel[]> {
    const whereClause = includeDeprecated
      ? {}
      : { status: ProductStatus.ACTIVE };
    const products = await this.prisma.product.findMany({ where: whereClause });
    return products.map(this.mapToDomain);
  }

  async addVersion(
    productId: string,
    dto: CreateProductVersionDto,
  ): Promise<ProductVersionModel> {
    return await this.prisma.productVersion.create({
      data: {
        productId,
        version: dto.version,
      },
    });
  }

  async addEdition(
    productId: string,
    dto: CreateProductEditionDto,
  ): Promise<ProductEditionModel> {
    return await this.prisma.productEdition.create({
      data: {
        productId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async addFeature(
    productId: string,
    dto: CreateProductFeatureDto,
  ): Promise<ProductFeatureModel> {
    return await this.prisma.productFeature.create({
      data: {
        productId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async assignFeatureToEdition(
    editionId: string,
    featureId: string,
  ): Promise<void> {
    await this.prisma.productFeatureAssignment.create({
      data: {
        editionId,
        featureId,
      },
    });
  }
}

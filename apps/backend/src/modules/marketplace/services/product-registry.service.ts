import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { ProductModel } from '../domain/marketplace.models';
import { ProductNotFoundException } from '../exceptions/marketplace.exceptions';
import { CreateProductDto } from '../dto/marketplace.dto';
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
      code: prismaProduct.code,
      name: prismaProduct.name,
      description: prismaProduct.description,
      apiEndpoint: prismaProduct.apiEndpoint,
      status: prismaProduct.status,
      createdAt: prismaProduct.createdAt,
      category: prismaProduct.category
        ? {
            id: prismaProduct.category.id,
            code: prismaProduct.category.code,
            name: prismaProduct.category.name,
          }
        : null,
      currentVersion: prismaProduct.currentVersion,
      currentEdition: prismaProduct.editions?.[0]?.code || null,
    };
  }

  async registerProduct(dto: CreateProductDto): Promise<ProductModel> {
    const product = await this.prisma.product.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        categoryId: dto.categoryId,
        currentVersion: dto.initialVersion,
        apiEndpoint: dto.apiEndpoint,
        status: ProductStatus.ACTIVE,
        versions: {
          create: [{ version: dto.initialVersion }],
        },
        editions: {
          create: [
            {
              code: dto.initialEditionCode,
              name: dto.initialEditionCode,
              sortOrder: 1,
              active: true,
            },
          ],
        },
      },
      include: {
        category: true,
        editions: true,
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
        apiEndpoint: dto.apiEndpoint,
      },
      include: {
        category: true,
        editions: true,
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
      include: {
        category: true,
        editions: true,
      },
    });
    return this.mapToDomain(product);
  }

  async getAllProducts(
    includeDeprecated: boolean = false,
  ): Promise<ProductModel[]> {
    const whereClause = includeDeprecated
      ? {}
      : { status: ProductStatus.ACTIVE };
    const products = await this.prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        editions: true,
      },
    });
    return products.map((p) => this.mapToDomain(p));
  }
}

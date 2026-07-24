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
      name: prismaProduct.name,
      description: prismaProduct.description,
      version: prismaProduct.version,
      apiEndpoint: prismaProduct.apiEndpoint,
      status: prismaProduct.status,
      createdAt: prismaProduct.createdAt,
    };
  }

  async registerProduct(dto: CreateProductDto): Promise<ProductModel> {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
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
}

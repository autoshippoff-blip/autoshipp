import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ProductRegistryService } from '../services/product-registry.service';
import {
  CreateProductDto,
  ProductResponseDto,
  CreateProductCategoryDto,
  CategoryResponseDto,
  CreateProductVersionDto,
  ProductVersionResponseDto,
  CreateProductEditionDto,
  ProductEditionResponseDto,
  CreateProductFeatureDto,
  ProductFeatureResponseDto,
} from '../dto/marketplace.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('admin/marketplace')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequirePermissions(PlatformPermission.REGISTRY_MANAGE)
export class AdminProductController {
  constructor(private readonly registryService: ProductRegistryService) {}

  @Post('categories')
  async createCategory(
    @Body() dto: CreateProductCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.registryService.createCategory(dto);
    return new CategoryResponseDto(category);
  }

  @Get('categories')
  async listCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.registryService.listCategories();
    return categories.map((c) => new CategoryResponseDto(c));
  }

  @Post('products')
  async registerProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.registerProduct(dto);
    return new ProductResponseDto(product);
  }

  @Patch('products/:id/metadata')
  async updateMetadata(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateProductDto>,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.updateProductMetadata(id, dto);
    return new ProductResponseDto(product);
  }

  @Patch('products/:id/deprecate')
  async deprecateProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.deprecateProduct(id);
    return new ProductResponseDto(product);
  }

  @Get('products')
  async listAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.registryService.getAllProducts(true);
    return products.map((p) => new ProductResponseDto(p));
  }

  @Post('products/:id/versions')
  async addVersion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateProductVersionDto,
  ): Promise<ProductVersionResponseDto> {
    const version = await this.registryService.addVersion(id, dto);
    return new ProductVersionResponseDto(version);
  }

  @Post('products/:id/editions')
  async addEdition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateProductEditionDto,
  ): Promise<ProductEditionResponseDto> {
    const edition = await this.registryService.addEdition(id, dto);
    return new ProductEditionResponseDto(edition);
  }

  @Post('products/:id/features')
  async addFeature(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateProductFeatureDto,
  ): Promise<ProductFeatureResponseDto> {
    const feature = await this.registryService.addFeature(id, dto);
    return new ProductFeatureResponseDto(feature);
  }

  @Post('editions/:editionId/features/:featureId')
  async mapFeature(
    @Param('editionId', ParseUUIDPipe) editionId: string,
    @Param('featureId', ParseUUIDPipe) featureId: string,
  ): Promise<void> {
    await this.registryService.assignFeatureToEdition(editionId, featureId);
  }
}

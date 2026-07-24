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
import { CreateProductDto, ProductResponseDto } from '../dto/marketplace.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('admin/marketplace/products')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequirePermissions(PlatformPermission.REGISTRY_MANAGE)
export class AdminProductController {
  constructor(private readonly registryService: ProductRegistryService) {}

  @Post()
  async registerProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.registerProduct(dto);
    return new ProductResponseDto(product);
  }

  @Patch(':id/metadata')
  async updateMetadata(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateProductDto>,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.updateProductMetadata(id, dto);
    return new ProductResponseDto(product);
  }

  @Patch(':id/deprecate')
  async deprecateProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    const product = await this.registryService.deprecateProduct(id);
    return new ProductResponseDto(product);
  }

  @Get()
  async listAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.registryService.getAllProducts(true);
    return products.map((p) => new ProductResponseDto(p));
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { MarketplaceCatalogService } from '../services/marketplace-catalog.service';
import { AssignmentService } from '../services/assignment.service';
import { SubscriptionService } from '../services/subscription.service';
import {
  CatalogResponseDto,
  AssignmentResponseDto,
  SubscriptionResponseDto,
  CreateSubscriptionDto,
  CategoryResponseDto,
} from '../dto/marketplace.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('marketplace/me')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class MarketplaceController {
  constructor(
    private readonly catalogService: MarketplaceCatalogService,
    private readonly assignmentService: AssignmentService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  private getOrgId(req: any): string {
    const orgId = req.user?.organization_id;
    if (!orgId) {
      throw new ForbiddenException(
        'User is not associated with an organization',
      );
    }
    return orgId;
  }

  @Get('categories')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async getCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.catalogService.getCategories();
    return categories.map((c) => new CategoryResponseDto(c));
  }

  @Get('catalog')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async getCatalog(
    @Request() req,
    @Query('categoryId') categoryId?: string,
  ): Promise<CatalogResponseDto[]> {
    const orgId = this.getOrgId(req);
    const items = await this.catalogService.getCatalogForOrganization(
      orgId,
      categoryId,
    );
    return items.map((item) => new CatalogResponseDto(item));
  }

  @Get('assignments')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async getAssignments(@Request() req): Promise<AssignmentResponseDto[]> {
    const orgId = this.getOrgId(req);
    const assignments =
      await this.assignmentService.getActiveAssignments(orgId);
    return assignments.map((a) => new AssignmentResponseDto(a));
  }

  @Post('subscriptions')
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async createSubscription(
    @Request() req,
    @Body() dto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const orgId = this.getOrgId(req);
    const subscription = await this.subscriptionService.createSubscription(
      orgId,
      dto,
    );
    return new SubscriptionResponseDto(subscription);
  }
}

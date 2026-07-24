import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MarketplaceCatalogService } from '../services/marketplace-catalog.service';
import { AssignmentService } from '../services/assignment.service';
import {
  CatalogResponseDto,
  AssignmentResponseDto,
  CreateAssignmentDto,
} from '../dto/marketplace.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { OrganizationGuard } from '../../auth/organization.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('organizations/:orgId/marketplace')
@UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
export class OrganizationMarketplaceController {
  constructor(
    private readonly catalogService: MarketplaceCatalogService,
    private readonly assignmentService: AssignmentService,
  ) {}

  @Get('catalog')
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async getCatalog(
    @Param('orgId', ParseUUIDPipe) orgId: string,
  ): Promise<CatalogResponseDto[]> {
    const items = await this.catalogService.getCatalogForOrganization(orgId);
    return items.map((item) => new CatalogResponseDto(item));
  }

  @Get('assignments')
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async getAssignments(
    @Param('orgId', ParseUUIDPipe) orgId: string,
  ): Promise<AssignmentResponseDto[]> {
    const assignments =
      await this.assignmentService.getActiveAssignments(orgId);
    return assignments.map((a) => new AssignmentResponseDto(a));
  }

  @Post('assignments')
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async assignSubscription(
    @Request() req,
    @Param('orgId', ParseUUIDPipe) targetOrgId: string,
    @Body('subscriptionId', ParseUUIDPipe) subscriptionId: string,
  ): Promise<AssignmentResponseDto> {
    const assignerUserId = req.user.id;
    // The user's org is assigning to the targetOrg
    const assignerOrgId = req.user.organization_id;

    const assignment = await this.assignmentService.assignProduct(
      subscriptionId,
      targetOrgId,
      assignerUserId,
      assignerOrgId,
    );
    return new AssignmentResponseDto(assignment);
  }

  @Delete('assignments/:subscriptionId')
  @RequirePermissions(PlatformPermission.MARKETPLACE_MANAGE)
  async revokeAssignment(
    @Request() req,
    @Param('orgId', ParseUUIDPipe) targetOrgId: string,
    @Param('subscriptionId', ParseUUIDPipe) subscriptionId: string,
  ): Promise<void> {
    const assignerOrgId = req.user.organization_id;
    await this.assignmentService.revokeAssignment(
      subscriptionId,
      targetOrgId,
      assignerOrgId,
    );
  }
}

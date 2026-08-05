import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { BillingService } from '../services/billing.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PlatformRoleGuard } from '../../auth/platform-role.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';
import {
  CreatePlanDto,
  CreatePlanPriceDto,
  PlanResponseDto,
  PlanPriceResponseDto,
  InvoiceResponseDto,
} from '../dtos/billing.dtos';
import {
  GracePeriodOverrideDto,
  SuspendAccessDto,
} from '../dtos/lifecycle.dto';
import { BillingDtoMapper } from '../mappers/billing.mapper';
import { BillingExceptionFilter } from '../filters/billing-exception.filter';
import { SubscriptionLifecycleService } from '../services/subscription-lifecycle.service';

@Controller('admin/billing')
@UseGuards(JwtAuthGuard, PlatformRoleGuard, PermissionGuard)
@UseFilters(BillingExceptionFilter)
export class AdminBillingController {
  constructor(
    private readonly planService: PlanService,
    private readonly billingService: BillingService,
    private readonly lifecycleService: SubscriptionLifecycleService,
  ) {}

  @Post('plans')
  @RequirePermissions(PlatformPermission.BILLING_PLAN_CREATE)
  async createPlan(@Body() dto: CreatePlanDto): Promise<PlanResponseDto> {
    const plan = await this.planService.createPlan(dto);
    return BillingDtoMapper.toPlanResponse(plan);
  }

  @Post('plans/:planId/prices')
  @RequirePermissions(PlatformPermission.BILLING_PLAN_UPDATE)
  async addPlanPrice(
    @Param('planId', ParseUUIDPipe) planId: string,
    @Body() dto: CreatePlanPriceDto,
  ): Promise<PlanPriceResponseDto> {
    const price = await this.planService.addPlanPrice(planId, dto);
    return BillingDtoMapper.toPlanPriceResponse(price);
  }

  @Get('plans/:planId/prices')
  @RequirePermissions(PlatformPermission.BILLING_PLAN_READ)
  async getPlanPrices(
    @Param('planId', ParseUUIDPipe) planId: string,
  ): Promise<PlanPriceResponseDto[]> {
    const prices = await this.planService.getPlanPrices(planId);
    return prices.map((p) => BillingDtoMapper.toPlanPriceResponse(p));
  }

  @Post('invoices/:invoiceId/issue')
  @RequirePermissions(PlatformPermission.BILLING_INVOICE_ISSUE)
  async issueInvoice(
    @Param('invoiceId', ParseUUIDPipe) invoiceId: string,
  ): Promise<InvoiceResponseDto> {
    const invoice = await this.billingService.issueInvoice(invoiceId);
    return BillingDtoMapper.toInvoiceResponse(invoice);
  }

  @Post('subscriptions/:subscriptionId/grace-period-override')
  @RequirePermissions(PlatformPermission.BILLING_MANAGE_LIFECYCLE)
  async setGracePeriodOverride(
    @Param('subscriptionId', ParseUUIDPipe) subscriptionId: string,
    @Body() dto: GracePeriodOverrideDto,
  ): Promise<{ status: string; gracePeriodEndsAt: Date }> {
    const gracePeriodEndsAt = await this.lifecycleService.overrideGracePeriod(
      subscriptionId,
      dto.days,
    );
    return { status: 'OVERRIDE_PERSISTED', gracePeriodEndsAt };
  }

  @Post('subscriptions/:subscriptionId/suspend')
  @RequirePermissions(PlatformPermission.BILLING_MANAGE_LIFECYCLE)
  async suspendAccess(
    @Param('subscriptionId', ParseUUIDPipe) subscriptionId: string,
    @Body() dto: SuspendAccessDto,
  ): Promise<{ status: string }> {
    await this.lifecycleService.suspendSubscription(subscriptionId, dto.reason);
    return { status: 'SUSPENDED' };
  }

  @Post('subscriptions/:subscriptionId/restore')
  @RequirePermissions(PlatformPermission.BILLING_MANAGE_LIFECYCLE)
  async restoreAccess(
    @Param('subscriptionId', ParseUUIDPipe) subscriptionId: string,
  ): Promise<{ status: string }> {
    await this.lifecycleService.restoreSubscription(subscriptionId);
    return { status: 'RESTORED' };
  }
}

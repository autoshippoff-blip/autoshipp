import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  ParseUUIDPipe,
  UseGuards,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { BillingService } from '../services/billing.service';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { OrganizationGuard } from '../../auth/organization.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';
import {
  ProcessPaymentDto,
  InvoiceResponseDto,
  PaymentResponseDto,
} from '../dtos/billing.dtos';
import { BillingDtoMapper } from '../mappers/billing.mapper';
import { BillingExceptionFilter } from '../filters/billing-exception.filter';

@Controller('organizations/:orgId/billing')
@UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
@UseFilters(BillingExceptionFilter)
export class OrganizationBillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly paymentService: PaymentService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('invoices')
  @RequirePermissions(PlatformPermission.BILLING_READ)
  async getInvoices(
    @Param('orgId', ParseUUIDPipe) organizationId: string,
  ): Promise<InvoiceResponseDto[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { organizationId },
      include: { items: true },
      orderBy: { issueDate: 'desc' },
    });
    return invoices.map((inv) => BillingDtoMapper.toInvoiceResponse(inv));
  }

  @Get('invoices/:invoiceId')
  @RequirePermissions(PlatformPermission.BILLING_READ)
  async getInvoice(
    @Param('orgId', ParseUUIDPipe) organizationId: string,
    @Param('invoiceId', ParseUUIDPipe) invoiceId: string,
  ): Promise<InvoiceResponseDto> {
    const invoice = await this.prisma.invoice.findFirstOrThrow({
      where: { id: invoiceId, organizationId },
      include: { items: true },
    });
    return BillingDtoMapper.toInvoiceResponse(invoice);
  }

  @Post('invoices/:invoiceId/payments')
  @RequirePermissions(PlatformPermission.BILLING_PAY)
  async processPayment(
    @Param('orgId', ParseUUIDPipe) organizationId: string,
    @Param('invoiceId', ParseUUIDPipe) invoiceId: string,
    @Headers('Idempotency-Key') idempotencyKey: string,
    @Body() dto: ProcessPaymentDto,
  ): Promise<PaymentResponseDto> {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    // Verify invoice belongs to the organization
    await this.prisma.invoice.findFirstOrThrow({
      where: { id: invoiceId, organizationId },
    });

    const payment = await this.paymentService.processWalletPayment(
      invoiceId,
      dto.paymentMethodId,
      idempotencyKey,
    );

    return BillingDtoMapper.toPaymentResponse(payment);
  }
}

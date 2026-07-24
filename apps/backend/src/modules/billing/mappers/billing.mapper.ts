import { Plan, PlanPrice, Invoice, InvoiceItem, Payment } from '@prisma/client';
import {
  PlanResponseDto,
  PlanPriceResponseDto,
  InvoiceResponseDto,
  InvoiceItemResponseDto,
  PaymentResponseDto,
} from '../dtos/billing.dtos';

export class BillingDtoMapper {
  static toPlanResponse(
    plan: Plan & { prices?: PlanPrice[] },
  ): PlanResponseDto {
    return {
      id: plan.id,
      productId: plan.productId,
      code: plan.code,
      name: plan.name,
      active: plan.active,
      prices: plan.prices
        ? plan.prices.map(this.toPlanPriceResponse)
        : undefined,
    };
  }

  static toPlanPriceResponse(price: PlanPrice): PlanPriceResponseDto {
    return {
      id: price.id,
      currency: price.currency,
      billingCycle: price.billingCycle,
      amount: price.amount.toString(),
      effectiveFrom: price.effectiveFrom,
      effectiveTo: price.effectiveTo,
    };
  }

  static toInvoiceResponse(
    invoice: Invoice & { items?: InvoiceItem[] },
  ): InvoiceResponseDto {
    return {
      id: invoice.id,
      organizationId: invoice.organizationId,
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status,
      subtotal: invoice.subtotal.toString(),
      taxTotal: invoice.taxTotal.toString(),
      discountTotal: invoice.discountTotal.toString(),
      grandTotal: invoice.grandTotal.toString(),
      currency: invoice.currency,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      items: invoice.items
        ? invoice.items.map(this.toInvoiceItemResponse)
        : undefined,
    };
  }

  static toInvoiceItemResponse(item: InvoiceItem): InvoiceItemResponseDto {
    return {
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toString(),
      total: item.total.toString(),
    };
  }

  static toPaymentResponse(payment: Payment): PaymentResponseDto {
    return {
      id: payment.id,
      invoiceId: payment.invoiceId,
      amount: payment.amount.toString(),
      currency: payment.currency,
      status: payment.status,
      paidAt: payment.paidAt,
    };
  }
}

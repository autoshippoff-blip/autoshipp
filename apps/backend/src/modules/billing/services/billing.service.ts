import {
  PrismaClient,
  Invoice,
  InvoiceStatus,
  SubscriptionItem,
  InvoiceItem,
} from '@prisma/client';
import { Prisma } from '@prisma/client';
const Decimal = Prisma.Decimal;
import {
  InvalidInvoiceStateException,
  InvoiceAlreadyIssuedException,
} from '../exceptions/billing.exceptions';
import { BillingCalculator } from '../domain/billing.calculator';

export class BillingService {
  constructor(private readonly prisma: PrismaClient) {}

  async createSubscriptionItem(dto: {
    subscriptionId: string;
    planPriceId: string;
    quantity: number;
    metadata?: any;
  }): Promise<SubscriptionItem> {
    const planPrice = await this.prisma.planPrice.findUniqueOrThrow({
      where: { id: dto.planPriceId },
      include: { plan: true },
    });

    return this.prisma.subscriptionItem.create({
      data: {
        subscriptionId: dto.subscriptionId,
        planPriceId: dto.planPriceId,
        quantity: dto.quantity,
        unitPrice: planPrice.amount,
        metadata: dto.metadata || {},
      },
    });
  }

  async generateDraftInvoice(
    organizationId: string,
    itemsDto: { subscriptionItemId: string; organizationId: string }[],
    currency: string,
  ): Promise<Invoice> {
    return this.prisma.$transaction(async (tx) => {
      // Resolve items and calculate totals
      const resolvedItems = await Promise.all(
        itemsDto.map(async (item) => {
          const subItem = await tx.subscriptionItem.findUniqueOrThrow({
            where: { id: item.subscriptionItemId },
            include: { planPrice: { include: { plan: true } } },
          });

          return {
            subscriptionItemId: subItem.id,
            organizationId: item.organizationId,
            description: `${subItem.planPrice.plan.name} - ${subItem.planPrice.billingCycle}`,
            quantity: subItem.quantity,
            unitPrice: subItem.unitPrice,
            total: new Decimal(subItem.unitPrice.toString()).mul(
              subItem.quantity,
            ),
          };
        }),
      );

      const subtotal = BillingCalculator.calculateSubtotal(resolvedItems);
      // For now, tax and discounts are zero as per scope
      const tax = new Decimal(0);
      const discount = new Decimal(0);
      const grandTotal = BillingCalculator.calculateGrandTotal(
        subtotal,
        tax,
        discount,
      );

      // We use a temporary invoice number, it gets assigned properly on issueInvoice
      const tempInvoiceNumber = `TEMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      return tx.invoice.create({
        data: {
          organizationId,
          invoiceNumber: tempInvoiceNumber,
          subtotal,
          taxTotal: tax,
          discountTotal: discount,
          grandTotal,
          currency,
          status: InvoiceStatus.DRAFT,
          items: {
            create: resolvedItems.map((item) => ({
              organizationId: item.organizationId,
              subscriptionItemId: item.subscriptionItemId,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total,
            })),
          },
        },
        include: { items: true },
      });
    });
  }

  async issueInvoice(invoiceId: string): Promise<Invoice> {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Lock invoice for update
        const invoices = await tx.$queryRaw<Invoice[]>`
        SELECT * FROM "invoices" 
        WHERE "id" = ${invoiceId}::uuid 
        FOR UPDATE
      `;

        const invoice = invoices[0];
        if (!invoice) {
          throw new Error('Invoice not found');
        }

        if (invoice.status !== InvoiceStatus.DRAFT) {
          throw new InvoiceAlreadyIssuedException(invoiceId);
        }

        // 2. Generate sequential number via a simple counter table or simulated sequence
        // In a real PG sequence: await tx.$queryRaw`SELECT nextval('invoice_seq')`
        // For Phase 2, we simulate this by querying the max sequence or using a generic approach:
        const year = new Date().getFullYear();

        // Simple count-based sequence under lock (Not scalable across multiple years without where clause, but suffices for Phase 2 validation)
        const lockRes = await tx.$queryRaw<
          { count: bigint }[]
        >`SELECT count(*) as count FROM "invoices" WHERE "status" != 'DRAFT' AND "invoice_number" LIKE ${'INV-' + year + '-%'}`;
        const nextNum = Number(lockRes[0].count) + 1;
        const invoiceNumber = `INV-${year}-${nextNum.toString().padStart(4, '0')}`;

        // 3. Update invoice
        const updated = await tx.invoice.update({
          where: { id: invoiceId },
          data: {
            status: InvoiceStatus.ISSUED,
            invoiceNumber,
            issueDate: new Date(),
          },
        });

        return updated;
      },
      { maxWait: 15000, timeout: 15000 },
    );
  }
}

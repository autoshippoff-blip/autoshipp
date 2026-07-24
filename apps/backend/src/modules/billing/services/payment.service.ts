import {
  PrismaClient,
  InvoiceStatus,
  PaymentStatus,
  PaymentProvider,
  Payment,
} from '@prisma/client';
import { Prisma } from '@prisma/client';
const Decimal = Prisma.Decimal;
import {
  DuplicatePaymentException,
  InvalidInvoiceStateException,
  InvalidPaymentAmountException,
  PaymentFailedException,
} from '../exceptions/billing.exceptions';
import { BillingCalculator } from '../domain/billing.calculator';
import { WalletSettlementPort } from '../domain/wallet-settlement.port';

export class PaymentService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly walletSettlementPort: WalletSettlementPort,
  ) {}

  async processWalletPayment(
    invoiceId: string,
    paymentMethodId: string,
    idempotencyKey: string,
  ): Promise<Payment> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Idempotency Check
      const existingPayment = await tx.payment.findFirst({
        where: { providerReference: idempotencyKey },
      });
      if (existingPayment) {
        if (existingPayment.status === PaymentStatus.SUCCESS) {
          return existingPayment;
        }
        throw new DuplicatePaymentException(idempotencyKey);
      }

      // 2. Lock Invoice
      const invoice = await tx.invoice.findUnique({
        where: { id: invoiceId },
        include: { payments: { where: { status: PaymentStatus.SUCCESS } } },
      });

      if (!invoice) throw new Error('Invoice not found');

      // Validate State
      if (
        !(
          [
            InvoiceStatus.ISSUED,
            InvoiceStatus.PARTIALLY_PAID,
            InvoiceStatus.OVERDUE,
          ] as InvoiceStatus[]
        ).includes(invoice.status)
      ) {
        throw new InvalidInvoiceStateException(
          invoiceId,
          invoice.status,
          'PAID',
        );
      }

      // Calculate Remaining Balance
      const successfulPayments = invoice.payments.map((p) => p.amount);
      const remainingBalance = BillingCalculator.calculateRemainingBalance(
        invoice.grandTotal,
        successfulPayments,
      );

      if (remainingBalance.lte(0)) {
        throw new InvalidPaymentAmountException(
          invoiceId,
          remainingBalance.toNumber(),
          remainingBalance.toNumber(),
        );
      }

      // We attempt full payment of the remaining balance with the wallet
      const paymentAmount = remainingBalance;

      // 3. Call WalletSettlementPort (Mocking the external boundary inside this transaction context)
      const settlement = await this.walletSettlementPort.debitBalance(
        invoice.organizationId,
        paymentAmount.toNumber(),
        invoice.currency,
        invoice.invoiceNumber,
        idempotencyKey,
      );

      if (!settlement.success) {
        throw new PaymentFailedException(
          invoiceId,
          settlement.reason || 'Wallet debit failed',
        );
      }

      // 4. Create Payment Record
      const payment = await tx.payment.create({
        data: {
          invoiceId,
          paymentMethodId,
          amount: paymentAmount,
          currency: invoice.currency,
          providerReference: idempotencyKey,
          paidAt: new Date(),
          status: PaymentStatus.SUCCESS,
        },
      });

      // 5. Update Invoice Status
      // Re-calculate after this payment
      const newRemaining = BillingCalculator.calculateRemainingBalance(
        invoice.grandTotal,
        [...successfulPayments, paymentAmount],
      );

      const newStatus = newRemaining.lte(0)
        ? InvoiceStatus.PAID
        : InvoiceStatus.PARTIALLY_PAID;

      await tx.invoice.update({
        where: { id: invoiceId },
        data: { status: newStatus },
      });

      return payment;
    });
  }

  async reconcileExternalPayment(
    invoiceId: string,
    provider: PaymentProvider,
    providerReference: string,
    amount: number,
    currency: string,
  ): Promise<Payment> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Idempotency Check
      const existingPayment = await tx.payment.findFirst({
        where: { providerReference },
      });
      if (existingPayment) {
        if (existingPayment.status === PaymentStatus.SUCCESS) {
          return existingPayment;
        }
        throw new DuplicatePaymentException(providerReference);
      }

      // 2. Lock Invoice
      const invoice = await tx.invoice.findUnique({
        where: { id: invoiceId },
        include: { payments: { where: { status: PaymentStatus.SUCCESS } } },
      });

      if (!invoice) throw new Error(`Invoice ${invoiceId} not found`);

      // Calculate Remaining Balance
      const successfulPayments = invoice.payments.map((p) => p.amount);
      const remainingBalance = BillingCalculator.calculateRemainingBalance(
        invoice.grandTotal,
        successfulPayments,
      );

      const paymentAmount = new Decimal(amount);

      // Ensure we have a PaymentMethod for this provider and organization
      let paymentMethod = await tx.paymentMethod.findFirst({
        where: { organizationId: invoice.organizationId, provider },
      });

      if (!paymentMethod) {
        paymentMethod = await tx.paymentMethod.create({
          data: {
            organizationId: invoice.organizationId,
            provider,
            active: true,
            isDefault: false,
          },
        });
      }

      // 3. Create Payment Record
      const payment = await tx.payment.create({
        data: {
          invoiceId,
          paymentMethodId: paymentMethod.id,
          amount: paymentAmount,
          currency,
          providerReference,
          paidAt: new Date(),
          status: PaymentStatus.SUCCESS,
        },
      });

      // 4. Update Invoice Status
      const newRemaining = BillingCalculator.calculateRemainingBalance(
        invoice.grandTotal,
        [...successfulPayments, paymentAmount],
      );

      const newStatus = newRemaining.lte(0)
        ? InvoiceStatus.PAID
        : InvoiceStatus.PARTIALLY_PAID;

      await tx.invoice.update({
        where: { id: invoiceId },
        data: { status: newStatus },
      });

      return payment;
    });
  }
}

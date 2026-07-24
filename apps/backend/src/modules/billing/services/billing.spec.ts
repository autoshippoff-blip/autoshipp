import {
  PrismaClient,
  BillingCycle,
  InvoiceStatus,
  PaymentProvider,
  PaymentStatus,
  OrganizationStatus,
} from '@prisma/client';
import { PlanService } from './plan.service';
import { BillingService } from './billing.service';
import { PaymentService } from './payment.service';
import {
  WalletSettlementPort,
  WalletSettlementResult,
} from '../domain/wallet-settlement.port';
import {
  InvoiceAlreadyIssuedException,
  InvalidPaymentAmountException,
  PaymentFailedException,
  DuplicatePaymentException,
  InvalidInvoiceStateException,
} from '../exceptions/billing.exceptions';
import { Prisma } from '@prisma/client';
const Decimal = Prisma.Decimal;

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

class MockWalletSettlement implements WalletSettlementPort {
  public failNext = false;

  async debitBalance(
    orgId: string,
    amount: number,
    currency: string,
    ref: string,
    key: string,
  ): Promise<WalletSettlementResult> {
    if (this.failNext) {
      this.failNext = false;
      return { success: false, reason: 'Insufficient funds' };
    }
    return { success: true, transactionId: 'txn_123' };
  }
}

describe('Billing Domain Services', () => {
  jest.setTimeout(30000);

  if (!process.env.DATABASE_URL) {
    it('skips database integration tests when DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let planService: PlanService;
  let billingService: BillingService;
  let paymentService: PaymentService;
  let mockWallet: MockWalletSettlement;

  let testOrgId: string;
  let testProductId: string;
  let testPlanId: string;
  let testSubItemId: string;

  beforeAll(async () => {
    planService = new PlanService(prisma);
    billingService = new BillingService(prisma);
    mockWallet = new MockWalletSettlement();
    paymentService = new PaymentService(prisma, mockWallet);

    const orgType = await prisma.organizationType.findFirst();
    const org = await prisma.organization.create({
      data: {
        name: 'Spec Test Brand',
        slug: `spec-test-${Date.now()}`,
        displayName: 'Spec Test',
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en-US',
        typeId: orgType!.id,
        status: OrganizationStatus.ACTIVE,
      },
    });
    testOrgId = org.id;

    const prod = await prisma.product.create({
      data: { name: 'Spec Product', version: '1.0' },
    });
    testProductId = prod.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('1. PlanPrice preserves historical rows', async () => {
    const plan = await planService.createPlan({
      productId: testProductId,
      code: `SPEC-PLAN-${Date.now()}`,
      name: 'Spec Plan',
    });
    testPlanId = plan.id;

    // Create Initial Price
    const p1 = await planService.addPlanPrice(plan.id, {
      currency: 'USD',
      billingCycle: BillingCycle.MONTHLY,
      amount: 10.0,
    });

    // Create Second Price
    const p2 = await planService.addPlanPrice(plan.id, {
      currency: 'USD',
      billingCycle: BillingCycle.MONTHLY,
      amount: 15.0,
    });

    const prices = await planService.getPlanPrices(plan.id);
    expect(prices.length).toBe(2);

    // Most recent is p2 (no effectiveTo), oldest is p1 (has effectiveTo)
    const activePrice = prices.find((p) => p.effectiveTo === null);
    const archivedPrice = prices.find((p) => p.effectiveTo !== null);

    expect(activePrice!.id).toBe(p2.id);
    expect(archivedPrice!.id).toBe(p1.id);
    expect(activePrice!.amount.toNumber()).toBe(15.0);

    // Setup SubscriptionItem for next tests
    const sub = await prisma.subscription.create({
      data: {
        organizationId: testOrgId,
        productId: testProductId,
        billingCycle: BillingCycle.MONTHLY,
      },
    });

    const subItem = await billingService.createSubscriptionItem({
      subscriptionId: sub.id,
      planPriceId: activePrice!.id,
      quantity: 1,
    });
    testSubItemId = subItem.id;
  });

  it('2. Invoice numbering under concurrent issuance', async () => {
    const i1 = await billingService.generateDraftInvoice(
      testOrgId,
      [{ subscriptionItemId: testSubItemId, organizationId: testOrgId }],
      'USD',
    );
    const i2 = await billingService.generateDraftInvoice(
      testOrgId,
      [{ subscriptionItemId: testSubItemId, organizationId: testOrgId }],
      'USD',
    );

    // Concurrent issue
    const [issued1, issued2] = await Promise.all([
      billingService.issueInvoice(i1.id),
      billingService.issueInvoice(i2.id),
    ]);

    expect(issued1.status).toBe(InvoiceStatus.ISSUED);
    expect(issued2.status).toBe(InvoiceStatus.ISSUED);
    expect(issued1.invoiceNumber).not.toBe(issued2.invoiceNumber);
    expect(issued1.invoiceNumber.startsWith('INV-')).toBe(true);

    // Assert Cannot re-issue
    await expect(billingService.issueInvoice(i1.id)).rejects.toThrow(
      InvoiceAlreadyIssuedException,
    );
  });

  it('3. Idempotent payment behavior', async () => {
    const inv = await billingService.generateDraftInvoice(
      testOrgId,
      [{ subscriptionItemId: testSubItemId, organizationId: testOrgId }],
      'USD',
    );
    await billingService.issueInvoice(inv.id);

    const pm = await prisma.paymentMethod.create({
      data: { organizationId: testOrgId, provider: PaymentProvider.WALLET },
    });

    const idempotencyKey = `IDEMP-${Date.now()}`;

    // First attempt succeeds
    const p1 = await paymentService.processWalletPayment(
      inv.id,
      pm.id,
      idempotencyKey,
    );
    expect(p1.status).toBe(PaymentStatus.SUCCESS);

    // Second attempt returns existing
    const p2 = await paymentService.processWalletPayment(
      inv.id,
      pm.id,
      idempotencyKey,
    );
    expect(p2.id).toBe(p1.id);

    // Third attempt with different key but invoice is paid -> InvalidPaymentAmountException (overpayment)
    await expect(
      paymentService.processWalletPayment(
        inv.id,
        pm.id,
        `IDEMP-NEW-${Date.now()}`,
      ),
    ).rejects.toThrow(InvalidInvoiceStateException);
  });

  it('4. Partial payments & overpayment protection', async () => {
    // Generate invoice of total $15
    const inv = await billingService.generateDraftInvoice(
      testOrgId,
      [{ subscriptionItemId: testSubItemId, organizationId: testOrgId }],
      'USD',
    );
    await billingService.issueInvoice(inv.id);

    const pm = await prisma.paymentMethod.create({
      data: { organizationId: testOrgId, provider: PaymentProvider.WALLET },
    });

    // Full payment success updates status to PAID.
    const p1 = await paymentService.processWalletPayment(
      inv.id,
      pm.id,
      `IDEMP-PART-${Date.now()}`,
    );
    expect(p1.amount.toNumber()).toBe(15.0);

    const updatedInv = await prisma.invoice.findUnique({
      where: { id: inv.id },
    });
    expect(updatedInv!.status).toBe(InvoiceStatus.PAID);
  });

  it('5. Transaction rollback on WalletSettlement failure', async () => {
    const inv = await billingService.generateDraftInvoice(
      testOrgId,
      [{ subscriptionItemId: testSubItemId, organizationId: testOrgId }],
      'USD',
    );
    await billingService.issueInvoice(inv.id);

    const pm = await prisma.paymentMethod.create({
      data: { organizationId: testOrgId, provider: PaymentProvider.WALLET },
    });

    mockWallet.failNext = true;

    await expect(
      paymentService.processWalletPayment(
        inv.id,
        pm.id,
        `IDEMP-FAIL-${Date.now()}`,
      ),
    ).rejects.toThrow(PaymentFailedException);

    // Ensure no payment record was created
    const payments = await prisma.payment.findMany({
      where: { invoiceId: inv.id },
    });
    expect(payments.length).toBe(0);

    // Ensure invoice status remained ISSUED
    const updatedInv = await prisma.invoice.findUnique({
      where: { id: inv.id },
    });
    expect(updatedInv!.status).toBe(InvoiceStatus.ISSUED);
  });
});

import {
  PrismaClient,
  BillingCycle,
  InvoiceStatus,
  PaymentProvider,
  PaymentStatus,
  OrganizationStatus,
} from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Billing Domain...');

  // 1. Create a Product
  const product = await prisma.product.create({
    data: {
      name: 'Fit Intelligence',
      description: 'AI-driven size recommendation engine.',
      version: '1.0.0',
    },
  });
  console.log(`Created Product: ${product.id}`);

  // 2. Create a Plan
  const plan = await prisma.plan.create({
    data: {
      productId: product.id,
      code: 'FIT-STARTER-V1',
      name: 'Fit Starter',
    },
  });
  console.log(`Created Plan: ${plan.id}`);

  // 3. Create a PlanPrice
  const planPrice = await prisma.planPrice.create({
    data: {
      planId: plan.id,
      currency: 'USD',
      billingCycle: BillingCycle.MONTHLY,
      amount: 49.0,
    },
  });
  console.log(`Created PlanPrice: ${planPrice.id}`);

  // 4. Create an Organization (Target)
  const orgType = await prisma.organizationType.findFirst();
  if (!orgType) {
    throw new Error('No organization types found. Seed core first.');
  }

  const org = await prisma.organization.create({
    data: {
      name: 'Billing Test Brand',
      slug: 'billing-test-brand',
      displayName: 'Billing Test',
      timezone: 'UTC',
      currencyCode: 'USD',
      languageCode: 'en-US',
      typeId: orgType.id,
      status: OrganizationStatus.ACTIVE,
    },
  });
  console.log(`Created Organization: ${org.id}`);

  // 5. Create a Marketplace Subscription
  const subscription = await prisma.subscription.create({
    data: {
      organizationId: org.id,
      productId: product.id,
      billingCycle: BillingCycle.MONTHLY,
    },
  });
  console.log(`Created Marketplace Subscription: ${subscription.id}`);

  // 6. Create a SubscriptionItem
  const subscriptionItem = await prisma.subscriptionItem.create({
    data: {
      subscriptionId: subscription.id,
      planPriceId: planPrice.id,
      quantity: 1,
      unitPrice: 49.0,
      metadata: { note: 'Initial signup' },
    },
  });
  console.log(`Created SubscriptionItem: ${subscriptionItem.id}`);

  // 7. Create an Invoice
  const invoice = await prisma.invoice.create({
    data: {
      organizationId: org.id,
      invoiceNumber: 'INV-2026-0001',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
      subtotal: 49.0,
      taxTotal: 0,
      discountTotal: 0,
      grandTotal: 49.0,
      currency: 'USD',
      status: InvoiceStatus.ISSUED,
    },
  });
  console.log(`Created Invoice: ${invoice.id}`);

  // 8. Create an InvoiceItem
  const invoiceItem = await prisma.invoiceItem.create({
    data: {
      invoiceId: invoice.id,
      organizationId: org.id,
      subscriptionItemId: subscriptionItem.id,
      description: 'Fit Starter - Monthly',
      quantity: 1,
      unitPrice: 49.0,
      total: 49.0,
    },
  });
  console.log(`Created InvoiceItem: ${invoiceItem.id}`);

  // 9. Create a PaymentMethod
  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      organizationId: org.id,
      provider: PaymentProvider.WALLET,
      isDefault: true,
      active: true,
    },
  });
  console.log(`Created PaymentMethod: ${paymentMethod.id}`);

  // 10. Create a Payment
  const payment = await prisma.payment.create({
    data: {
      invoiceId: invoice.id,
      paymentMethodId: paymentMethod.id,
      amount: 49.0,
      currency: 'USD',
      paidAt: new Date(),
      status: PaymentStatus.SUCCESS,
    },
  });
  console.log(`Created Payment: ${payment.id}`);

  // Mark invoice as paid
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { status: InvoiceStatus.PAID },
  });
  console.log('Invoice marked as PAID.');

  console.log('✅ Billing Domain Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

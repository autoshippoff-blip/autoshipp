import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding products...');

  const category = await prisma.productCategory.upsert({
    where: { code: 'core' },
    update: {},
    create: {
      code: 'core',
      name: 'Core Services',
      sortOrder: 1,
    }
  });

  const products = [
    { code: 'saas-a', name: 'SaaS Tool A', description: 'Our flagship product', ownerService: 'core', categoryId: category.id },
    { code: 'saas-b', name: 'SaaS Tool B', description: 'Our secondary product', ownerService: 'core', categoryId: category.id },
    { code: 'analytics', name: 'Analytics Pro', description: 'Advanced analytics tool', ownerService: 'analytics', categoryId: category.id },
  ];

  for (const p of products) {
    const created = await prisma.product.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    });
    console.log(`Created product: ${created.name}`);
  }

  // Optionally create a super admin if none exists
  const superAdminEmail = 'admin@autoshipp.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });
  if (!existingAdmin) {
    console.log('Creating default super_admin...');
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('superadmin123', 10);
    const user = await prisma.user.create({
      data: {
        email: superAdminEmail,
        passwordHash: hash,
        firstName: 'Super',
        lastName: 'Admin',
        status: 'ACTIVE',
      },
    });
    // Create an organization and membership to establish role context
    const orgType = await prisma.organizationType.upsert({
      where: { code: 'PLATFORM' },
      update: {},
      create: {
        code: 'PLATFORM',
        displayName: 'Platform Administrator',
      },
    });

    const org = await prisma.organization.create({
      data: {
        name: 'AutoShipp Root Platform',
        slug: 'autoshipp-root',
        displayName: 'AutoShipp',
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en-US',
        typeId: orgType.id,
      },
    });
    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: org.id,
        status: 'ACTIVE',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

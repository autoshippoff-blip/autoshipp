import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');

  const products = [
    { name: 'SaaS Tool A', description: 'Our flagship product' },
    { name: 'SaaS Tool B', description: 'Our secondary product' },
    { name: 'Analytics Pro', description: 'Advanced analytics tool' },
  ];

  for (const p of products) {
    const created = await prisma.product.create({
      data: p,
    });
    console.log(`Created product: ${created.name}`);
  }

  // Optionally create a super admin if none exists
  const superAdminEmail = 'admin@autoshipp.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: superAdminEmail } });
  if (!existingAdmin) {
    console.log('Creating default super_admin...');
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('superadmin123', 10);
    await prisma.user.create({
      data: {
        email: superAdminEmail,
        passwordHash: hash,
        name: 'Super Admin',
        role: 'super_admin',
        status: 'active',
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

import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Marketplace Products...');

  const products = [
    {
      name: 'Fit Intelligence',
      description: 'AI-driven size recommendations to reduce returns.',
      version: '1.0.0',
      apiEndpoint: '/api/v1/fit-intelligence',
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Delivery ETA',
      description: 'Machine learning based predictive delivery estimates.',
      version: '1.0.0',
      apiEndpoint: '/api/v1/delivery-eta',
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Returns',
      description: 'Automated return orchestration and routing.',
      version: '1.0.0',
      apiEndpoint: '/api/v1/returns',
      status: ProductStatus.ACTIVE,
    },
  ];

  for (const productData of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: productData.name, version: productData.version },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: productData,
      });
      console.log(
        `Created product: ${productData.name} v${productData.version}`,
      );
    } else {
      console.log(
        `Product already exists: ${productData.name} v${productData.version}`,
      );
    }
  }

  console.log('Marketplace seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

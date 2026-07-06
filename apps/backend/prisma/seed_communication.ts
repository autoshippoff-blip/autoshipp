import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding communication data...');

  const org = await prisma.organization.findFirst();

  if (!org) {
    console.error(
      'No organization found to seed communication data. Please run default seed first.',
    );
    return;
  }

  // Create a template
  const template = await prisma.communicationTemplate.create({
    data: {
      organizationId: org.id,
      name: 'seasonal_sale_01',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      components: [
        { type: 'HEADER', text: 'Summer Sale!' },
        { type: 'BODY', text: 'Get 50% off on all items.' },
      ],
    },
  });
  console.log(`Created template: ${template.name}`);

  // Create a campaign
  const campaign = await prisma.communicationCampaign.create({
    data: {
      organizationId: org.id,
      templateId: template.id,
      name: 'Summer Sale Blast',
      type: 'CSV_UPLOAD',
      status: 'COMPLETED',
      sentCount: 100,
      deliveredCount: 95,
      readCount: 80,
      failedCount: 5,
    },
  });
  console.log(`Created campaign: ${campaign.name}`);

  // Create conversations and messages
  const phones = ['919876543210', '919876543211'];
  for (const phone of phones) {
    const conversation = await prisma.communicationConversation.create({
      data: {
        organizationId: org.id,
        phoneNumber: phone,
        lastMessage: 'Great! We will ship it today.',
        lastMessageTime: new Date(),
        messageCount: 2,
      },
    });

    await prisma.communicationMessage.createMany({
      data: [
        {
          conversationId: conversation.id,
          direction: 'INBOUND',
          status: 'READ',
          content: 'Hi, when will my order ship?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        },
        {
          conversationId: conversation.id,
          direction: 'OUTBOUND',
          status: 'DELIVERED',
          content: 'Great! We will ship it today.',
          timestamp: new Date(),
        },
      ],
    });
    console.log(`Created conversation for: ${phone}`);
  }

  console.log('Communication seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

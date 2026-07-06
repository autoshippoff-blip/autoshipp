import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCampaignDto, CreateTemplateDto } from './dto/communication.dto';

@Injectable()
export class CommunicationService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardWhatsApp(tenantId: string) {
    const campaigns = await this.prisma.communicationCampaign.findMany({
      where: { organizationId: tenantId },
      select: {
        status: true,
        sentCount: true,
        deliveredCount: true,
        readCount: true,
        failedCount: true,
      },
    });

    let QUEUED = 0,
      SENT = 0,
      DELIVERED = 0,
      READ = 0,
      FAILED = 0;

    for (const c of campaigns) {
      if (c.status === 'QUEUED') QUEUED++;
      SENT += c.sentCount;
      DELIVERED += c.deliveredCount;
      READ += c.readCount;
      FAILED += c.failedCount;
    }

    return { QUEUED, SENT, DELIVERED, READ, FAILED };
  }

  async getDashboardCalls(tenantId: string) {
    // Tabbly integration is not yet implemented. Return zeroed stats.
    return {
      INITIATED: 0,
      ANSWERED: 0,
      COMPLETED: 0,
      NO_ANSWER: 0,
      FAILED: 0,
    };
  }

  async getRecentActivity(tenantId: string, limit: number = 20) {
    const messages = await this.prisma.communicationMessage.findMany({
      where: {
        conversation: {
          organizationId: tenantId,
        },
      },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        conversation: true,
      },
    });

    return messages.map((m) => ({
      type: 'whatsapp',
      id: m.id,
      recipient: m.conversation.phoneNumber,
      status: m.status,
      messageType: m.direction === 'OUTBOUND' ? 'GENERAL' : 'INBOUND',
      timestamp: m.timestamp,
    }));
  }

  async getCampaigns(tenantId: string) {
    const campaigns = await this.prisma.communicationCampaign.findMany({
      where: { organizationId: tenantId },
      include: {
        template: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return campaigns.map((c) => ({
      campaignId: c.id,
      name: c.name,
      templateName: c.template?.name || 'Unknown',
      status: c.status,
      stats: {
        total: c.sentCount + c.failedCount,
        sent: c.sentCount,
        delivered: c.deliveredCount,
        read: c.readCount,
        failed: c.failedCount,
      },
    }));
  }

  async getTemplates(tenantId: string) {
    return this.prisma.communicationTemplate.findMany({
      where: { organizationId: tenantId },
      select: {
        name: true,
        category: true,
        status: true,
        language: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInboxCustomers(tenantId: string) {
    return this.prisma.communicationConversation.findMany({
      where: { organizationId: tenantId },
      select: {
        phoneNumber: true,
        lastMessage: true,
        lastMessageTime: true,
        messageCount: true,
      },
      orderBy: { lastMessageTime: 'desc' },
    });
  }

  async getChatHistory(tenantId: string, phone: string) {
    const conversation = await this.prisma.communicationConversation.findUnique(
      {
        where: {
          organizationId_phoneNumber: {
            organizationId: tenantId,
            phoneNumber: phone,
          },
        },
        include: {
          messages: {
            orderBy: { timestamp: 'asc' },
          },
        },
      },
    );

    if (!conversation) {
      return [];
    }

    return conversation.messages.map((m) => ({
      type: m.direction === 'OUTBOUND' ? 'outbound' : 'inbound',
      status: m.status,
      text: m.direction === 'INBOUND' ? m.content : undefined,
      content: m.direction === 'OUTBOUND' ? m.content : undefined,
      timestamp: m.timestamp,
    }));
  }

  // Note: Campaign creation currently references template names instead of template IDs.
  // This is a temporary compatibility measure to match the current frontend API contract
  // documented in feature_two_api_documentation.md.
  // Once the frontend is updated to track and pass template IDs, this should be refactored.
  async createCampaign(tenantId: string, payload: CreateCampaignDto) {
    if (!payload.name || !payload.templateName || !payload.type) {
      throw new BadRequestException('Missing required fields');
    }

    const template = await this.prisma.communicationTemplate.findUnique({
      where: {
        organizationId_name: {
          organizationId: tenantId,
          name: payload.templateName,
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    if (template.status !== 'APPROVED') {
      throw new BadRequestException(
        'Cannot create a campaign from an unapproved template',
      );
    }

    const campaign = await this.prisma.communicationCampaign.create({
      data: {
        organizationId: tenantId,
        templateId: template.id,
        name: payload.name,
        type: payload.type,
        status: 'QUEUED',
      },
    });

    return { success: true, campaignId: campaign.id };
  }

  async createTemplate(tenantId: string, payload: CreateTemplateDto) {
    if (
      !payload.name ||
      !payload.category ||
      !payload.language ||
      !payload.components
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const template = await this.prisma.communicationTemplate.create({
      data: {
        organizationId: tenantId,
        name: payload.name,
        category: payload.category,
        language: payload.language,
        components: payload.components,
        status: 'PENDING',
      },
    });

    return { success: true, templateId: template.id };
  }

  async sendMessage(tenantId: string, phone: string, message: string) {
    if (!phone || !message) {
      throw new BadRequestException('Phone and message are required');
    }

    let conversation = await this.prisma.communicationConversation.findUnique({
      where: {
        organizationId_phoneNumber: {
          organizationId: tenantId,
          phoneNumber: phone,
        },
      },
    });

    if (!conversation) {
      conversation = await this.prisma.communicationConversation.create({
        data: {
          organizationId: tenantId,
          phoneNumber: phone,
          lastMessage: message,
          lastMessageTime: new Date(),
          messageCount: 1,
        },
      });
    } else {
      conversation = await this.prisma.communicationConversation.update({
        where: { id: conversation.id },
        data: {
          lastMessage: message,
          lastMessageTime: new Date(),
          messageCount: { increment: 1 },
        },
      });
    }

    const msg = await this.prisma.communicationMessage.create({
      data: {
        conversationId: conversation.id,
        direction: 'OUTBOUND',
        status: 'QUEUED',
        content: message,
      },
    });

    return { success: true, messageId: msg.id };
  }
}

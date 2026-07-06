import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateCampaignDto,
  CreateTemplateDto,
  SendMessageDto,
} from './dto/communication.dto';

@Controller('communication')
@UseGuards(JwtAuthGuard)
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get('analytics/whatsapp')
  async getDashboardWhatsApp(@Request() req) {
    const data = await this.communicationService.getDashboardWhatsApp(
      req.user.tenantId,
    );
    return { success: true, data };
  }

  @Get('analytics/calls')
  async getDashboardCalls(@Request() req) {
    const data = await this.communicationService.getDashboardCalls(
      req.user.tenantId,
    );
    return { success: true, data };
  }

  @Get('analytics/activity')
  async getRecentActivity(@Request() req, @Query('limit') limitStr?: string) {
    const limit = limitStr ? parseInt(limitStr, 10) : 20;
    const data = await this.communicationService.getRecentActivity(
      req.user.tenantId,
      limit,
    );
    return { success: true, data };
  }

  @Get('campaigns')
  async getCampaigns(@Request() req) {
    const data = await this.communicationService.getCampaigns(
      req.user.tenantId,
    );
    return { success: true, data };
  }

  @Post('campaigns')
  async createCampaign(@Request() req, @Body() payload: CreateCampaignDto) {
    return this.communicationService.createCampaign(req.user.tenantId, payload);
  }

  @Get('templates')
  async getTemplates(@Request() req) {
    const data = await this.communicationService.getTemplates(
      req.user.tenantId,
    );
    return { success: true, data };
  }

  @Post('templates')
  async createTemplate(@Request() req, @Body() payload: CreateTemplateDto) {
    return this.communicationService.createTemplate(req.user.tenantId, payload);
  }

  @Get('inbox')
  async getInboxCustomers(@Request() req) {
    const data = await this.communicationService.getInboxCustomers(
      req.user.tenantId,
    );
    return { success: true, data };
  }

  @Get('inbox/chat/:phone')
  async getChatHistory(@Request() req, @Param('phone') phone: string) {
    const data = await this.communicationService.getChatHistory(
      req.user.tenantId,
      phone,
    );
    return { success: true, data };
  }

  @Post('inbox/send')
  async sendMessage(@Request() req, @Body() payload: SendMessageDto) {
    return this.communicationService.sendMessage(
      req.user.tenantId,
      payload.phone,
      payload.message,
    );
  }
}

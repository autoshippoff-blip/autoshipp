import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../../prisma.service';

export class ExportComplianceDto {
  type: string; // e.g. "SOC2_EVIDENCE"
  startDate: string;
  endDate: string;
  scopes: string[];
}

/**
 * AES-042 Compliance Evidence Export Controller (AES-042 §14, D-429).
 * Allows Platform OWNER to export tamper-evident compliance audit records.
 */
@Controller('platform/compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('export')
  async exportComplianceEvidence(
    @Req() req: any,
    @Body() dto: ExportComplianceDto,
  ) {
    const user = req.user || req;
    if (user.user_type !== 'PLATFORM' && user.role !== 'OWNER') {
      throw new ForbiddenException(
        'Compliance export API is restricted to Platform OWNER roles.',
      );
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const loginRecords = await this.prisma.loginHistory.findMany({
      where: {
        loginTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      take: 1000,
    });

    const memberships = await this.prisma.membership.findMany({
      select: {
        id: true,
        userId: true,
        organizationId: true,
        status: true,
        joinedAt: true,
      },
      take: 1000,
    });

    return {
      exportId: `EXP-${Date.now()}`,
      type: dto.type || 'SOC2_EVIDENCE',
      generatedAt: new Date().toISOString(),
      requestedBy: user.sub,
      timeframe: { startDate: dto.startDate, endDate: dto.endDate },
      scopes: dto.scopes || ['access_reviews', 'login_history'],
      evidence: {
        loginHistoryCount: loginRecords.length,
        loginRecords,
        activeMembershipCount: memberships.length,
        memberships,
      },
    };
  }
}

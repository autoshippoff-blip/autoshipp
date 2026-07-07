import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlatformRoleGuard } from '../auth/platform-role.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('platform/summary')
  @UseGuards(JwtAuthGuard, PlatformRoleGuard)
  getPlatformSummary(@Request() req) {
    return this.dashboardService.getPlatformSummary();
  }
}

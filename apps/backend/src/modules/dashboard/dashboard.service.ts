import { Injectable } from '@nestjs/common';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly usersService: UsersService,
  ) {}

  async getPlatformSummary() {
    const [organizationCount, userCount, recentOrganizations] =
      await Promise.all([
        this.organizationsService.countAll(),
        this.usersService.countAll(),
        this.organizationsService.getRecent(5),
      ]);

    return {
      kpis: {
        organizationCount,
        userCount,
      },
      recentOrganizations,
    };
  }
}

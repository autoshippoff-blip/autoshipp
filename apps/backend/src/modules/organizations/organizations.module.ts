import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRelationshipsController } from './organization-relationships.controller';
import { OrganizationRelationshipsService } from './organization-relationships.service';
import { PrismaService } from '../../prisma.service';

import { ComplianceController } from './compliance.controller';

@Module({
  controllers: [
    OrganizationsController,
    OrganizationRelationshipsController,
    ComplianceController,
  ],
  providers: [
    OrganizationsService,
    OrganizationRelationshipsService,
    PrismaService,
  ],
  exports: [OrganizationsService, OrganizationRelationshipsService],
})
export class OrganizationsModule {}

import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRelationshipsController } from './organization-relationships.controller';
import { OrganizationRelationshipsService } from './organization-relationships.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [OrganizationsController, OrganizationRelationshipsController],
  providers: [
    OrganizationsService,
    OrganizationRelationshipsService,
    PrismaService,
  ],
  exports: [OrganizationsService, OrganizationRelationshipsService],
})
export class OrganizationsModule {}

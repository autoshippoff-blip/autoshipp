import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrganizationRelationshipsService } from './organization-relationships.service';
import { CreateOrganizationRelationshipDto } from './dto/create-organization-relationship.dto';
import { TransferOrganizationRelationshipDto } from './dto/transfer-organization-relationship.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlatformRoleGuard } from '../auth/platform-role.guard';

@Controller('organizations')
@UseGuards(JwtAuthGuard, PlatformRoleGuard)
export class OrganizationRelationshipsController {
  constructor(
    private readonly relationshipsService: OrganizationRelationshipsService,
  ) {}

  @Post(':id/relationships')
  createRelationship(
    @Param('id') id: string, // Not strictly used for create, since parent/child are in DTO, but could be useful if routing implies it. Assuming DTO has both.
    @Body() createDto: CreateOrganizationRelationshipDto,
    @Request() req,
  ) {
    // If we wanted to enforce that the route ID is the child, we could overwrite createDto.childOrganizationId = id
    return this.relationshipsService.createRelationship(
      id,
      createDto,
      req.user.id,
    );
  }

  @Post(':id/transfer')
  transferRelationship(
    @Param('id') organizationId: string,
    @Body() transferDto: TransferOrganizationRelationshipDto,
    @Request() req,
  ) {
    return this.relationshipsService.transferRelationship(
      organizationId,
      transferDto,
      req.user.id,
    );
  }

  @Delete(':id/relationships/:relationshipId')
  deactivateRelationship(
    @Param('relationshipId') relationshipId: string,
    @Request() req,
  ) {
    return this.relationshipsService.deactivateRelationship(
      relationshipId,
      req.user.id,
    );
  }
}

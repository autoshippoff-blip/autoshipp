import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get('types')
  getOrganizationTypes() {
    return this.organizationsService.getOrganizationTypes();
  }

  @Post()
  create(@Body() createDto: CreateOrganizationDto, @Request() req) {
    return this.organizationsService.create(createDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.organizationsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.organizationsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrganizationDto,
    @Request() req,
  ) {
    return this.organizationsService.update(id, updateDto, req.user.id);
  }
}

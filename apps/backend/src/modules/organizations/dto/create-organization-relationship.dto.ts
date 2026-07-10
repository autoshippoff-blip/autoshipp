import {
  IsUUID,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { RelationshipType } from '@prisma/client';

export class CreateOrganizationRelationshipDto {
  @IsUUID()
  parentOrganizationId: string;

  @IsEnum(RelationshipType)
  relationshipType: RelationshipType;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsDateString()
  @IsOptional()
  validFrom?: string;

  @IsDateString()
  @IsOptional()
  validTo?: string;
}

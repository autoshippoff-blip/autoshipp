import { IsUUID, IsOptional, IsString } from 'class-validator';

export class TransferOrganizationRelationshipDto {
  @IsUUID()
  newParentId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

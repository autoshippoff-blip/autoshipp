import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEnum,
  Matches,
  MaxLength,
} from 'class-validator';

export enum CampaignType {
  CSV_UPLOAD = 'CSV_UPLOAD',
  MANUAL = 'MANUAL',
  API = 'API',
}

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  templateName: string;

  @IsEnum(CampaignType)
  type: string;

  @IsArray()
  audience: any[];
}

export enum TemplateCategory {
  MARKETING = 'MARKETING',
  UTILITY = 'UTILITY',
  AUTHENTICATION = 'AUTHENTICATION',
}

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEnum(TemplateCategory)
  category: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  language: string;

  @IsArray()
  @IsNotEmpty()
  components: any[];
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,15}$/, {
    message:
      'Phone number must contain only digits and be between 10 and 15 characters long',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  message: string;
}

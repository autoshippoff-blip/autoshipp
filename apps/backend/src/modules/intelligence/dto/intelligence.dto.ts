import { IsString, IsOptional } from 'class-validator';

export class TriggerScanDto {
  @IsOptional()
  @IsString()
  storeId?: string;
}

export class ScorecardResponseDto {
  id: string;
  organizationId: string;
  storeId: string | null;
  overallScore: number;
  businessScore: number;
  technicalScore: number;
  marketingScore: number;
  securityScore: number;
  operationsScore: number;
  calculatedAt: string;

  constructor(model: any) {
    this.id = model.id;
    this.organizationId = model.organizationId;
    this.storeId = model.storeId;
    this.overallScore = model.overallScore;
    this.businessScore = model.businessScore;
    this.technicalScore = model.technicalScore;
    this.marketingScore = model.marketingScore;
    this.securityScore = model.securityScore;
    this.operationsScore = model.operationsScore;
    this.calculatedAt = model.calculatedAt.toISOString();
  }
}

export class ReportResponseDto {
  id: string;
  organizationId: string;
  storeId: string | null;
  title: string;
  executiveSummary: string;
  opportunitiesJson: any;
  productRecommendations: any;
  tokenUsage: number;
  createdAt: string;

  constructor(model: any) {
    this.id = model.id;
    this.organizationId = model.organizationId;
    this.storeId = model.storeId;
    this.title = model.title;
    this.executiveSummary = model.executiveSummary;
    this.opportunitiesJson = model.opportunitiesJson;
    this.productRecommendations = model.productRecommendations;
    this.tokenUsage = model.tokenUsage;
    this.createdAt = model.createdAt.toISOString();
  }
}

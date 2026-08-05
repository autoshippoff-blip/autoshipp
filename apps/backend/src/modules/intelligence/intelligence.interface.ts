/**
 * AES-040 Public Interface Contract for Intelligence Domain Module
 */
export interface IIntelligenceScorerService {
  computeScore(organizationId: string): Promise<any>;
}

export interface IExecutiveReportService {
  generateReport(organizationId: string): Promise<any>;
}

export const INTELLIGENCE_SCORER_INTERFACE = Symbol(
  'IIntelligenceScorerService',
);
export const EXECUTIVE_REPORT_INTERFACE = Symbol('IExecutiveReportService');

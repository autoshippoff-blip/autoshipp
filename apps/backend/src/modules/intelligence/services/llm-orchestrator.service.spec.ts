import { LlmOrchestratorService } from './llm-orchestrator.service';

describe('LlmOrchestratorService', () => {
  let service: LlmOrchestratorService;

  beforeEach(() => {
    service = new LlmOrchestratorService();
  });

  describe('PII Scrubbing', () => {
    it('should strip customer PII (names, emails, phones, addresses) from payload', () => {
      const rawData = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+1234567890',
        shippingAddress: '123 Main St',
        totalOrders: 10,
        codRejectionRate: 25,
      };

      const scrubbed = service.scrubPii(rawData);

      expect(scrubbed.customerName).toBeUndefined();
      expect(scrubbed.customerEmail).toBeUndefined();
      expect(scrubbed.customerPhone).toBeUndefined();
      expect(scrubbed.shippingAddress).toBeUndefined();
      expect(scrubbed.totalOrders).toEqual(10);
      expect(scrubbed.codRejectionRate).toEqual(25);
    });
  });

  describe('Rule-Based Fallback Engine', () => {
    it('should fallback to Rule-Based Engine when no LLM API key is present', async () => {
      const metrics = {
        totalOrders: 20,
        totalGmv: 5000,
        aov: 250,
        codPendingCount: 5,
        codRejectionRate: 25.0,
        unfulfilledCount: 2,
        avgFulfillmentDelayDays: 3.5,
      };

      const result = await service.generateExecutiveSummary(
        'Test Brand',
        metrics,
        500,
      );

      expect(result.providerUsed).toEqual('rule-based-template-engine');
      expect(result.tokenUsage).toEqual(0);
      expect(result.executiveSummary).toContain(
        'Executive Summary for Test Brand',
      );
      expect(result.executiveSummary).toContain('25%');
    });
  });
});

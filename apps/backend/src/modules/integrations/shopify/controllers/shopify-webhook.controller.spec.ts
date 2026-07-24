import { Test, TestingModule } from '@nestjs/testing';
import { ShopifyWebhookController } from './shopify-webhook.controller';
import { ShopifyWebhookService } from '../services/shopify-webhook.service';

describe('ShopifyWebhookController', () => {
  let controller: ShopifyWebhookController;
  let webhookService: jest.Mocked<ShopifyWebhookService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopifyWebhookController],
      providers: [
        {
          provide: ShopifyWebhookService,
          useValue: {
            processWebhook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShopifyWebhookController>(ShopifyWebhookController);
    webhookService = module.get(ShopifyWebhookService);
  });

  it('should process webhook and return success status', async () => {
    const req = { rawBody: '{"id":123}' };
    const hmacHeader = 'valid_hmac';
    const topic = 'orders/create';
    const shopDomain = 'test.myshopify.com';
    const webhookId = 'evt-12345';
    const payload = { id: 123 };

    webhookService.processWebhook.mockResolvedValue({
      processed: true,
      duplicate: false,
      webhookId,
    });

    const result = await controller.handleWebhook(
      req,
      hmacHeader,
      topic,
      shopDomain,
      webhookId,
      payload,
    );

    expect(result.status).toEqual('success');
    expect(result.webhookId).toEqual(webhookId);
    expect(result.duplicate).toBe(false);
  });
});

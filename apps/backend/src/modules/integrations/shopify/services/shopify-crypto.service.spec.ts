import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ShopifyCryptoService } from './shopify-crypto.service';
import * as crypto from 'crypto';

describe('ShopifyCryptoService', () => {
  let service: ShopifyCryptoService;
  const clientSecret = 'test_shopify_client_secret_key';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-jwt-secret-key',
        }),
      ],
      providers: [ShopifyCryptoService],
    }).compile();

    service = module.get<ShopifyCryptoService>(ShopifyCryptoService);
  });

  describe('HMAC Webhook Verification', () => {
    it('should return true for a valid webhook HMAC signature', () => {
      const payload = JSON.stringify({ id: 123, topic: 'orders/create' });
      const rawBody = Buffer.from(payload);
      const validHmac = crypto
        .createHmac('sha256', clientSecret)
        .update(rawBody)
        .digest('base64');

      const isValid = service.verifyWebhookHmac(
        rawBody,
        validHmac,
        clientSecret,
      );
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid HMAC signature', () => {
      const rawBody = Buffer.from('test payload');
      const invalidHmac = 'invalid_hmac_signature_base64';

      const isValid = service.verifyWebhookHmac(
        rawBody,
        invalidHmac,
        clientSecret,
      );
      expect(isValid).toBe(false);
    });
  });

  describe('AES-256-GCM Token Cipher', () => {
    it('should encrypt and correctly decrypt an access token', () => {
      const plainToken = 'shpat_live_test_access_token_1234567890';
      const encrypted = service.encryptToken(plainToken);

      expect(encrypted).not.toEqual(plainToken);
      expect(encrypted).toContain(':');

      const decrypted = service.decryptToken(encrypted);
      expect(decrypted).toEqual(plainToken);
    });
  });

  describe('OAuth State Tokens', () => {
    it('should generate and verify a valid state JWT token', () => {
      const orgId = 'org-uuid-12345';
      const userId = 'user-uuid-67890';

      const token = service.generateStateToken(orgId, userId);
      expect(token).toBeDefined();

      const decoded = service.verifyStateToken(token);
      expect(decoded.organizationId).toEqual(orgId);
      expect(decoded.userId).toEqual(userId);
      expect(decoded.nonce).toBeDefined();
    });
  });
});

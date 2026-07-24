import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

export interface OAuthStatePayload {
  organizationId: string;
  userId: string;
  nonce: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class ShopifyCryptoService {
  private readonly encryptionKey: Buffer;

  constructor(private readonly jwtService: JwtService) {
    const rawKey =
      process.env.ENCRYPTION_SECRET ||
      'autoshipp_default_secure_encryption_key_32bytes!';
    // Ensure key is exactly 32 bytes for AES-256-GCM
    this.encryptionKey = crypto.createHash('sha256').update(rawKey).digest();
  }

  /**
   * Generates a cryptographically signed state token for OAuth CSRF protection.
   */
  generateStateToken(organizationId: string, userId: string): string {
    const nonce = crypto.randomBytes(16).toString('hex');
    const payload: OAuthStatePayload = {
      organizationId,
      userId,
      nonce,
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  /**
   * Verifies and decodes the OAuth state token.
   */
  verifyStateToken(token: string): OAuthStatePayload {
    try {
      return this.jwtService.verify<OAuthStatePayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired OAuth state token');
    }
  }

  /**
   * Verifies the HMAC signature of inbound Shopify webhook HTTP requests.
   */
  verifyWebhookHmac(
    rawBody: Buffer | string,
    hmacHeader: string,
    clientSecret: string,
  ): boolean {
    if (!rawBody || !hmacHeader || !clientSecret) {
      return false;
    }
    const computedHmac = crypto
      .createHmac('sha256', clientSecret)
      .update(rawBody)
      .digest('base64');

    const digestBuffer = Buffer.from(computedHmac, 'utf8');
    const headerBuffer = Buffer.from(hmacHeader, 'utf8');

    if (digestBuffer.length !== headerBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(digestBuffer, headerBuffer);
  }

  /**
   * Verifies the HMAC signature of Shopify OAuth callback query parameters.
   */
  verifyOAuthCallbackHmac(
    queryParams: Record<string, any>,
    clientSecret: string,
  ): boolean {
    const { hmac, signature, ...rest } = queryParams;
    if (!hmac || !clientSecret) {
      return false;
    }

    const message = Object.keys(rest)
      .sort()
      .map((key) => `${key}=${rest[key]}`)
      .join('&');

    const computedHmac = crypto
      .createHmac('sha256', clientSecret)
      .update(message)
      .digest('hex');

    const digestBuffer = Buffer.from(computedHmac, 'utf8');
    const headerBuffer = Buffer.from(hmac, 'utf8');

    if (digestBuffer.length !== headerBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(digestBuffer, headerBuffer);
  }

  /**
   * Encrypts plain text (e.g. access tokens) using AES-256-GCM.
   */
  encryptToken(plainText: string): string {
    const iv = crypto.randomBytes(12); // 96-bit IV for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts AES-256-GCM encrypted tokens.
   */
  decryptToken(encryptedText: string): string {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted token format');
    }
    const [ivHex, authTagHex, encryptedDataHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      this.encryptionKey,
      iv,
    );
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedDataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

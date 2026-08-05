import { SetMetadata } from '@nestjs/common';

export const DEPRECATED_ENDPOINT_KEY = 'DEPRECATED_ENDPOINT_KEY';

export interface DeprecationOptions {
  sunsetDate?: string; // e.g. '2028-01-01T00:00:00Z'
  migrationUrl?: string;
}

/**
 * Marks a controller or endpoint as deprecated per AES-041 §5 (D-414).
 */
export const DeprecatedEndpoint = (options?: DeprecationOptions) =>
  SetMetadata(DEPRECATED_ENDPOINT_KEY, options || {});

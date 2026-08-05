import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  GoneException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  DEPRECATED_ENDPOINT_KEY,
  DeprecationOptions,
} from '../decorators/deprecated-endpoint.decorator';

/**
 * Injects Deprecation, Sunset, Link, and X-Deprecated-Endpoint HTTP headers (AES-041 §5, D-414).
 * Returns 410 Gone when current date exceeds the sunset threshold.
 */
@Injectable()
export class DeprecationInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.getAllAndOverride<DeprecationOptions>(
      DEPRECATED_ENDPOINT_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (options) {
      const response = context.switchToHttp().getResponse();
      const now = new Date();

      if (options.sunsetDate) {
        const sunset = new Date(options.sunsetDate);
        if (now >= sunset) {
          throw new GoneException({
            statusCode: 410,
            message: 'Endpoint has been sunset and is no longer available.',
            migrationUrl:
              options.migrationUrl || 'https://docs.autoshipp.in/api/migration',
          });
        }
        if (response && typeof response.setHeader === 'function') {
          response.setHeader('Sunset', sunset.toUTCString());
        }
      }

      if (response && typeof response.setHeader === 'function') {
        response.setHeader('Deprecation', 'true');
        response.setHeader('X-Deprecated-Endpoint', 'true');
        if (options.migrationUrl) {
          response.setHeader(
            'Link',
            `<${options.migrationUrl}>; rel="successor-version"`,
          );
        }
      }
    }

    return next.handle();
  }
}

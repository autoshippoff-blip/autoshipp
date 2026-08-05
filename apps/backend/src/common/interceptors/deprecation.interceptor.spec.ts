import { ExecutionContext, CallHandler, GoneException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { of } from 'rxjs';
import { DeprecationInterceptor } from './deprecation.interceptor';
import { DEPRECATED_ENDPOINT_KEY } from '../decorators/deprecated-endpoint.decorator';

describe('DeprecationInterceptor (AES-041 §5, D-414)', () => {
  let interceptor: DeprecationInterceptor;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    interceptor = new DeprecationInterceptor(reflector);
  });

  it('should inject Deprecation and Sunset headers when endpoint is marked deprecated', (done) => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue({
      sunsetDate: futureDate.toISOString(),
      migrationUrl: 'https://docs.autoshipp.in/api/migration/v1-to-v2',
    });

    const setHeaderMock = jest.fn();
    const contextMock = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getResponse: () => ({ setHeader: setHeaderMock }),
      }),
    } as unknown as ExecutionContext;

    const callHandlerMock: CallHandler = {
      handle: () => of({ success: true }),
    };

    interceptor.intercept(contextMock, callHandlerMock).subscribe(() => {
      expect(setHeaderMock).toHaveBeenCalledWith('Deprecation', 'true');
      expect(setHeaderMock).toHaveBeenCalledWith(
        'X-Deprecated-Endpoint',
        'true',
      );
      expect(setHeaderMock).toHaveBeenCalledWith(
        'Link',
        '<https://docs.autoshipp.in/api/migration/v1-to-v2>; rel="successor-version"',
      );
      expect(setHeaderMock).toHaveBeenCalledWith('Sunset', expect.any(String));
      done();
    });
  });

  it('should throw GoneException (410) when current date exceeds sunsetDate threshold', () => {
    const pastDate = '2020-01-01T00:00:00Z';

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue({
      sunsetDate: pastDate,
      migrationUrl: 'https://docs.autoshipp.in/api/migration/v1-to-v2',
    });

    const contextMock = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getResponse: () => ({ setHeader: jest.fn() }),
      }),
    } as unknown as ExecutionContext;

    const callHandlerMock: CallHandler = {
      handle: () => of({ success: true }),
    };

    expect(() => interceptor.intercept(contextMock, callHandlerMock)).toThrow(
      GoneException,
    );
  });
});

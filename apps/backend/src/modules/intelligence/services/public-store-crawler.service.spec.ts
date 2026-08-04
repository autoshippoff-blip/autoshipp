import { Test, TestingModule } from '@nestjs/testing';
import { PublicStoreCrawlerService } from './public-store-crawler.service';

// Mocks
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe('PublicStoreCrawlerService', () => {
  let service: PublicStoreCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicStoreCrawlerService],
    }).compile();

    service = module.get<PublicStoreCrawlerService>(PublicStoreCrawlerService);
    // Mock the DNS/IP validation to avoid actual DNS lookups in tests,
    // unless testing the blocked IPs explicitly.
    jest.spyOn(service, 'validateDomainAndIp').mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return fallback if no domain is provided', async () => {
    const result = await service.collectSignals('');
    expect(result.errorReason).toBe('NO_DOMAIN_CONFIGURED');
    expect(result.isHttps).toBe(false);
  });

  it('should return fallback for invalid URL format', async () => {
    const result = await service.collectSignals('invalid url with spaces');
    expect(result.errorReason).toBe('INVALID_URL_FORMAT');
  });

  it('should return fallback if SSRF validation fails', async () => {
    jest.spyOn(service, 'validateDomainAndIp').mockResolvedValue(false);
    const result = await service.collectSignals('internal.server.local');
    expect(result.errorReason).toBe('BLOCKED_BY_SSRF_PROTECTION');
  });

  it('should parse valid HTML and extract signals', async () => {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta property="og:title" content="My Store">
          <script type="application/ld+json">{}</script>
        </head>
      </html>
    `;
    const headers = new Headers();
    headers.set('strict-transport-security', 'max-age=31536000');
    headers.set('x-frame-options', 'DENY');

    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers,
      text: jest.fn().mockResolvedValue(html),
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.errorReason).toBeUndefined();
    expect(result.hasViewportMeta).toBe(true);
    expect(result.hasOpenGraphMeta).toBe(true);
    expect(result.hasJsonLdSchema).toBe(true);
    expect(result.securityHeaderCount).toBe(2);
    expect(result.isHttps).toBe(true);
  });

  it('should handle malformed HTML without crashing', async () => {
    const html = `<meta name="viewport" ><meta property="og:title" <script type="application/ld+json"`;
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Headers(),
      text: jest.fn().mockResolvedValue(html),
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.errorReason).toBeUndefined();
  });

  it('should handle empty HTML', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Headers(),
      text: jest.fn().mockResolvedValue(''),
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.hasViewportMeta).toBe(false);
    expect(result.hasOpenGraphMeta).toBe(false);
    expect(result.securityHeaderCount).toBe(0);
  });

  it('should handle missing HTTP headers', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Headers(),
      text: jest.fn().mockResolvedValue('<html></html>'),
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.securityHeaderCount).toBe(0);
  });

  it('should handle HTTP 4xx errors', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 404,
      headers: new Headers(),
    });

    const result = await service.collectSignals('not-found.com');
    expect(result.errorReason).toBe('HTTP_404');
  });

  it('should handle HTTP 5xx errors', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 500,
      headers: new Headers(),
    });

    const result = await service.collectSignals('server-error.com');
    expect(result.errorReason).toBe('HTTP_500');
  });

  it('should handle timeout correctly', async () => {
    const timeoutError = new Error('Timeout');
    timeoutError.name = 'TimeoutError';
    mockFetch.mockRejectedValueOnce(timeoutError);

    const result = await service.collectSignals('timeout.com');
    expect(result.errorReason).toBe('TIMEOUT');
  });

  it('should follow valid redirects', async () => {
    // 1st request: 301 Redirect to www.valid-store.com
    const redirectHeaders = new Headers();
    redirectHeaders.set('location', 'https://www.valid-store.com/home');
    mockFetch.mockResolvedValueOnce({
      status: 301,
      headers: redirectHeaders,
    });

    // 2nd request: 200 OK
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Headers(),
      text: jest.fn().mockResolvedValue('<html><meta name="viewport"></html>'),
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.errorReason).toBeUndefined();
    expect(result.hasViewportMeta).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should block redirect escaping validated domain', async () => {
    const redirectHeaders = new Headers();
    redirectHeaders.set('location', 'https://malicious.com');
    mockFetch.mockResolvedValueOnce({
      status: 301,
      headers: redirectHeaders,
    });

    const result = await service.collectSignals('valid-store.com');
    expect(result.errorReason).toBe('BLOCKED_REDIRECT_SSRF');
  });

  describe('SSRF Protection (Private IPs)', () => {
    it('should block private network IP 127.0.0.1', async () => {
      // Un-mock validateDomainAndIp for these tests
      jest.restoreAllMocks();
      jest
        .spyOn(service as any, 'resolveAllIps')
        .mockResolvedValue(['127.0.0.1']);

      const result = await service.collectSignals('my-store.com');
      expect(result.errorReason).toBe('BLOCKED_BY_SSRF_PROTECTION');
    });

    it('should block private network IP 10.0.0.1', async () => {
      jest.restoreAllMocks();
      jest
        .spyOn(service as any, 'resolveAllIps')
        .mockResolvedValue(['10.0.0.1']);

      const result = await service.collectSignals('my-store.com');
      expect(result.errorReason).toBe('BLOCKED_BY_SSRF_PROTECTION');
    });

    it('should block localhost string', async () => {
      jest.restoreAllMocks();

      const result = await service.collectSignals('localhost');
      expect(result.errorReason).toBe('BLOCKED_BY_SSRF_PROTECTION');
    });
  });
});

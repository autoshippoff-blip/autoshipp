import { Injectable, Logger } from '@nestjs/common';
import * as dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);

export interface CrawlSignals {
  domain: string;
  isHttps: boolean;
  latencyMs: number;
  hasViewportMeta: boolean;
  hasOpenGraphMeta: boolean;
  hasJsonLdSchema: boolean;
  securityHeaderCount: number;
  errorReason?: string;
}

@Injectable()
export class PublicStoreCrawlerService {
  private readonly logger = new Logger(PublicStoreCrawlerService.name);

  // Private IPs array according to RFC 1918, RFC 4193, and localhost
  private readonly BLOCKED_IP_RANGES = [
    /^127\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^fc00:/i,
    /^fe80:/i,
    /^::1$/,
  ];

  async collectSignals(domain: string): Promise<CrawlSignals> {
    const fallback: CrawlSignals = {
      domain,
      isHttps: false,
      latencyMs: 0,
      hasViewportMeta: false,
      hasOpenGraphMeta: false,
      hasJsonLdSchema: false,
      securityHeaderCount: 0,
    };

    if (!domain) {
      this.logger.warn(
        `Crawl failed for domain [${domain}]: NO_DOMAIN_CONFIGURED`,
      );
      return { ...fallback, errorReason: 'NO_DOMAIN_CONFIGURED' };
    }

    try {
      // Basic URL formatting check
      new URL(`https://${domain}`);
    } catch (e) {
      this.logger.warn(
        `Crawl failed for domain [${domain}]: INVALID_URL_FORMAT`,
      );
      return { ...fallback, errorReason: 'INVALID_URL_FORMAT' };
    }

    this.logger.log(`Crawl started for domain [${domain}]`);

    try {
      const isAllowed = await this.validateDomainAndIp(domain);
      if (!isAllowed) {
        this.logger.warn(`SSRF protection blocked request to [${domain}]`);
        return { ...fallback, errorReason: 'BLOCKED_BY_SSRF_PROTECTION' };
      }

      let currentUrl = `https://${domain}`;
      let isHttps = true;
      let finalResponse: Response | null = null;
      let latencyMs = 0;

      const startTime = Date.now();

      // Manual redirect loop to handle SSRF on redirects
      for (let redirectCount = 0; redirectCount < 5; redirectCount++) {
        const response = await fetch(currentUrl, {
          method: 'GET',
          headers: { 'User-Agent': 'AutoShipp-Bot/1.0' },
          redirect: 'manual',
          signal: AbortSignal.timeout(5000),
        });

        // Handle redirects
        if ([301, 302, 307, 308].includes(response.status)) {
          const location = response.headers.get('location');
          if (!location) {
            break; // Redirect without location?
          }

          // Validate redirect URL
          const redirectValid = await this.validateRedirectUrl(
            location,
            domain,
          );
          if (!redirectValid) {
            this.logger.warn(
              `SSRF protection blocked redirect to [${location}]`,
            );
            return {
              ...fallback,
              isHttps,
              errorReason: 'BLOCKED_REDIRECT_SSRF',
            };
          }
          currentUrl = new URL(location, currentUrl).href;
          isHttps = currentUrl.startsWith('https://');
          continue; // follow redirect
        }

        if (response.status >= 400) {
          const endTime = Date.now();
          latencyMs = endTime - startTime;
          this.logger.warn(
            `Crawl failed for domain [${domain}]: HTTP_${response.status}`,
          );
          return {
            ...fallback,
            isHttps,
            latencyMs,
            errorReason: `HTTP_${response.status}`,
          };
        }

        finalResponse = response;
        break; // Successfully fetched without redirect
      }

      const endTime = Date.now();
      latencyMs = endTime - startTime;

      if (!finalResponse) {
        this.logger.warn(
          `Crawl failed for domain [${domain}]: TOO_MANY_REDIRECTS`,
        );
        return {
          ...fallback,
          isHttps,
          latencyMs,
          errorReason: 'TOO_MANY_REDIRECTS',
        };
      }

      const html = await finalResponse.text();
      const htmlSignals = this.extractHtmlSignals(html, finalResponse.headers);

      this.logger.log(
        `Crawl completed for domain [${domain}] in ${latencyMs}ms`,
      );

      return {
        domain,
        isHttps,
        latencyMs,
        hasViewportMeta: htmlSignals.hasViewportMeta ?? false,
        hasOpenGraphMeta: htmlSignals.hasOpenGraphMeta ?? false,
        hasJsonLdSchema: htmlSignals.hasJsonLdSchema ?? false,
        securityHeaderCount: htmlSignals.securityHeaderCount ?? 0,
      };
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        this.logger.warn(`Crawl timed out (5s limit) for domain [${domain}]`);
        return { ...fallback, errorReason: 'TIMEOUT' };
      }
      this.logger.warn(
        `Crawl failed for domain [${domain}]: STORE_UNREACHABLE`,
      );
      this.logger.log(
        `Activated default scorecard fallback for domain [${domain}]`,
      );
      return { ...fallback, errorReason: 'STORE_UNREACHABLE' };
    }
  }

  async validateDomainAndIp(domain: string): Promise<boolean> {
    if (domain === 'localhost' || domain.includes('local')) {
      return false;
    }
    try {
      const addresses = await this.resolveAllIps(domain);
      if (addresses.length === 0) return false;

      for (const ip of addresses) {
        if (this.isPrivateIp(ip)) {
          return false;
        }
      }
      return true;
    } catch (e) {
      // DNS resolution failure
      return false;
    }
  }

  async validateRedirectUrl(
    redirectUrl: string,
    originalDomain: string,
  ): Promise<boolean> {
    try {
      const parsedUrl = new URL(redirectUrl, `https://${originalDomain}`);
      const isSubdomainOrSame =
        parsedUrl.hostname === originalDomain ||
        parsedUrl.hostname.endsWith(`.${originalDomain}`);
      if (!isSubdomainOrSame) {
        return false; // Escaping domain
      }
      return this.validateDomainAndIp(parsedUrl.hostname);
    } catch (e) {
      return false;
    }
  }

  private isPrivateIp(ip: string): boolean {
    return this.BLOCKED_IP_RANGES.some((regex) => regex.test(ip));
  }

  private async resolveAllIps(hostname: string): Promise<string[]> {
    let ips: string[] = [];
    try {
      ips = await resolve4(hostname);
    } catch (e) {
      /* ignore */
    }
    try {
      const ipv6 = await resolve6(hostname);
      ips = ips.concat(ipv6);
    } catch (e) {
      /* ignore */
    }
    return ips;
  }

  private extractHtmlSignals(
    html: string,
    headers: Headers,
  ): Partial<CrawlSignals> {
    if (!html) {
      return {
        hasViewportMeta: false,
        hasOpenGraphMeta: false,
        hasJsonLdSchema: false,
        securityHeaderCount: 0,
      };
    }
    const hasViewportMeta = /<meta\s+(?:[^>]*?\s+)?name=["']viewport["']/i.test(
      html,
    );
    const hasOpenGraphMeta =
      /<meta\s+(?:[^>]*?\s+)?property=["']og:[^"']+["']/i.test(html);
    const hasJsonLdSchema =
      /<script\s+(?:[^>]*?\s+)?type=["']application\/ld\+json["']/i.test(html);

    let securityHeaderCount = 0;
    const securityHeadersToCheck = [
      'strict-transport-security',
      'content-security-policy',
      'x-frame-options',
      'x-content-type-options',
    ];
    for (const h of securityHeadersToCheck) {
      if (headers.has(h) || headers.has(h.toLowerCase())) {
        securityHeaderCount++;
      }
    }

    return {
      hasViewportMeta,
      hasOpenGraphMeta,
      hasJsonLdSchema,
      securityHeaderCount,
    };
  }
}

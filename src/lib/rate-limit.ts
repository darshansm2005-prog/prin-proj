import { createHash } from 'crypto';
import { set, get } from 'lodash';

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore: Record<string, number> = {};

export const rateLimit = async (
  action: string, 
  key: string, 
  limit: number, 
  ttl: number,
  maxRequests: number = 5
) => {
  const hash = createHash('sha256');
  hash.update(`${action}:${key}`);
  const digest = hash.digest('hex');

  const currentTime = Math.floor(Date.now() / 1000);
  const lastAccessTime = get(rateLimitStore, digest, 0);
  const requestCount = get(rateLimitStore, `${digest}:count`, 0);

  // Reset counter after TTL
  if (currentTime - lastAccessTime > ttl) {
    set(rateLimitStore, `${digest}:count`, 0);
    set(rateLimitStore, digest, currentTime);
    return;
  }

  // Enforce rate limit
  if (requestCount >= maxRequests) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  // Increment request counter
  set(rateLimitStore, `${digest}:count`, requestCount + 1);
  set(rateLimitStore, digest, currentTime);

  // Clean up old entries periodically
  if (requestCount % 10 === 0) {
    const now = Math.floor(Date.now() / 1000);
    Object.keys(rateLimitStore).forEach(k => {
      if (k !== digest && 
          rateLimitStore[k] < now - 3600 && 
          !k.includes(':count')) {
        delete rateLimitStore[k];
      }
    });
  }
};
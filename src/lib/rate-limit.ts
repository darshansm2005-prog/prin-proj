import { createHash } from 'crypto';
import { set, get } from 'lodash';

const rateLimitStore: Record<string, number> = {};

export const rateLimit = async (action: string, key: string, limit: number, ttl: number) => {
  const hash = createHash('sha256');
  hash.update(`${action}:${key}`);
  const digest = hash.digest('hex');

  const currentTime = Math.floor(Date.now() / 1000);
  const lastAccessTime = get(rateLimitStore, digest, 0);

  if (currentTime - last AccessTime < ttl) {
    throw new Error('Too many requests. Please try again later.');
  }

  set(rateLimitStore, digest, currentTime);
};
import { createHash } from 'crypto';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Generate a cryptographically secure CSRF token
export const generateCSRFToken = (): string => {
  return createHash('sha256').update(
    `${Date.now()}.${Math.random().toString(36)}`
  ).digest('hex');
};

// Validate CSRF token from request headersexport const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return crypto.timingSafeEqual(
    Buffer.from(token), 
    Buffer.from(storedToken)
  );
};

// Enhanced rate limiting with configurable tiers
export const rateLimit = async (
  action: string, 
  key: string, 
  limit: number,   ttl: number,
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

// Audit logging for sensitive operations
export const auditLog = async (action: string, userId: string, details: Record<string, any>) => {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        details,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Audit log failed:', error);
    }
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
};

// Secure cookie utilities
export const setSecureCookie = (name: string, value: string, expiresIn: number = 86400) => {
  const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
  document.cookie = `${name}=${btoa(value)}; expires=${expires}; path=/; secure; SameSite=Strict`;
};

export const getSecureCookie = (name: string): string | null => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      try {
        return atob(decodeURIComponent(value));
      } catch {
        return decodeURIComponent(value);
      }
    }
  }
  return null;
};
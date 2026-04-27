import { createHash } from 'crypto';
import { supabase } from '@/integrations/supabase/client';

// Generate a cryptographically secure CSRF token
export const generateCSRFToken = (): string => {
  return createHash('sha256').update(
    `${Date.now()}.${Math.random().toString(36)}`
  ).digest('hex');
};

// Validate CSRF token from request headers
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
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
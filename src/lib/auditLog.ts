import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export type AuditEvent = 
  | 'LOGIN_SUCCESS' 
  | 'LOGIN_FAILURE' 
  | 'LOGOUT'   | 'PASSWORD_CHANGE'   | '2FA_ENABLED'   | '2FA_DISABLED'   | 'ADMIN_ACTION';

interface AuditData {
  user_id: string;
  email: string;
  event: AuditEvent;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Log security-related events to the audits table
 * @param event - Type of security event
 * @param data - Event details
 */
export const logAudit = async (event: AuditEvent, data: AuditData) => {
  try {
    // Get client IP from request context (available in edge functions)
    // For now, we'll use a placeholder that can be replaced in edge functions
    const ipAddress = data.ip_address || '127.0.0.1';
    const userAgent = data.user_agent || 'unknown';
    
    const { error } = await supabase
      .from('audits')
      .insert({
        user_id: data.user_id,
        email: data.email,
        event,
        details: data.details,
        ip_address: ip_address,
        user_agent: user_agent,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to log audit event:', error);
    }
  } catch (error) {
    console.error('Audit logging error:', error);
  }
};
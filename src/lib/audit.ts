import { auditLog } from './security';

// Predefined audit actions
export const AUDIT_ACTIONS = {
  LOGIN: 'user_login',
  LOGOUT: 'user_logout',
  ORDER_CREATE: 'order_created',
  ORDER_UPDATE: 'order_updated',
  PRODUCT_DELETE: 'product_deleted',
  ROLE_CHANGE: 'role_changed',
  ADMIN_ACCESS: 'admin_access_granted'
};

// Log security-relevant events
export const logSecurityEvent = async (
  action: keyof typeof AUDIT_ACTIONS, 
  userId: string, 
  details: Record<string, any> = {}
) => {
  await auditLog(action, userId, {
    ...details,
    ip: details.ip || 'unknown',
    userAgent: details.userAgent || 'unknown'
  });
};

// Example usage:
// logSecurityEvent(AUDIT_ACTIONS.LOGIN, user.id, { ip: clientIp });
// logSecurityEvent(AUDIT_ACTIONS.ORDER_CREATE, user.id, { amount: orderTotal });
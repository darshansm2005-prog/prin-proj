import { generateCSRFToken, validateCSRFToken } from './security';

// CSRF token management
export const CSRF_TOKEN_KEY = 'csrf_token';

export const getCSRFToken = (): string => {
  if (typeof window === 'undefined') return '';
  let token = localStorage.getItem(CSRF_TOKEN_KEY);
  if (!token) {
    token = generateCSRFToken();
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  }
  return token;
};

export const validateRequest = (headerToken: string): boolean => {
  const token = getCSRFToken();
  return validateCSRFToken(token, headerToken || '');
};

// Middleware hook for API routes (simulated for client-side)
export const withCSRFProtection = (handler: any) => {
  return async (req: any, res: any) => {
    const token = req.headers['csrf-token'];
    if (!token || !validateCSRFToken(token, getCSRFToken())) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
    return handler(req, res);
  };
};
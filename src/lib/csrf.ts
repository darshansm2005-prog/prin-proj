import { createHash, randomBytes } from 'crypto';

export const getCsrfToken = async () => {
  return new Promise<string>((resolve, reject) => {
    randomBytes(32, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        const token = buf.toString('hex');
        resolve(token);
      }
    });
  });
};

export const validateCsrfToken = async (token: string) => {
  const hash = createHash('sha256');
  hash.update(token);
  const digest = hash.digest('hex');
  if (digest!== process.env.CSRF_SECRET) {
    throw new Error('Invalid CSRF token');
  }
};
import { ALLOWED_EMAIL_DOMAIN } from '../types/auth';

/**
 * Validates whether an email belongs to the authorized HB+ organization domain (@hbplus.fit).
 * Strict verification: normalizes casing and whitespace.
 */
export function isHBPlusEmail(email?: string | null): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const normalized = email.trim().toLowerCase();
  const domainPart = normalized.split('@')[1];
  
  return domainPart === ALLOWED_EMAIL_DOMAIN;
}

/**
 * Extracts and normalizes the domain from an email address.
 */
export function extractDomain(email?: string | null): string | null {
  if (!email || typeof email !== 'string') return null;
  const parts = email.trim().toLowerCase().split('@');
  return parts.length === 2 ? parts[1] : null;
}

/**
 * Masks an unauthorized email for display in security audit logs and UI notices
 * (e.g. j***e@gmail.com).
 */
export function maskEmail(email?: string | null): string {
  if (!email) return 'unknown';
  const parts = email.split('@');
  if (parts.length !== 2) return 'invalid-format';
  const [name, domain] = parts;
  if (name.length <= 2) return `${name[0]}*@${domain}`;
  return `${name[0]}${'*'.repeat(Math.min(name.length - 2, 5))}${name[name.length - 1]}@${domain}`;
}

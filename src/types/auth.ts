export const ALLOWED_EMAIL_DOMAIN = 'hbplus.fit';

export type UserRole = 'employee' | 'lead' | 'admin' | 'security_auditor';

export interface HBPlusUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isDomainVerified: boolean;
  role: UserRole;
  domain: string | null;
  lastLoginAt: string;
}

export type AuthStatus = 
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'access_denied';

export type AccessRestrictionReason =
  | 'wrong_domain'
  | 'account_suspended'
  | 'email_unverified'
  | 'unknown';

export interface AccessDeniedDetails {
  attemptedEmail: string | null;
  reason: AccessRestrictionReason;
  timestamp: string;
}

export interface AuthState {
  status: AuthStatus;
  user: HBPlusUser | null;
  accessDeniedDetails: AccessDeniedDetails | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  retryAuth: () => void;
}

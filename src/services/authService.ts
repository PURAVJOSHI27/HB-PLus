import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import { auth, db } from '../config/firebase';
import { HBPlusUser, AccessRestrictionReason } from '../types/auth';
import { isHBPlusEmail, extractDomain } from '../utils/validation';

export interface AuthenticationResult {
  success: boolean;
  user?: HBPlusUser;
  deniedReason?: AccessRestrictionReason;
  deniedEmail?: string;
  error?: string;
}

const googleProvider = new GoogleAuthProvider();
// Request Google Workspace hosted domain hint
googleProvider.setCustomParameters({
  hd: 'hbplus.fit',
  prompt: 'select_account',
});

/**
 * Evaluates if a Firebase User meets organizational domain requirements.
 */
function validateUserDomain(email: string | null): { allowed: boolean; domain: string | null } {
  const allowed = isHBPlusEmail(email);
  const domain = extractDomain(email);
  return { allowed, domain };
}

/**
 * Transforms raw Firebase user into application-specific HBPlusUser model.
 */
function mapFirebaseUser(firebaseUser: User): HBPlusUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    isDomainVerified: isHBPlusEmail(firebaseUser.email),
    role: 'employee',
    domain: extractDomain(firebaseUser.email),
    lastLoginAt: new Date().toISOString(),
  };
}

/**
 * Writes or updates the user document in Firestore after a successful login.
 * Security rules on the backend prevent privilege escalation.
 */
async function persistUserRecord(user: HBPlusUser): Promise<void> {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        domain: user.domain,
        role: 'employee', // Immutable from client — Firestore rules enforce this
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    // Non-fatal: auth succeeded even if Firestore write fails
    console.error('[authService] Firestore user record write failed:', err);
  }
}

/**
 * Process a Firebase User object returned from Google sign-in.
 * Enforces @hbplus.fit domain restriction.
 */
async function processSignInResult(firebaseUser: User): Promise<AuthenticationResult> {
  const { allowed } = validateUserDomain(firebaseUser.email);

  if (!allowed) {
    // Reject non-hbplus.fit accounts immediately
    await firebaseSignOut(auth);
    return {
      success: false,
      deniedReason: 'wrong_domain',
      deniedEmail: firebaseUser.email ?? undefined,
    };
  }

  const appUser = mapFirebaseUser(firebaseUser);
  await persistUserRecord(appUser);

  return { success: true, user: appUser };
}

/**
 * Service handling low-level platform authentication interactions.
 * Architecture layer separating Firebase Auth API from application state & UI.
 */
export const authService = {
  validateUserDomain,
  mapFirebaseUser,

  /**
   * Initiates Google OAuth sign-in.
   * - Web: uses signInWithPopup (better UX, no redirect)
   * - Native (iOS/Android): uses signInWithRedirect via expo-auth-session
   */
  async initiateGoogleSignIn(): Promise<AuthenticationResult> {
    try {
      if (Platform.OS === 'web') {
        // Web: popup flow
        const credential = await signInWithPopup(auth, googleProvider);
        return processSignInResult(credential.user);
      } else {
        // Native: redirect flow — result handled by onAuthStateChanged in AuthContext
        await signInWithRedirect(auth, googleProvider);
        // On native the redirect navigates away; return pending state
        return { success: false, error: 'Redirect initiated — awaiting return.' };
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';
      const message = (err as Error)?.message ?? 'Unknown error';

      // User closed the popup — not an error worth showing
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        return { success: false };
      }

      // Popup blocked by browser
      if (code === 'auth/popup-blocked') {
        return {
          success: false,
          error: 'Sign-in popup was blocked by your browser. Please allow popups for this site and try again.',
        };
      }

      // Network issues
      if (code === 'auth/network-request-failed') {
        return {
          success: false,
          error: 'Network error. Check your internet connection and try again.',
        };
      }

      console.error('[authService] Google sign-in error:', code, message);
      return { success: false, error: 'Sign-in failed. Please try again.' };
    }
  },

  /**
   * Checks for a pending redirect result (used after signInWithRedirect on native).
   */
  async checkRedirectResult(): Promise<AuthenticationResult | null> {
    try {
      const result = await getRedirectResult(auth);
      if (!result) return null;
      return processSignInResult(result.user);
    } catch {
      return null;
    }
  },

  /**
   * Terminate active session and clear auth state.
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('[authService] Error during signOut:', err);
    }
  },
};

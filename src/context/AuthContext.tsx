import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthContextType, AuthStatus, HBPlusUser, AccessDeniedDetails } from '../types/auth';
import { authService } from '../services/authService';
import { auth } from '../config/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('loading'); // start loading while Firebase resolves session
  const [user, setUser] = useState<HBPlusUser | null>(null);
  const [accessDeniedDetails, setAccessDeniedDetails] = useState<AccessDeniedDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Firebase Auth state listener.
   * Fires immediately on mount with current session (or null),
   * and on every subsequent sign-in / sign-out event.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const { allowed } = authService.validateUserDomain(firebaseUser.email);

        if (!allowed) {
          // Wrong domain — sign them out and show access denied
          await authService.signOut();
          setAccessDeniedDetails({
            attemptedEmail: firebaseUser.email,
            reason: 'wrong_domain',
            timestamp: new Date().toISOString(),
          });
          setUser(null);
          setStatus('access_denied');
        } else {
          // Valid @hbplus.fit user
          const appUser = authService.mapFirebaseUser(firebaseUser);
          setUser(appUser);
          setAccessDeniedDetails(null);
          setStatus('authenticated');
        }
      } else {
        // No session
        if (status !== 'access_denied') {
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearError = () => setError(null);

  const retryAuth = () => {
    setStatus('unauthenticated');
    setAccessDeniedDetails(null);
    setError(null);
  };

  const signInWithGoogle = async () => {
    setStatus('loading');
    setError(null);

    try {
      const result = await authService.initiateGoogleSignIn();

      if (result.success && result.user) {
        // onAuthStateChanged will fire and set authenticated state automatically;
        // we set it here too for immediate responsiveness on web popup flow.
        setUser(result.user);
        setStatus('authenticated');
      } else if (result.deniedReason) {
        setAccessDeniedDetails({
          attemptedEmail: result.deniedEmail || null,
          reason: result.deniedReason,
          timestamp: new Date().toISOString(),
        });
        setStatus('access_denied');
      } else {
        // Cancelled or redirect pending — go back to unauthenticated
        setStatus('unauthenticated');
        if (result.error) setError(result.error);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Authentication encountered an unexpected error.';
      setError(message);
      setStatus('unauthenticated');
    }
  };

  const signOut = async () => {
    setStatus('loading');
    try {
      await authService.signOut();
      setUser(null);
      setAccessDeniedDetails(null);
      setStatus('unauthenticated');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Logout failed.';
      setError(message);
      setStatus('unauthenticated');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        accessDeniedDetails,
        error,
        signInWithGoogle,
        signOut,
        clearError,
        retryAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

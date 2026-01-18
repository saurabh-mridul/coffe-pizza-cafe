/**
 * useAuth Hook
 *
 * @module features/auth/hooks/useAuth
 * @description Primary hook for authentication operations and state access
 * @feature 001-sso-home-page
 */

import { useCallback, useMemo } from 'react';
import { useMsal, useAccount, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest } from '../config/msalConfig';
import type { AuthStatus, AuthError, UserProfile, UseAuthReturn } from '../types';

/**
 * useAuth Hook
 *
 * Provides authentication state and actions for components.
 * Must be used within MsalProvider context.
 *
 * @returns {UseAuthReturn} Authentication state and actions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, user, signIn, signOut } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <button onClick={signIn}>Sign In</button>;
 *   }
 *
 *   return <span>Welcome, {user?.displayName}</span>;
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount();

  // Derive authentication status
  const status: AuthStatus = useMemo(() => {
    if (inProgress !== InteractionStatus.None) {
      return 'loading';
    }
    return isAuthenticated ? 'authenticated' : 'unauthenticated';
  }, [inProgress, isAuthenticated]);

  // Derive loading state
  const isLoading = status === 'loading';

  // Extract user profile from account
  const user: UserProfile | null = useMemo(() => {
    if (!account) return null;

    const idTokenClaims = account.idTokenClaims as Record<string, unknown> | undefined;

    return {
      displayName: account.name ?? (idTokenClaims?.name as string) ?? null,
      email:
        account.username ??
        (idTokenClaims?.preferred_username as string) ??
        (idTokenClaims?.email as string) ??
        '',
      tenantId: account.tenantId ?? (idTokenClaims?.tid as string) ?? '',
    };
  }, [account]);

  // Sign in action - uses redirect for better UX
  const signIn = useCallback(async (): Promise<void> => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Sign-in error:', error);
      // Error will be handled by MSAL event system
    }
  }, [instance]);

  // Sign out action
  const signOut = useCallback(async (): Promise<void> => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, [instance]);

  // Refresh activity - placeholder for session timeout integration
  const refreshActivity = useCallback((): void => {
    // This will be used by useSessionTimeout hook
    // Activity tracking happens there
  }, []);

  // No error state in basic implementation
  // Errors are handled via MSAL event callbacks in AuthProvider
  const error: AuthError | null = null;

  return {
    status,
    isAuthenticated,
    isLoading,
    user,
    error,
    signIn,
    signOut,
    refreshActivity,
  };
}

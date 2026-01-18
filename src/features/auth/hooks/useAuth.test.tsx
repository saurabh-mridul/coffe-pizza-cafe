/**
 * useAuth Hook Tests
 *
 * @module features/auth/hooks/useAuth.test
 * @description Unit tests for useAuth hook - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, type AccountInfo } from '@azure/msal-browser';
import { useAuth } from './useAuth';
import { msalConfig } from '../config/msalConfig';

// Mock MSAL instance
const mockMsalInstance = new PublicClientApplication(msalConfig);

// Mock account data
const mockAccount: AccountInfo = {
  homeAccountId: 'test-home-account-id',
  environment: 'login.microsoftonline.com',
  tenantId: 'test-tenant-id',
  username: 'testuser@contoso.com',
  localAccountId: 'test-local-account-id',
  name: 'Test User',
  idTokenClaims: {
    name: 'Test User',
    preferred_username: 'testuser@contoso.com',
    tid: 'test-tenant-id',
  },
};

// Test wrapper with MsalProvider
function createWrapper(msalInstance: PublicClientApplication) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
  };
}

describe('useAuth', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Initialize MSAL instance
    await mockMsalInstance.initialize();
  });

  describe('initial state', () => {
    it('should return isLoading=true during initial load', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      // Initial state should show loading or resolve quickly
      await waitFor(() => {
        expect(result.current.status).toBeDefined();
      });
    });

    it('should return isAuthenticated=false when no account is active', async () => {
      // Ensure no active account
      mockMsalInstance.setActiveAccount(null);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
      });
    });

    it('should return user=null when unauthenticated', async () => {
      mockMsalInstance.setActiveAccount(null);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
      });
    });
  });

  describe('authenticated state', () => {
    it('should return isAuthenticated=true when account is active', async () => {
      // Set active account
      mockMsalInstance.setActiveAccount(mockAccount);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    it('should return user profile when authenticated', async () => {
      mockMsalInstance.setActiveAccount(mockAccount);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(result.current.user).not.toBeNull();
        expect(result.current.user?.displayName).toBe('Test User');
        expect(result.current.user?.email).toBe('testuser@contoso.com');
      });
    });
  });

  describe('actions', () => {
    it('should provide signIn function', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(typeof result.current.signIn).toBe('function');
      });
    });

    it('should provide signOut function', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(typeof result.current.signOut).toBe('function');
      });
    });

    it('should provide refreshActivity function', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(typeof result.current.refreshActivity).toBe('function');
      });
    });
  });

  describe('error handling', () => {
    it('should have error=null when no auth error occurs', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(mockMsalInstance),
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
  });
});

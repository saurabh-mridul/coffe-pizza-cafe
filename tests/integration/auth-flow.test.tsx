/**
 * Authentication Flow Integration Tests
 *
 * @module tests/integration/auth-flow.test
 * @description Integration tests for complete auth flow - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, type AccountInfo } from '@azure/msal-browser';
import App from '../../src/App';
import { msalConfig } from '../../src/features/auth/config/msalConfig';

// Mock MSAL instance
const mockMsalInstance = new PublicClientApplication(msalConfig);

// Mock account
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

// Test wrapper
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <MsalProvider instance={mockMsalInstance}>{children}</MsalProvider>
    </FluentProvider>
  );
}

describe('Authentication Flow Integration', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await mockMsalInstance.initialize();
    mockMsalInstance.setActiveAccount(null);
  });

  describe('unauthenticated state', () => {
    it('should show sign-in prompt when not authenticated', async () => {
      render(<App />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      });
    });

    it('should show app title when not authenticated', async () => {
      render(<App />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/coffee-pizza cafe/i)).toBeInTheDocument();
      });
    });
  });

  describe('authenticated state', () => {
    it('should show welcome message when authenticated', async () => {
      mockMsalInstance.setActiveAccount(mockAccount);

      render(<App />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      });
    });

    it('should show app title when authenticated', async () => {
      mockMsalInstance.setActiveAccount(mockAccount);

      render(<App />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/coffee-pizza cafe/i)).toBeInTheDocument();
      });
    });
  });

  describe('loading state', () => {
    it('should handle initial loading state gracefully', async () => {
      render(<App />, { wrapper: TestWrapper });

      // Should either show loading or content (not crash)
      await waitFor(() => {
        const content = screen.queryByText(/coffee-pizza cafe/i) || screen.queryByText(/loading/i);
        expect(content).toBeInTheDocument();
      });
    });
  });
});

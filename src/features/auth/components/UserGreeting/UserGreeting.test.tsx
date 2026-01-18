/**
 * UserGreeting Component Tests
 *
 * @module features/auth/components/UserGreeting/UserGreeting.test
 * @description Component tests for UserGreeting - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, type AccountInfo } from '@azure/msal-browser';
import { UserGreeting } from './UserGreeting';
import { msalConfig } from '../../config/msalConfig';

// Mock MSAL instance
const mockMsalInstance = new PublicClientApplication(msalConfig);

// Mock account with display name
const mockAccountWithName: AccountInfo = {
  homeAccountId: 'test-home-account-id',
  environment: 'login.microsoftonline.com',
  tenantId: 'test-tenant-id',
  username: 'testuser@contoso.com',
  localAccountId: 'test-local-account-id',
  name: 'John Smith',
  idTokenClaims: {
    name: 'John Smith',
    preferred_username: 'testuser@contoso.com',
    tid: 'test-tenant-id',
  },
};

// Mock account without display name
const mockAccountWithoutName: AccountInfo = {
  homeAccountId: 'test-home-account-id',
  environment: 'login.microsoftonline.com',
  tenantId: 'test-tenant-id',
  username: 'testuser@contoso.com',
  localAccountId: 'test-local-account-id',
  name: undefined,
  idTokenClaims: {
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

describe('UserGreeting', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await mockMsalInstance.initialize();
  });

  describe('with display name', () => {
    beforeEach(() => {
      mockMsalInstance.setActiveAccount(mockAccountWithName);
    });

    it('should render personalized greeting with user name', () => {
      render(<UserGreeting />, { wrapper: TestWrapper });

      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      expect(screen.getByText(/john smith/i)).toBeInTheDocument();
    });

    it('should use custom greeting prefix when provided', () => {
      render(<UserGreeting greetingPrefix="Hello" />, { wrapper: TestWrapper });

      expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });
  });

  describe('without display name (fallback)', () => {
    beforeEach(() => {
      mockMsalInstance.setActiveAccount(mockAccountWithoutName);
    });

    it('should render generic greeting when displayName is null', () => {
      render(<UserGreeting />, { wrapper: TestWrapper });

      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });

    it('should use fallbackName when displayName is null', () => {
      render(<UserGreeting fallbackName="Guest" />, { wrapper: TestWrapper });

      expect(screen.getByText(/guest/i)).toBeInTheDocument();
    });
  });

  describe('unauthenticated state', () => {
    beforeEach(() => {
      mockMsalInstance.setActiveAccount(null);
    });

    it('should render generic greeting when not authenticated', () => {
      render(<UserGreeting />, { wrapper: TestWrapper });

      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    beforeEach(() => {
      mockMsalInstance.setActiveAccount(mockAccountWithName);
    });

    it('should accept custom className', () => {
      const { container } = render(<UserGreeting className="custom-class" />, {
        wrapper: TestWrapper,
      });

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

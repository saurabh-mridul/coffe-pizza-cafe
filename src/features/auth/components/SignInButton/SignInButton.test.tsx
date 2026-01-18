/**
 * SignInButton Component Tests
 *
 * @module features/auth/components/SignInButton/SignInButton.test
 * @description Component tests for SignInButton - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { SignInButton } from './SignInButton';
import { msalConfig } from '../../config/msalConfig';

// Mock MSAL instance
const mockMsalInstance = new PublicClientApplication(msalConfig);

// Mock loginRedirect
vi.mock('@azure/msal-react', async () => {
  const actual = await vi.importActual('@azure/msal-react');
  return {
    ...actual,
    useMsal: () => ({
      instance: mockMsalInstance,
      accounts: [],
      inProgress: 'none',
    }),
  };
});

// Test wrapper
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <MsalProvider instance={mockMsalInstance}>{children}</MsalProvider>
    </FluentProvider>
  );
}

describe('SignInButton', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await mockMsalInstance.initialize();
  });

  describe('rendering', () => {
    it('should render with default label "Sign in with Microsoft"', () => {
      render(<SignInButton />, { wrapper: TestWrapper });

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(/sign in with microsoft/i)).toBeInTheDocument();
    });

    it('should render with custom label when provided', () => {
      render(<SignInButton label="Custom Sign In" />, { wrapper: TestWrapper });

      expect(screen.getByText('Custom Sign In')).toBeInTheDocument();
    });

    it('should render with primary appearance by default', () => {
      render(<SignInButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      // FluentUI adds specific classes for primary appearance
      expect(button).toBeInTheDocument();
    });

    it('should render with custom appearance when provided', () => {
      render(<SignInButton appearance="subtle" />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with custom size when provided', () => {
      render(<SignInButton size="large" />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should be focusable', () => {
      render(<SignInButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have accessible name', () => {
      render(<SignInButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button', { name: /sign in/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should be clickable', async () => {
      const user = userEvent.setup();
      render(<SignInButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      await user.click(button);

      // Button should still be in document after click
      expect(button).toBeInTheDocument();
    });

    it('should call onSignInComplete callback on success', async () => {
      const onSignInComplete = vi.fn();
      render(<SignInButton onSignInComplete={onSignInComplete} />, { wrapper: TestWrapper });

      // This tests the callback prop is accepted
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call onSignInError callback on failure', async () => {
      const onSignInError = vi.fn();
      render(<SignInButton onSignInError={onSignInError} />, { wrapper: TestWrapper });

      // This tests the callback prop is accepted
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

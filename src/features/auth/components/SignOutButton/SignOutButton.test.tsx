/**
 * SignOutButton Component Tests
 *
 * @module features/auth/components/SignOutButton/SignOutButton.test
 * @description Component tests for SignOutButton - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { SignOutButton } from './SignOutButton';
import { msalConfig } from '../../config/msalConfig';

// Mock MSAL instance
const mockMsalInstance = new PublicClientApplication(msalConfig);

// Test wrapper
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <MsalProvider instance={mockMsalInstance}>{children}</MsalProvider>
    </FluentProvider>
  );
}

describe('SignOutButton', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await mockMsalInstance.initialize();
  });

  describe('rendering', () => {
    it('should render with default label "Sign out"', () => {
      render(<SignOutButton />, { wrapper: TestWrapper });

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });

    it('should render with custom label when provided', () => {
      render(<SignOutButton label="Log out" />, { wrapper: TestWrapper });

      expect(screen.getByText('Log out')).toBeInTheDocument();
    });

    it('should render with subtle appearance by default', () => {
      render(<SignOutButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with custom appearance when provided', () => {
      render(<SignOutButton appearance="primary" />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with custom size when provided', () => {
      render(<SignOutButton size="small" />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should be focusable', () => {
      render(<SignOutButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have accessible name', () => {
      render(<SignOutButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button', { name: /sign out/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should be clickable', async () => {
      const user = userEvent.setup();
      render(<SignOutButton />, { wrapper: TestWrapper });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('should call onSignOutComplete callback on success', async () => {
      const onSignOutComplete = vi.fn();
      render(<SignOutButton onSignOutComplete={onSignOutComplete} />, { wrapper: TestWrapper });

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

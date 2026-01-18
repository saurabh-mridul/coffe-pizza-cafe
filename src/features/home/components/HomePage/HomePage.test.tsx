/**
 * HomePage Component Tests
 *
 * @module HomePage.test
 * @description Unit tests for HomePage component
 * @feature 001-sso-home-page
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HomePage } from './HomePage';

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Coffee-Pizza Cafe',
        'home.subtitle': 'Your favorite spot for coffee and pizza',
        'home.signInPrompt': 'Sign in to access your account',
        'greeting.welcomeGuest': 'Welcome to Coffee-Pizza Cafe!',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock MSAL hooks
const mockIsAuthenticated = vi.fn();
const mockInProgress = vi.fn();
vi.mock('@azure/msal-react', () => ({
  useIsAuthenticated: () => mockIsAuthenticated(),
  useMsal: () => ({
    inProgress: mockInProgress(),
  }),
  AuthenticatedTemplate: ({ children }: { children: React.ReactNode }) =>
    mockIsAuthenticated() ? <>{children}</> : null,
  UnauthenticatedTemplate: ({ children }: { children: React.ReactNode }) =>
    !mockIsAuthenticated() ? <>{children}</> : null,
}));

// Mock InteractionStatus
vi.mock('@azure/msal-browser', () => ({
  InteractionStatus: {
    None: 'none',
    Login: 'login',
    Logout: 'logout',
  },
}));

// Mock auth components
vi.mock('@/features/auth', () => ({
  SignInButton: () => <button data-testid="sign-in-button">Sign In</button>,
  SignOutButton: () => <button data-testid="sign-out-button">Sign Out</button>,
  UserGreeting: () => <div data-testid="user-greeting">Welcome, User!</div>,
}));

// Mock LoadingSpinner
vi.mock('@/components/LoadingSpinner', () => ({
  LoadingSpinner: ({ message }: { message?: string }) => (
    <div data-testid="loading-spinner">{message || 'Loading...'}</div>
  ),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated.mockReturnValue(false);
    mockInProgress.mockReturnValue('none');
  });

  describe('rendering', () => {
    it('renders home page title', () => {
      render(<HomePage />);

      expect(screen.getByText('Coffee-Pizza Cafe')).toBeInTheDocument();
    });

    it('renders home page subtitle', () => {
      render(<HomePage />);

      expect(screen.getByText('Your favorite spot for coffee and pizza')).toBeInTheDocument();
    });

    it('renders main element with proper role', () => {
      render(<HomePage />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('unauthenticated state', () => {
    beforeEach(() => {
      mockIsAuthenticated.mockReturnValue(false);
    });

    it('shows sign-in prompt when not authenticated', () => {
      render(<HomePage />);

      expect(screen.getByText('Sign in to access your account')).toBeInTheDocument();
    });

    it('shows SignInButton when not authenticated', () => {
      render(<HomePage />);

      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    });

    it('does not show UserGreeting when not authenticated', () => {
      render(<HomePage />);

      expect(screen.queryByTestId('user-greeting')).not.toBeInTheDocument();
    });
  });

  describe('authenticated state', () => {
    beforeEach(() => {
      mockIsAuthenticated.mockReturnValue(true);
    });

    it('shows UserGreeting when authenticated', () => {
      render(<HomePage />);

      expect(screen.getByTestId('user-greeting')).toBeInTheDocument();
    });

    it('shows SignOutButton when authenticated', () => {
      render(<HomePage />);

      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    });

    it('does not show sign-in prompt when authenticated', () => {
      render(<HomePage />);

      expect(screen.queryByText('Sign in to access your account')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows loading spinner during login interaction', () => {
      mockInProgress.mockReturnValue('login');
      render(<HomePage />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('shows loading spinner during logout interaction', () => {
      mockInProgress.mockReturnValue('logout');
      render(<HomePage />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('does not show loading spinner when no interaction in progress', () => {
      mockInProgress.mockReturnValue('none');
      render(<HomePage />);

      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has heading hierarchy', () => {
      render(<HomePage />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Coffee-Pizza Cafe');
    });

    it('main content has accessible structure', () => {
      render(<HomePage />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('applies custom className when provided', () => {
      render(<HomePage className="custom-home" />);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('custom-home');
    });
  });
});

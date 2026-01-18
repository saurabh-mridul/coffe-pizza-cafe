/**
 * Header Component Tests
 *
 * @module Header.test
 * @description Unit tests for Header component
 * @feature 001-sso-home-page
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'header.brand': 'Coffee-Pizza Cafe',
        'app.name': 'Coffee-Pizza Cafe',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock MSAL hooks
const mockIsAuthenticated = vi.fn();
vi.mock('@azure/msal-react', () => ({
  useIsAuthenticated: () => mockIsAuthenticated(),
}));

// Mock SignInButton and SignOutButton
vi.mock('@/features/auth', () => ({
  SignInButton: () => <button data-testid="sign-in-button">Sign In</button>,
  SignOutButton: () => <button data-testid="sign-out-button">Sign Out</button>,
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated.mockReturnValue(false);
  });

  describe('rendering', () => {
    it('renders brand name', () => {
      render(<Header />);

      expect(screen.getByText('Coffee-Pizza Cafe')).toBeInTheDocument();
    });

    it('renders header element with banner role', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders navigation element', () => {
      render(<Header />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('authentication state', () => {
    it('shows SignInButton when user is not authenticated', () => {
      mockIsAuthenticated.mockReturnValue(false);
      render(<Header />);

      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
      expect(screen.queryByTestId('sign-out-button')).not.toBeInTheDocument();
    });

    it('shows SignOutButton when user is authenticated', () => {
      mockIsAuthenticated.mockReturnValue(true);
      render(<Header />);

      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has proper aria-label on navigation', () => {
      render(<Header />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('brand name is in a heading element', () => {
      render(<Header />);

      // Brand should be identifiable as site title
      const brand = screen.getByText('Coffee-Pizza Cafe');
      expect(brand).toBeInTheDocument();
    });
  });

  describe('logo', () => {
    it('renders logo image', () => {
      render(<Header />);

      const logo = screen.getByRole('img', { name: /coffee-pizza cafe logo/i });
      expect(logo).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('applies custom className when provided', () => {
      render(<Header className="custom-header" />);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('custom-header');
    });
  });
});

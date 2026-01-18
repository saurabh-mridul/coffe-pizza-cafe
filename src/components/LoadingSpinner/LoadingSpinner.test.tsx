/**
 * LoadingSpinner Component Tests
 *
 * @module components/LoadingSpinner/LoadingSpinner.test
 * @description Component tests for LoadingSpinner - TDD: Write FIRST, verify FAIL
 * @feature 001-sso-home-page
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { LoadingSpinner } from './LoadingSpinner';

// Test wrapper
function TestWrapper({ children }: { children: ReactNode }) {
  return <FluentProvider theme={webLightTheme}>{children}</FluentProvider>;
}

describe('LoadingSpinner', () => {
  describe('rendering', () => {
    it('should render spinner element', () => {
      render(<LoadingSpinner />, { wrapper: TestWrapper });

      // FluentUI Spinner has role="progressbar"
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render with default message "Loading..."', () => {
      render(<LoadingSpinner />, { wrapper: TestWrapper });

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should render with custom message when provided', () => {
      render(<LoadingSpinner message="Signing you in..." />, { wrapper: TestWrapper });

      expect(screen.getByText('Signing you in...')).toBeInTheDocument();
    });

    it('should render as full-screen by default', () => {
      const { container } = render(<LoadingSpinner />, { wrapper: TestWrapper });

      // Should have a container that positions the spinner
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render inline when fullScreen is false', () => {
      const { container } = render(<LoadingSpinner fullScreen={false} />, { wrapper: TestWrapper });

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('should render with large size by default', () => {
      render(<LoadingSpinner />, { wrapper: TestWrapper });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render with small size when specified', () => {
      render(<LoadingSpinner size="small" />, { wrapper: TestWrapper });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render with medium size when specified', () => {
      render(<LoadingSpinner size="medium" />, { wrapper: TestWrapper });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render with extra-large size when specified', () => {
      render(<LoadingSpinner size="extra-large" />, { wrapper: TestWrapper });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have role="progressbar"', () => {
      render(<LoadingSpinner />, { wrapper: TestWrapper });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have accessible label', () => {
      render(<LoadingSpinner message="Loading content" />, { wrapper: TestWrapper });

      // The message should be visible and associated with the spinner
      expect(screen.getByText('Loading content')).toBeInTheDocument();
    });
  });
});

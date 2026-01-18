/**
 * Vitest Setup Configuration
 *
 * @module tests/setup
 * @description Global test setup for Vitest with React Testing Library
 * @feature 001-sso-home-page
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { server } from './mocks/server';

// Initialize i18n for tests
import '../src/i18n/config';

/**
 * MSW Server Lifecycle
 */
beforeAll(() => {
  // Start MSW server before all tests
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  // Reset handlers after each test
  server.resetHandlers();
  // Clean up React components after each test
  cleanup();
});

afterAll(() => {
  // Stop MSW server after all tests
  server.close();
});

/**
 * Mock window.matchMedia for FluentUI components
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock ResizeObserver for FluentUI components
 */
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = ResizeObserverMock;

/**
 * Mock IntersectionObserver
 */
class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

/**
 * Suppress console errors for expected test failures
 * Uncomment if needed during test development
 */
// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args: unknown[]) => {
//     if (
//       typeof args[0] === 'string' &&
//       args[0].includes('Warning: ReactDOM.render is no longer supported')
//     ) {
//       return;
//     }
//     originalError.call(console, ...args);
//   };
// });
// afterAll(() => {
//   console.error = originalError;
// });

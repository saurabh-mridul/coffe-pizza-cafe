/**
 * MSW Server Configuration
 *
 * @module tests/mocks/server
 * @description Mock Service Worker server setup for Node.js (Vitest)
 * @feature 001-sso-home-page
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW Server instance
 *
 * Used in Vitest tests to intercept network requests.
 * Handlers can be extended per-test using server.use()
 */
export const server = setupServer(...handlers);

/**
 * Re-export handlers for test customization
 */
export { handlers } from './handlers';

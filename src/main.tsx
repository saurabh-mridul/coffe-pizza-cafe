/**
 * Application Entry Point
 *
 * @module main
 * @description Root render with all required providers
 * @feature 001-sso-home-page
 */

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider } from '@fluentui/react-components';

import { AuthProvider } from './features/auth';
import { theme } from './theme';
import App from './App';

// Initialize i18n
import './i18n/config';

// Global styles
import './index.css';

/**
 * Root element reference
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element. Check index.html for element with id="root".');
}

/**
 * Render application with all providers
 *
 * Provider hierarchy:
 * 1. StrictMode - React development checks
 * 2. FluentProvider - FluentUI theming
 * 3. AuthProvider - MSAL authentication context
 * 4. Suspense - Handle async loading (i18n, lazy components)
 */
createRoot(rootElement).render(
  <StrictMode>
    <FluentProvider theme={theme}>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </AuthProvider>
    </FluentProvider>
  </StrictMode>
);

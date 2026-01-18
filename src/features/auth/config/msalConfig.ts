/**
 * MSAL Configuration
 *
 * @module features/auth/config/msalConfig
 * @description Microsoft Authentication Library configuration for single-tenant Entra ID
 * @feature 001-sso-home-page
 * @source research.md - MSAL React Integration Research
 */

import { type Configuration, LogLevel } from '@azure/msal-browser';

/**
 * Environment variables validation
 */
const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin;

if (!clientId) {
  console.error('VITE_ENTRA_CLIENT_ID is not configured. Authentication will not work.');
}

if (!tenantId) {
  console.error('VITE_ENTRA_TENANT_ID is not configured. Authentication will not work.');
}

/**
 * MSAL Configuration
 *
 * Single-tenant configuration for Microsoft Entra ID authentication.
 * Uses sessionStorage for security (no cross-tab SSO, but more secure than localStorage).
 */
export const msalConfig: Configuration = {
  auth: {
    // Application (client) ID from Azure Portal
    clientId: clientId || '',

    // Single-tenant: Use specific tenant ID (not "common" or "organizations")
    authority: `https://login.microsoftonline.com/${tenantId || 'common'}`,

    // Redirect URI after authentication (must match Azure Portal config)
    redirectUri,

    // Where to navigate after logout
    postLogoutRedirectUri: redirectUri,

    // If true, navigates back to original request location before processing auth code
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // sessionStorage is more secure than localStorage (no XSS persistence)
    cacheLocation: 'sessionStorage',

    // Only needed for IE11/Edge legacy issues
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return; // Never log PII

        switch (level) {
          case LogLevel.Error:
            console.error('[MSAL]', message);
            return;
          case LogLevel.Warning:
            console.warn('[MSAL]', message);
            return;
          case LogLevel.Info:
            // Only log info in development
            if (import.meta.env.DEV) {
              console.info('[MSAL]', message);
            }
            return;
          case LogLevel.Verbose:
            // Only log verbose in development
            if (import.meta.env.DEV) {
              console.debug('[MSAL]', message);
            }
            return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: import.meta.env.DEV ? LogLevel.Info : LogLevel.Warning,
    },
    // Fallback to popup if redirect fails
  },
};

/**
 * Login Request Configuration
 *
 * Scopes requested during authentication.
 * OpenID scopes (openid, profile, email) provide identity claims.
 * User.Read provides basic profile information.
 */
export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
};

/**
 * Silent Request Configuration
 *
 * Used for token refresh operations.
 */
export const silentRequest = {
  scopes: ['User.Read'],
};

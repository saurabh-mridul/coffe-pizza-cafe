/**
 * MSW Request Handlers
 *
 * @module tests/mocks/handlers
 * @description Mock Service Worker handlers for MSAL authentication mocking
 * @feature 001-sso-home-page
 */

import { http, HttpResponse } from 'msw';

/**
 * Mock user data for authenticated state
 */
export const mockUser = {
  id: 'mock-user-id',
  displayName: 'Test User',
  mail: 'testuser@contoso.com',
  userPrincipalName: 'testuser@contoso.com',
};

/**
 * Mock MSAL account data
 */
export const mockMsalAccount = {
  homeAccountId: 'mock-home-account-id',
  environment: 'login.microsoftonline.com',
  tenantId: 'mock-tenant-id',
  username: 'testuser@contoso.com',
  localAccountId: 'mock-local-account-id',
  name: 'Test User',
  idTokenClaims: {
    aud: 'mock-client-id',
    iss: 'https://login.microsoftonline.com/mock-tenant-id/v2.0',
    iat: Date.now() / 1000,
    nbf: Date.now() / 1000,
    exp: Date.now() / 1000 + 3600,
    name: 'Test User',
    preferred_username: 'testuser@contoso.com',
    oid: 'mock-oid',
    sub: 'mock-sub',
    tid: 'mock-tenant-id',
  },
};

/**
 * MSW Handlers for Microsoft Graph API and MSAL endpoints
 */
export const handlers = [
  // Microsoft Graph - Get user profile
  http.get('https://graph.microsoft.com/v1.0/me', () => {
    return HttpResponse.json(mockUser);
  }),

  // Microsoft Graph - Get user photo (returns 404 - no photo)
  http.get('https://graph.microsoft.com/v1.0/me/photo/$value', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // OIDC well-known configuration (used by MSAL for discovery)
  http.get(
    'https://login.microsoftonline.com/:tenantId/v2.0/.well-known/openid-configuration',
    () => {
      return HttpResponse.json({
        authorization_endpoint:
          'https://login.microsoftonline.com/mock-tenant-id/oauth2/v2.0/authorize',
        token_endpoint: 'https://login.microsoftonline.com/mock-tenant-id/oauth2/v2.0/token',
        issuer: 'https://login.microsoftonline.com/mock-tenant-id/v2.0',
        jwks_uri: 'https://login.microsoftonline.com/mock-tenant-id/discovery/v2.0/keys',
        userinfo_endpoint: 'https://graph.microsoft.com/oidc/userinfo',
        end_session_endpoint: 'https://login.microsoftonline.com/mock-tenant-id/oauth2/v2.0/logout',
      });
    }
  ),
];

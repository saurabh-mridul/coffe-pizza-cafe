/**
 * MSAL Instance Configuration
 *
 * @module features/auth/config/msalInstance
 * @description Creates and exports the MSAL PublicClientApplication instance
 * @feature 001-sso-home-page
 */

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

/**
 * Create MSAL instance outside of React component lifecycle
 * to prevent re-initialization on re-renders.
 *
 * This is exported separately from the AuthProvider component
 * to enable Fast Refresh compatibility in development.
 */
export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Initialize MSAL and set active account
 */
export async function initializeMsal(): Promise<void> {
  // Handle redirect promise (resolves any in-progress auth)
  await msalInstance.initialize();

  // Handle the redirect response
  const response = await msalInstance.handleRedirectPromise();

  if (response) {
    // If we have a response, set the active account
    msalInstance.setActiveAccount(response.account);
  } else {
    // Otherwise, try to get an existing account
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      // Set the first account as active (single-tenant, single account expected)
      msalInstance.setActiveAccount(accounts[0]);
    }
  }
}

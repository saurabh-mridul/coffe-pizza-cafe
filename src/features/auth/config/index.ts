/**
 * Auth Config Barrel Export
 *
 * @module features/auth/config
 * @description Exports MSAL configuration
 * @feature 001-sso-home-page
 */

export { msalConfig, loginRequest, silentRequest } from './msalConfig';
export { msalInstance, initializeMsal } from './msalInstance';

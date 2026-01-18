/**
 * Auth Feature Barrel Export
 *
 * @module features/auth
 * @description Exports all authentication-related components, hooks, and types
 * @feature 001-sso-home-page
 */

// Context and Provider
export { AuthProvider, type AuthProviderProps } from './context';

// Configuration
export { msalConfig, loginRequest, silentRequest, msalInstance, initializeMsal } from './config';

// Types
export type {
  AuthStatus,
  AuthError,
  AuthState,
  UserProfile,
  UserSession,
  AuthActions,
  UseAuthReturn,
  UseSessionTimeoutReturn,
} from './types';

// Hooks
export { useAuth } from './hooks/useAuth';
export { useSessionTimeout } from './hooks/useSessionTimeout';

// Components
export { SignInButton, type SignInButtonProps } from './components/SignInButton';
export { SignOutButton, type SignOutButtonProps } from './components/SignOutButton';
export { AuthErrorBanner, type AuthErrorBannerProps } from './components/AuthErrorBanner';
export { UserGreeting, type UserGreetingProps } from './components/UserGreeting';

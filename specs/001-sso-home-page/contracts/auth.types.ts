/**
 * Authentication Types Contract
 * Feature: 001-sso-home-page
 * Generated: 2026-01-18
 * 
 * These interfaces define the data contracts for authentication.
 * Implementation MUST validate against these types using Zod schemas.
 */

/**
 * User profile information retrieved from Microsoft Graph API.
 * Maps to MS Graph /me endpoint response.
 */
export interface UserProfile {
  /** Unique user identifier (OID from Entra) */
  readonly id: string;
  
  /** Full display name */
  readonly displayName: string;
  
  /** First name (may be undefined if not set in profile) */
  readonly givenName?: string;
  
  /** Last name (may be undefined if not set in profile) */
  readonly surname?: string;
  
  /** Primary email address */
  readonly mail: string;
  
  /** User Principal Name (typically email for org accounts) */
  readonly userPrincipalName: string;
  
  /** Base64 data URL of profile photo (undefined if no photo) */
  readonly avatarUrl?: string;
}

/**
 * Known authentication error codes.
 * Used for error handling and user messaging.
 */
export type AuthErrorCode =
  | 'consent_required'
  | 'interaction_required'
  | 'network_error'
  | 'user_cancelled'
  | 'account_disabled'
  | 'unknown_error';

/**
 * Authentication error information for user display.
 */
export interface AuthError {
  /** Error code for programmatic handling */
  readonly code: AuthErrorCode;
  
  /** User-friendly error message */
  readonly message: string;
  
  /** Timestamp when error occurred */
  readonly timestamp: Date;
  
  /** Whether the user can retry the operation */
  readonly isRetryable: boolean;
}

/**
 * Current authentication state.
 * Drives UI rendering decisions.
 */
export interface AuthenticationState {
  /** Whether user is currently authenticated */
  readonly isAuthenticated: boolean;
  
  /** Whether an auth operation is in progress */
  readonly isLoading: boolean;
  
  /** User profile (null if not authenticated) */
  readonly user: UserProfile | null;
  
  /** Error details (null if no error) */
  readonly error: AuthError | null;
}

/**
 * Authentication actions available to components.
 */
export interface AuthActions {
  /** Initiate sign-in flow via redirect */
  signIn: () => Promise<void>;
  
  /** Initiate sign-out flow */
  signOut: () => Promise<void>;
  
  /** Clear current error state */
  clearError: () => void;
}

/**
 * Combined auth context value (state + actions).
 * Returned by useAuth hook.
 */
export interface AuthContextValue extends AuthenticationState, AuthActions {}

/**
 * Authentication Type Definitions
 *
 * @module features/auth/types
 * @description TypeScript interfaces for authentication state and user data
 * @feature 001-sso-home-page
 * @source data-model.md
 */

/**
 * Authentication status enumeration
 */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

/**
 * Authentication error details
 */
export interface AuthError {
  /** Error code from MSAL or custom */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Original error for debugging */
  originalError?: unknown;
}

/**
 * Current authentication state
 */
export interface AuthState {
  /** Current authentication status */
  status: AuthStatus;
  /** Error details if authentication failed */
  error: AuthError | null;
}

/**
 * User profile information from Microsoft Entra ID
 */
export interface UserProfile {
  /** User's display name (may be null if not set in Entra) */
  displayName: string | null;
  /** User's email address (from preferred_username claim) */
  email: string;
  /** Organization's Entra tenant ID */
  tenantId: string;
}

/**
 * Authenticated user's session
 * Only exists when AuthState.status === 'authenticated'
 */
export interface UserSession {
  /** Unique identifier from MSAL (homeAccountId) */
  accountId: string;
  /** User's identity information */
  profile: UserProfile;
  /** Timestamp of last user interaction (for session timeout) */
  lastActivity: Date;
  /** Session expiration time (8 hours from last activity) */
  expiresAt: Date;
}

/**
 * Authentication actions available to components
 */
export interface AuthActions {
  /** Initiate sign-in flow via redirect to Microsoft Entra */
  signIn: () => Promise<void>;
  /** Sign out current user and clear session */
  signOut: () => Promise<void>;
  /** Manually refresh activity timestamp */
  refreshActivity: () => void;
}

/**
 * Complete return type for useAuth hook
 */
export interface UseAuthReturn extends AuthActions {
  /** Current authentication status */
  status: AuthStatus;
  /** True when status is 'authenticated' */
  isAuthenticated: boolean;
  /** True when status is 'loading' */
  isLoading: boolean;
  /** User profile when authenticated, null otherwise */
  user: UserProfile | null;
  /** Error details if last auth attempt failed */
  error: AuthError | null;
}

/**
 * Return type for useSessionTimeout hook
 */
export interface UseSessionTimeoutReturn {
  /** Time remaining in session (milliseconds) */
  timeRemaining: number;
  /** Whether session is about to expire (< 5 minutes remaining) */
  isExpiringSoon: boolean;
  /** Manually extend session (resets activity timer) */
  extendSession: () => void;
}

/**
 * Component Props Contracts
 * Feature: 001-sso-home-page
 * Generated: 2026-01-18
 * 
 * These interfaces define the props contracts for UI components.
 * Components MUST accept only these props (no additional props spreading).
 */

import type { UserProfile, AuthError } from './auth.types';

/**
 * Props for SignInButton component.
 * Renders Microsoft sign-in button with loading state.
 */
export interface SignInButtonProps {
  /** Click handler to initiate sign-in */
  onSignIn: () => void;
  
  /** Whether sign-in is in progress */
  isLoading?: boolean;
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Props for UserWelcome component.
 * Displays personalized welcome message with avatar.
 */
export interface UserWelcomeProps {
  /** User profile to display */
  user: UserProfile;
  
  /** Click handler for sign-out action */
  onSignOut: () => void;
  
  /** Whether sign-out is in progress */
  isLoading?: boolean;
  
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Props for HeroSection component.
 * Displays cafe branding for unauthenticated users.
 */
export interface HeroSectionProps {
  /** Cafe name to display */
  cafeName: string;
  
  /** Tagline text */
  tagline: string;
  
  /** Hero image source URL */
  heroImageSrc: string;
  
  /** Alt text for hero image (accessibility) */
  heroImageAlt: string;
  
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Props for AuthErrorDisplay component.
 * Shows error message with optional retry action.
 */
export interface AuthErrorDisplayProps {
  /** Error details to display */
  error: AuthError;
  
  /** Handler for retry action (if error is retryable) */
  onRetry?: () => void;
  
  /** Handler to dismiss the error */
  onDismiss: () => void;
  
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Props for HomePage component.
 * Top-level page that composes auth-aware UI.
 */
export interface HomePageProps {
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Props for AuthGuard component.
 * Conditionally renders children based on auth state.
 */
export interface AuthGuardProps {
  /** Content to render when authenticated */
  children: React.ReactNode;
  
  /** Content to render when not authenticated */
  fallback: React.ReactNode;
  
  /** Content to render while checking auth state */
  loadingFallback?: React.ReactNode;
}

/**
 * useSessionTimeout Hook
 *
 * @module features/auth/hooks/useSessionTimeout
 * @description Manages 8-hour sliding session timeout
 * @feature 001-sso-home-page
 */

import { useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import type { UseSessionTimeoutReturn } from '../types';

/** Session timeout in milliseconds (8 hours) */
const SESSION_TIMEOUT_MS = 8 * 60 * 60 * 1000;

/** Warning threshold in milliseconds (5 minutes before timeout) */
const WARNING_THRESHOLD_MS = 5 * 60 * 1000;

/** Activity events that reset the session timer */
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'] as const;

/**
 * Session state store for useSyncExternalStore
 * Module-level singleton to avoid ref access during render
 */
interface SessionState {
  timeRemaining: number;
  isExpiringSoon: boolean;
}

let sessionState: SessionState = {
  timeRemaining: SESSION_TIMEOUT_MS,
  isExpiringSoon: false,
};
const sessionListeners = new Set<() => void>();

function getSessionState(): SessionState {
  return sessionState;
}

function setSessionState(newState: SessionState): void {
  sessionState = newState;
  sessionListeners.forEach((listener) => listener());
}

function subscribeToSession(listener: () => void): () => void {
  sessionListeners.add(listener);
  return () => sessionListeners.delete(listener);
}

function resetSessionState(timeoutMs: number): void {
  sessionState = { timeRemaining: timeoutMs, isExpiringSoon: false };
  sessionListeners.forEach((listener) => listener());
}

/**
 * useSessionTimeout Hook
 *
 * Manages an 8-hour sliding session timeout.
 * Automatically tracks user activity and triggers sign-out when expired.
 *
 * @param timeoutMs - Session timeout in milliseconds (default: 8 hours)
 * @returns {UseSessionTimeoutReturn} Session timeout state and controls
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isExpiringSoon, extendSession } = useSessionTimeout();
 *
 *   if (isExpiringSoon) {
 *     return <SessionWarning onExtend={extendSession} />;
 *   }
 *
 *   return <MainContent />;
 * }
 * ```
 */
export function useSessionTimeout(timeoutMs: number = SESSION_TIMEOUT_MS): UseSessionTimeoutReturn {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const lastActivityRef = useRef<number>(0);

  // Use useSyncExternalStore to subscribe to state changes
  const state = useSyncExternalStore(subscribeToSession, getSessionState, getSessionState);

  // Update activity timestamp
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    const currentState = getSessionState();
    if (currentState.isExpiringSoon) {
      setSessionState({
        ...currentState,
        isExpiringSoon: false,
      });
    }
  }, []);

  // Extend session (reset timer)
  const extendSession = useCallback(() => {
    updateActivity();
  }, [updateActivity]);

  // Handle session expiration
  const handleSessionExpired = useCallback(async () => {
    console.info('[Session] Session expired due to inactivity');
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('[Session] Logout error:', error);
    }
  }, [instance]);

  // Set up activity tracking and session monitoring
  useEffect(() => {
    if (!isAuthenticated) {
      resetSessionState(timeoutMs);
      return;
    }

    // Track user activity
    const handleActivity = () => {
      updateActivity();
    };

    // Add event listeners
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Initialize activity timestamp
    lastActivityRef.current = Date.now();

    // Check remaining time periodically
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = Math.max(0, timeoutMs - elapsed);
      const expiringSoon = remaining > 0 && remaining <= WARNING_THRESHOLD_MS;

      setSessionState({
        timeRemaining: remaining,
        isExpiringSoon: expiringSoon,
      });

      // Session expired
      if (remaining <= 0) {
        handleSessionExpired();
      }
    }, 1000); // Check every second

    // Cleanup
    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(intervalId);
    };
  }, [isAuthenticated, timeoutMs, updateActivity, handleSessionExpired]);

  return {
    timeRemaining: state.timeRemaining,
    isExpiringSoon: state.isExpiringSoon,
    extendSession,
  };
}

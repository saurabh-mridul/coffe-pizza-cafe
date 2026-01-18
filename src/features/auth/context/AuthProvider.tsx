/**
 * Authentication Provider
 *
 * @module features/auth/context/AuthProvider
 * @description Wraps the application with MSAL authentication context
 * @feature 001-sso-home-page
 */

import { type ReactNode, useEffect, useState } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { Spinner, makeStyles, tokens } from '@fluentui/react-components';
import { EventType, type EventMessage, type AuthenticationResult } from '@azure/msal-browser';
import { msalInstance, initializeMsal } from '../config/msalInstance';

/**
 * Props for AuthProvider
 */
export interface AuthProviderProps {
  /** Child components to render within the provider */
  children: ReactNode;
}

const useStyles = makeStyles({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

/**
 * AuthProvider Component
 *
 * Wraps the application with MsalProvider for authentication support.
 * Handles MSAL initialization and account selection.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    // Initialize MSAL on mount
    initializeMsal()
      .then(() => setIsInitialized(true))
      .catch((error) => {
        console.error('MSAL initialization error:', error);
        setIsInitialized(true); // Still render children even on error
      });

    // Listen for login success events to set active account
    const callbackId = msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const result = event.payload as AuthenticationResult;
        msalInstance.setActiveAccount(result.account);
      }
    });

    return () => {
      // Cleanup event callback on unmount
      if (callbackId) {
        msalInstance.removeEventCallback(callbackId);
      }
    };
  }, []);

  // Show loading spinner while MSAL initializes
  if (!isInitialized) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Initializing..." />
      </div>
    );
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}

/**
 * SignInButton Component
 *
 * @module features/auth/components/SignInButton/SignInButton
 * @description Button that initiates Microsoft SSO login
 * @feature 001-sso-home-page
 */

import { useCallback, useState } from 'react';
import { Button, type ButtonProps } from '@fluentui/react-components';
import { PersonRegular } from '@fluentui/react-icons';
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../../config/msalConfig';

/**
 * SignInButton Props
 */
export interface SignInButtonProps {
  /** Override button size (default: 'medium') */
  size?: ButtonProps['size'];
  /** Override button appearance (default: 'primary') */
  appearance?: ButtonProps['appearance'];
  /** Custom button text (default: 'Sign in with Microsoft') */
  label?: string;
  /** Called after sign-in completes successfully */
  onSignInComplete?: () => void;
  /** Called if sign-in fails */
  onSignInError?: (error: Error) => void;
}

/**
 * SignInButton Component
 *
 * Renders a FluentUI Button that initiates Microsoft SSO login.
 * Uses redirect flow for better browser compatibility.
 *
 * @example
 * ```tsx
 * <SignInButton />
 * <SignInButton size="large" appearance="primary" />
 * <SignInButton
 *   label="Sign in"
 *   onSignInError={(error) => console.error(error)}
 * />
 * ```
 */
export function SignInButton({
  size = 'medium',
  appearance = 'primary',
  label,
  onSignInComplete,
  onSignInError,
}: SignInButtonProps): React.JSX.Element {
  const { instance } = useMsal();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const buttonLabel = label ?? t('auth.signIn');

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await instance.loginRedirect(loginRequest);
      // onSignInComplete is called after redirect returns (in AuthProvider)
      onSignInComplete?.();
    } catch (error) {
      console.error('Sign-in error:', error);
      onSignInError?.(error instanceof Error ? error : new Error('Sign-in failed'));
      setIsLoading(false);
    }
  }, [instance, onSignInComplete, onSignInError]);

  return (
    <Button
      size={size}
      appearance={appearance}
      icon={<PersonRegular />}
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? t('auth.signingIn') : buttonLabel}
    </Button>
  );
}

/**
 * SignOutButton Component
 *
 * @module features/auth/components/SignOutButton/SignOutButton
 * @description Button that signs out the current user
 * @feature 001-sso-home-page
 */

import { useCallback, useState } from 'react';
import { Button, type ButtonProps } from '@fluentui/react-components';
import { SignOutRegular } from '@fluentui/react-icons';
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';

/**
 * SignOutButton Props
 */
export interface SignOutButtonProps {
  /** Override button size (default: 'medium') */
  size?: ButtonProps['size'];
  /** Override button appearance (default: 'subtle') */
  appearance?: ButtonProps['appearance'];
  /** Custom button text (default: 'Sign out') */
  label?: string;
  /** Called after sign-out completes */
  onSignOutComplete?: () => void;
}

/**
 * SignOutButton Component
 *
 * Renders a FluentUI Button that signs out the current user.
 * Redirects to Microsoft for complete sign-out.
 *
 * @example
 * ```tsx
 * <SignOutButton />
 * <SignOutButton appearance="subtle" label="Log out" />
 * ```
 */
export function SignOutButton({
  size = 'medium',
  appearance = 'subtle',
  label,
  onSignOutComplete,
}: SignOutButtonProps): React.JSX.Element {
  const { instance } = useMsal();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const buttonLabel = label ?? t('auth.signOut');

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      onSignOutComplete?.();
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('Sign-out error:', error);
      setIsLoading(false);
    }
  }, [instance, onSignOutComplete]);

  return (
    <Button
      size={size}
      appearance={appearance}
      icon={<SignOutRegular />}
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? t('auth.signingOut') : buttonLabel}
    </Button>
  );
}

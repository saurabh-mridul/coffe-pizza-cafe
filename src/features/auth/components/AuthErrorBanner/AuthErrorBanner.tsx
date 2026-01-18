/**
 * AuthErrorBanner Component
 *
 * @module features/auth/components/AuthErrorBanner/AuthErrorBanner
 * @description Displays authentication error messages
 * @feature 001-sso-home-page
 */

import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  MessageBarActions,
  Button,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import type { AuthError } from '../../types';

/**
 * AuthErrorBanner Props
 */
export interface AuthErrorBannerProps {
  /** Error to display */
  error: AuthError;
  /** Called when user dismisses the error */
  onDismiss?: () => void;
  /** Whether the banner can be dismissed (default: true) */
  dismissible?: boolean;
}

const useStyles = makeStyles({
  banner: {
    marginBottom: tokens.spacingVerticalM,
  },
});

/**
 * AuthErrorBanner Component
 *
 * Displays an authentication error in a FluentUI MessageBar.
 * Can be dismissed by the user.
 *
 * @example
 * ```tsx
 * {error && (
 *   <AuthErrorBanner
 *     error={error}
 *     onDismiss={() => setError(null)}
 *   />
 * )}
 * ```
 */
export function AuthErrorBanner({
  error,
  onDismiss,
  dismissible = true,
}: AuthErrorBannerProps): React.JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  // Map error codes to user-friendly messages
  const getErrorMessage = (err: AuthError): string => {
    switch (err.code) {
      case 'user_cancelled':
        return t('auth.error.cancelled');
      case 'popup_window_error':
        return t('auth.error.popupBlocked');
      case 'network_error':
        return t('auth.error.networkError');
      default:
        return err.message || t('auth.error.generic');
    }
  };

  return (
    <MessageBar intent="error" className={styles.banner} layout="multiline">
      <MessageBarBody>
        <MessageBarTitle>{t('auth.error.title')}</MessageBarTitle>
        {getErrorMessage(error)}
      </MessageBarBody>
      {dismissible && onDismiss && (
        <MessageBarActions
          containerAction={
            <Button
              appearance="transparent"
              icon={<DismissRegular />}
              onClick={onDismiss}
              aria-label="Dismiss error"
            />
          }
        />
      )}
    </MessageBar>
  );
}

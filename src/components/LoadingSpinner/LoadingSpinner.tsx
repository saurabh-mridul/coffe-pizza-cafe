/**
 * LoadingSpinner Component
 *
 * @module components/LoadingSpinner/LoadingSpinner
 * @description Full-screen or inline loading indicator with optional message
 * @feature 001-sso-home-page
 */

import { Spinner, makeStyles, tokens } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';

/**
 * LoadingSpinner Props
 */
export interface LoadingSpinnerProps {
  /** Message to display below spinner (default: 'Loading...') */
  message?: string;
  /** Spinner size (default: 'large') */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
  /** Whether to render as full-screen overlay (default: true) */
  fullScreen?: boolean;
}

const useStyles = makeStyles({
  fullScreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1000,
    gap: tokens.spacingVerticalM,
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXL,
    gap: tokens.spacingVerticalM,
  },
  message: {
    color: tokens.colorNeutralForeground2,
  },
});

/**
 * LoadingSpinner Component
 *
 * Displays a FluentUI Spinner with an optional message.
 * Can be rendered as full-screen overlay or inline.
 *
 * @example
 * ```tsx
 * // Full-screen loading
 * <LoadingSpinner message="Signing you in..." />
 *
 * // Inline loading
 * <LoadingSpinner fullScreen={false} size="small" />
 * ```
 */
export function LoadingSpinner({
  message,
  size = 'large',
  fullScreen = true,
}: LoadingSpinnerProps): React.JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  const displayMessage = message ?? t('loading.default');
  const containerClass = fullScreen ? styles.fullScreenContainer : styles.inlineContainer;

  return (
    <div className={containerClass}>
      <Spinner size={size} label={displayMessage} labelPosition="below" />
    </div>
  );
}

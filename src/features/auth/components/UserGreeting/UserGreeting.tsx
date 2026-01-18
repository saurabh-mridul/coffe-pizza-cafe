/**
 * UserGreeting Component
 *
 * @module features/auth/components/UserGreeting/UserGreeting
 * @description Displays personalized welcome message with user's display name
 * @feature 001-sso-home-page
 */

import { Text, makeStyles, tokens, mergeClasses } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';

/**
 * UserGreeting Props
 */
export interface UserGreetingProps {
  /** Fallback text when display name is null (default: empty, shows "Welcome!") */
  fallbackName?: string;
  /** Custom greeting prefix (default: 'Welcome') */
  greetingPrefix?: string;
  /** Additional CSS class name */
  className?: string;
}

const useStyles = makeStyles({
  greeting: {
    display: 'block',
    color: tokens.colorNeutralForeground1,
  },
  userName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
});

/**
 * UserGreeting Component
 *
 * Displays personalized welcome message with user's display name.
 * Falls back to generic greeting if display name is unavailable.
 *
 * @example
 * ```tsx
 * // Personalized: "Welcome, John Smith!"
 * <UserGreeting />
 *
 * // With fallback: "Welcome, User!" (if no display name)
 * <UserGreeting fallbackName="User" />
 *
 * // Custom prefix: "Hello, John Smith!"
 * <UserGreeting greetingPrefix="Hello" />
 * ```
 */
export function UserGreeting({
  fallbackName,
  greetingPrefix,
  className,
}: UserGreetingProps): React.JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  // Determine the display name
  const displayName = user?.displayName || fallbackName || null;
  const prefix = greetingPrefix || t('greeting.welcome');

  // Build the greeting message
  let greetingText: string;

  if (!isAuthenticated) {
    greetingText = t('greeting.welcomeGuest');
  } else if (displayName) {
    greetingText = t('greeting.welcomeUser', { name: displayName });
  } else {
    // Authenticated but no display name - use prefix with exclamation
    greetingText = `${prefix}!`;
  }

  return (
    <Text size={500} className={mergeClasses(styles.greeting, className)} as="p">
      {greetingText}
    </Text>
  );
}

/**
 * HomePage Component
 *
 * @module HomePage
 * @description Main landing page with welcome message and authentication
 * @feature 001-sso-home-page
 */

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { makeStyles, mergeClasses, tokens, Title1, Text } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { SignInButton, SignOutButton, UserGreeting } from '@/features/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

/**
 * HomePage component props
 */
export interface HomePageProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * HomePage styles using FluentUI makeStyles
 */
const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 73px)', // Subtract header height
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    padding: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
  },
  title: {
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorBrandForeground1,
  },
  subtitle: {
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground2,
  },
  authSection: {
    marginTop: tokens.spacingVerticalL,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
  },
  signInPrompt: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 73px)',
  },
});

/**
 * HomePage component with authentication-aware content
 *
 * @param props - HomePage component props
 * @returns HomePage component JSX
 *
 * @example
 * ```tsx
 * <HomePage />
 * <HomePage className="custom-home" />
 * ```
 */
export function HomePage({ className }: HomePageProps): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
  const { inProgress } = useMsal();

  // Show loading during authentication interaction
  if (inProgress !== InteractionStatus.None) {
    return (
      <main className={mergeClasses(styles.loadingContainer, className)} role="main" id="main-content" aria-busy="true" aria-live="polite">
        <LoadingSpinner size="large" message={t('loading.authenticating')} />
      </main>
    );
  }

  return (
    <main className={mergeClasses(styles.main, className)} role="main" id="main-content">
      <div className={styles.content}>
        <Title1 as="h1" className={styles.title}>
          {t('home.title')}
        </Title1>
        <Text className={styles.subtitle} size={400} block>
          {t('home.subtitle')}
        </Text>

        <AuthenticatedTemplate>
          <div className={styles.authSection}>
            <UserGreeting />
            <SignOutButton />
          </div>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <div className={styles.authSection}>
            <Text className={styles.signInPrompt} size={300}>
              {t('home.signInPrompt')}
            </Text>
            <SignInButton />
          </div>
        </UnauthenticatedTemplate>
      </div>
    </main>
  );
}

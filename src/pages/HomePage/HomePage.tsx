/**
 * HomePage Component
 *
 * @module pages/HomePage/HomePage
 * @description Main landing page with authentication-aware content
 * @feature 001-sso-home-page
 */

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import {
  makeStyles,
  tokens,
  Title1,
  Title3,
  Text,
  Card,
  CardHeader,
} from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { UserGreeting, SignInButton } from '@/features/auth';

/**
 * HomePage Props
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  content: {
    textAlign: 'left',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
  },
  subtitle: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground2,
  },
  card: {
    padding: tokens.spacingHorizontalXL,
    marginTop: tokens.spacingVerticalXL,
  },
  welcomeSection: {
    marginBottom: tokens.spacingVerticalXL,
  },
  signInSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
  },
  signInText: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
  },
});

/**
 * HomePage Component
 *
 * Main landing page that displays:
 * - Authenticated: Personalized greeting with user info
 * - Unauthenticated: Welcome message with sign-in prompt
 *
 * @example
 * ```tsx
 * <HomePage />
 * ```
 */
export function HomePage({ className }: HomePageProps): React.JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <main className={`${styles.main} ${className ?? ''}`}>
      <div className={styles.content}>
        <Title1 className={styles.title}>{t('home.title')}</Title1>
        <Text className={styles.subtitle} size={400}>
          {t('home.subtitle')}
        </Text>

        <AuthenticatedTemplate>
          <Card className={styles.card}>
            <CardHeader
              header={
                <div className={styles.welcomeSection}>
                  <UserGreeting />
                </div>
              }
            />
          </Card>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <Card className={styles.card}>
            <CardHeader
              header={
                <div className={styles.signInSection}>
                  <Title3>{t('greeting.welcomeGuest')}</Title3>
                  <Text className={styles.signInText}>{t('home.signInPrompt')}</Text>
                  <SignInButton size="large" />
                </div>
              }
            />
          </Card>
        </UnauthenticatedTemplate>
      </div>
    </main>
  );
}

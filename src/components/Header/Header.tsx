/**
 * Header Component
 *
 * @module Header
 * @description Application header with brand logo and authentication controls
 * @feature 001-sso-home-page
 */

import { useIsAuthenticated } from '@azure/msal-react';
import { makeStyles, mergeClasses, tokens, Text } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { SignInButton, SignOutButton } from '@/features/auth';
import logoSrc from '@/assets/logo.svg';

/**
 * Header component props
 */
export interface HeaderProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Header styles using FluentUI makeStyles
 */
const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  },
  brandName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorBrandForeground1,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
});

/**
 * Header component with brand logo and authentication controls
 *
 * @param props - Header component props
 * @returns Header component JSX
 *
 * @example
 * ```tsx
 * <Header />
 * <Header className="custom-header" />
 * ```
 */
export function Header({ className }: HeaderProps): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className={mergeClasses(styles.header, className)}>
      <a href="/" className={styles.brand}>
        <img src={logoSrc} alt="Coffee-Pizza Cafe Logo" className={styles.logo} role="img" />
        <Text className={styles.brandName}>{t('header.brand')}</Text>
      </a>
      <nav className={styles.nav} aria-label="Main navigation">
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </nav>
    </header>
  );
}

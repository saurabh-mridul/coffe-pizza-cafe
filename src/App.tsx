/**
 * App Component
 *
 * @module App
 * @description Root application component with Header and HomePage
 * @feature 001-sso-home-page
 */

import { makeStyles, tokens } from '@fluentui/react-components';
import { Header } from '@/components';
import { HomePage } from '@/pages/HomePage';

/**
 * App styles using FluentUI makeStyles
 */
const useStyles = makeStyles({
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  skipLink: {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    ':focus': {
      position: 'fixed',
      top: tokens.spacingVerticalS,
      left: tokens.spacingHorizontalS,
      width: 'auto',
      height: 'auto',
      padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
      zIndex: 1000,
      borderRadius: tokens.borderRadiusMedium,
      textDecoration: 'none',
      fontWeight: tokens.fontWeightSemibold,
    },
  },
});

/**
 * Main App component
 *
 * Renders the application shell with Header and HomePage
 */
function App(): JSX.Element {
  const styles = useStyles();

  return (
    <div className={styles.app}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;

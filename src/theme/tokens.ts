/**
 * FluentUI Token Overrides
 *
 * @module theme/tokens
 * @description Custom token overrides for Coffee-Pizza Cafe branding
 * @feature 001-sso-home-page
 */

/**
 * Custom token overrides for Coffee-Pizza Cafe brand
 * These extend or override the default FluentUI theme tokens
 */
export const tokens = {
  // Typography enhancements for brand identity
  fontFamilyBase:
    "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",

  // Spacing adjustments for comfortable cafe feel
  spacingHorizontalM: '12px',
  spacingVerticalM: '12px',

  // Border radius for softer, welcoming appearance
  borderRadiusMedium: '8px',
  borderRadiusLarge: '12px',

  // Shadow for subtle depth
  shadow4: '0 2px 4px rgba(107, 66, 35, 0.1)',
  shadow8: '0 4px 8px rgba(107, 66, 35, 0.15)',
  shadow16: '0 8px 16px rgba(107, 66, 35, 0.2)',
};

/**
 * Semantic color tokens for specific UI contexts
 */
export const semanticTokens = {
  // Success state (order confirmed, sign-in successful)
  colorStatusSuccess: '#107C10',
  colorStatusSuccessBackground: '#DFF6DD',

  // Warning state (session expiring soon)
  colorStatusWarning: '#FFB900',
  colorStatusWarningBackground: '#FFF4CE',

  // Error state (authentication failed)
  colorStatusError: '#D13438',
  colorStatusErrorBackground: '#FDE7E9',

  // Info state (general information)
  colorStatusInfo: '#0078D4',
  colorStatusInfoBackground: '#EFF6FC',
};

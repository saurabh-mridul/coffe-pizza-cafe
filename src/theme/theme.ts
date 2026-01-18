/**
 * FluentUI Theme Configuration
 *
 * @module theme/theme
 * @description Creates the Coffee-Pizza Cafe branded theme using FluentUI v9
 * @feature 001-sso-home-page
 */

import { createLightTheme, createDarkTheme, type BrandVariants } from '@fluentui/react-components';
import { tokens } from './tokens';

/**
 * Coffee-Pizza Cafe brand colors
 * Primary: Warm brown (coffee) with accent orange-red (pizza/tomato)
 */
export const coffeePizzaBrand: BrandVariants = {
  10: '#1A0F08',
  20: '#2D1B10',
  30: '#412817',
  40: '#55351F',
  50: '#6B4226',
  60: '#814F2E',
  70: '#975C35',
  80: '#AD693D',
  90: '#C47745',
  100: '#DB844C',
  110: '#E49462',
  120: '#ECA478',
  130: '#F4B48E',
  140: '#FBC4A4',
  150: '#FFD4BA',
  160: '#FFE4D0',
};

/**
 * Light theme for Coffee-Pizza Cafe
 * Uses the brand colors with FluentUI's light theme foundation
 */
export const coffeePizzaLightTheme = {
  ...createLightTheme(coffeePizzaBrand),
  ...tokens,
};

/**
 * Dark theme for Coffee-Pizza Cafe (optional, for future use)
 */
export const coffeePizzaDarkTheme = {
  ...createDarkTheme(coffeePizzaBrand),
  ...tokens,
};

/**
 * Default theme export
 */
export const theme = coffeePizzaLightTheme;

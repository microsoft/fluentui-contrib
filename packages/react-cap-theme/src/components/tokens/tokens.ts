import { tokens as fluentTokens } from '@fluentui/tokens';
import type { TokenName } from './types';

/**
 * @public
 * List of tokens with their CSS variable as values
 */
export const tokens: Record<TokenName, string> = {
  ...fluentTokens,

  // ProjectTurtle global font families
  fontFamilyCustomFont100: 'var(--fontFamilyCustomFont100)',
  fontFamilyCustomFont200: 'var(--fontFamilyCustomFont200)',
  fontFamilyCustomFont300: 'var(--fontFamilyCustomFont300)',
  fontFamilyCustomFont400: 'var(--fontFamilyCustomFont400)',
  fontFamilyCustomFont500: 'var(--fontFamilyCustomFont500)',
  fontFamilyCustomFont600: 'var(--fontFamilyCustomFont600)',
  fontFamilyCustomFont700: 'var(--fontFamilyCustomFont700)',
  fontFamilyCustomFont800: 'var(--fontFamilyCustomFont800)',
  fontFamilyCustomFont900: 'var(--fontFamilyCustomFont900)',
  fontFamilyCustomFont1000: 'var(--fontFamilyCustomFont1000)',
  fontFamilyCustomFont1100: 'var(--fontFamilyCustomFont1100)',
  fontFamilyCustomFont1200: 'var(--fontFamilyCustomFont1200)',
  fontFamilyCustomFont1300: 'var(--fontFamilyCustomFont1300)',
  fontFamilyCustomFont1400: 'var(--fontFamilyCustomFont1400)',
  fontFamilyCustomFont1500: 'var(--fontFamilyCustomFont1500)',
  fontFamilyCustomFont1600: 'var(--fontFamilyCustomFont1600)',
  fontFamilyCustomFont1700: 'var(--fontFamilyCustomFont1700)',

  // ProjectTurtle global font sizes
  fontSizeBase450: 'var(--fontSizeBase450)',

  // ProjectTurtle global font styles
  fontStyleItalic: 'var(--fontStyleItalic)',
  fontStyleRegular: 'var(--fontStyleRegular)',

  // ProjectTurtle global font weights
  fontWeightCustomFont100: 'var(--fontWeightCustomFont100)',
  fontWeightCustomFont200: 'var(--fontWeightCustomFont200)',
  fontWeightCustomFont300: 'var(--fontWeightCustomFont300)',
  fontWeightCustomFont400: 'var(--fontWeightCustomFont400)',
  fontWeightCustomFont500: 'var(--fontWeightCustomFont500)',
  fontWeightCustomFont600: 'var(--fontWeightCustomFont600)',
  fontWeightCustomFont700: 'var(--fontWeightCustomFont700)',
  fontWeightCustomFont800: 'var(--fontWeightCustomFont800)',
  fontWeightCustomFont900: 'var(--fontWeightCustomFont900)',
  fontWeightCustomFont1000: 'var(--fontWeightCustomFont1000)',
  fontWeightCustomFont1100: 'var(--fontWeightCustomFont1100)',
  fontWeightCustomFont1200: 'var(--fontWeightCustomFont1200)',
  fontWeightCustomFont1300: 'var(--fontWeightCustomFont1300)',
  fontWeightCustomFont1400: 'var(--fontWeightCustomFont1400)',
  fontWeightCustomFont1500: 'var(--fontWeightCustomFont1500)',
  fontWeightCustomFont1600: 'var(--fontWeightCustomFont1600)',
  fontWeightCustomFont1700: 'var(--fontWeightCustomFont1700)',

  // ProjectTurtle global line heights
  lineHeightBase450: 'var(--lineHeightBase450)'
};

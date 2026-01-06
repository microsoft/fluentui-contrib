import type { FontVariants, FontFamilyCustomFontTokens } from '../../types';

/**
 * Generates alias tokens that stored the custom font families
 * @param font - Font Variants
 * @returns ProjectTurtle design tokens for alias font families
 */
export const generateTokens = (font: FontVariants): FontFamilyCustomFontTokens => ({
  fontFamilyCustomFont100: font[100].fontFamily,
  fontFamilyCustomFont200: font[200].fontFamily,
  fontFamilyCustomFont300: font[300].fontFamily,
  fontFamilyCustomFont400: font[400].fontFamily,
  fontFamilyCustomFont500: font[500].fontFamily,
  fontFamilyCustomFont600: font[600].fontFamily,
  fontFamilyCustomFont700: font[700].fontFamily,
  fontFamilyCustomFont800: font[800].fontFamily,
  fontFamilyCustomFont900: font[900].fontFamily,
  fontFamilyCustomFont1000: font[1000].fontFamily,
  fontFamilyCustomFont1100: font[1100].fontFamily,
  fontFamilyCustomFont1200: font[1200].fontFamily,
  fontFamilyCustomFont1300: font[1300].fontFamily,
  fontFamilyCustomFont1400: font[1400].fontFamily,
  fontFamilyCustomFont1500: font[1500].fontFamily,
  fontFamilyCustomFont1600: font[1600].fontFamily,
  fontFamilyCustomFont1700: font[1700].fontFamily
});

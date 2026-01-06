import type { BrandVariants, Theme as FluentTheme } from '@fluentui/tokens';
import { createLightTheme as createFluentLightTheme } from '@fluentui/tokens';
import { generateBrandColorTokens } from '../alias/colors/lightColor';
import { generateFontFamilyTokens, generateFontWeightTokens } from '../alias/fonts';
import { brandProjectTurtle } from '../global/brandColors';
import { fontSizes, fontStyles, lineHeights } from '../global/fonts';
import type { FontFamilyCustomFontTokens, FontVariants, FontWeightCustomFontTokens, Theme } from '../types';

/**
 * @public
 * Creates ProjectTurtle Design System light theme
 * @param brand - Brand Variants
 * @param font - Font Variants
 * @returns Theme
 */
export const createLightTheme: (brand?: BrandVariants, font?: FontVariants) => Theme = (
  brand = brandProjectTurtle,
  font
) => {
  const fluentTheme: FluentTheme = createFluentLightTheme(brand);
  const fontFamilies: FontFamilyCustomFontTokens | undefined = font && generateFontFamilyTokens(font);
  const fontWeights: Partial<FontWeightCustomFontTokens> | undefined = font && generateFontWeightTokens(font);

  return {
    ...fluentTheme,
    ...fontFamilies,
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...lineHeights,
    ...generateBrandColorTokens(brand)
  };
};

import type { BrandVariants, Theme as FluentTheme } from '@fluentui/tokens';
import { createLightTheme as createFluentLightTheme } from '@fluentui/tokens';
import { generateBrandColorTokens } from '../alias/colors/lightColor';
import {
  generateFontFamilyTokens,
  generateFontWeightTokens,
} from '../alias/fonts';
import { brandCAP } from '../global/brandColors';
import { fontSizes, fontStyles, lineHeights } from '../global/fonts';
import {
  FIXME_MISSING_TOKENS_DEFAULTS,
  type FontFamilyCustomFontTokens,
  type FontVariants,
  type FontWeightCustomFontTokens,
  type Theme,
} from '../types';

export const createLightTheme: (
  brand?: BrandVariants,
  font?: FontVariants
) => Theme = (brand = brandCAP, font) => {
  const fluentTheme: FluentTheme = createFluentLightTheme(brand);
  const fontFamilies: FontFamilyCustomFontTokens | undefined =
    font && generateFontFamilyTokens(font);
  const fontWeights: Partial<FontWeightCustomFontTokens> | undefined =
    font && generateFontWeightTokens(font);

  return {
    ...FIXME_MISSING_TOKENS_DEFAULTS,
    ...fluentTheme,
    ...fontFamilies,
    ...fontSizes,
    ...fontStyles,
    ...fontWeights,
    ...lineHeights,
    ...generateBrandColorTokens(brand),
  };
};

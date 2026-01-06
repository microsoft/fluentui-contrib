import { typographyStyles as defaultTypographyStyles } from '@fluentui/tokens';
import { tokens } from '../tokens';
import type { Font, TypographyStyle, TypographyStyles } from '../types';

/**
 * @public
 * Global typography styles
 */
export const typographyStyles: TypographyStyles = {
  ...defaultTypographyStyles,
  custom: {
    body1: createVariableFallback(700, {
      ...defaultTypographyStyles.body1,
      fontStyle: tokens.fontStyleRegular
    }),
    body1Mono: createVariableFallback(700, {
      ...defaultTypographyStyles.body1,
      fontFamily: tokens.fontFamilyMonospace,
      fontStyle: tokens.fontStyleRegular
    }),
    body1Strong: createVariableFallback(700, {
      ...defaultTypographyStyles.body1Strong,
      fontStyle: tokens.fontStyleRegular
    }),
    body1Stronger: createVariableFallback(700, {
      ...defaultTypographyStyles.body1Stronger,
      fontStyle: tokens.fontStyleRegular
    }),
    body2: createVariableFallback(800, {
      ...defaultTypographyStyles.body2,
      fontStyle: tokens.fontStyleRegular
    }),
    body2Italic: createVariableFallback(800, {
      ...defaultTypographyStyles.body2,
      fontStyle: tokens.fontStyleItalic
    }),
    body2Mono: createVariableFallback(800, {
      ...defaultTypographyStyles.body2,
      fontFamily: tokens.fontFamilyMonospace,
      fontStyle: tokens.fontStyleRegular
    }),
    body3: createVariableFallback(900, {
      fontFamily: tokens.fontFamilyBase,
      fontSize: tokens.fontSizeBase450,
      fontStyle: tokens.fontStyleRegular,
      fontWeight: tokens.fontWeightRegular,
      lineHeight: tokens.lineHeightBase450
    }),
    body3Strong: createVariableFallback(900, {
      fontFamily: tokens.fontFamilyBase,
      fontSize: tokens.fontSizeBase450,
      fontStyle: tokens.fontStyleRegular,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase450
    }),
    buttonLarge: createVariableFallback(600, {
      ...defaultTypographyStyles.subtitle2,
      fontStyle: tokens.fontStyleRegular
    }),
    buttonMedium: createVariableFallback(500, {
      ...defaultTypographyStyles.body1Strong,
      fontStyle: tokens.fontStyleRegular
    }),
    buttonSmall: createVariableFallback(400, {
      ...defaultTypographyStyles.caption1,
      fontStyle: tokens.fontStyleRegular
    }),
    caption1: createVariableFallback(200, {
      ...defaultTypographyStyles.caption1,
      fontStyle: tokens.fontStyleRegular
    }),
    caption1Strong: createVariableFallback(200, {
      ...defaultTypographyStyles.caption1Strong,
      fontStyle: tokens.fontStyleRegular
    }),
    caption1Stronger: createVariableFallback(200, {
      ...defaultTypographyStyles.caption1Stronger,
      fontStyle: tokens.fontStyleRegular
    }),
    caption2: createVariableFallback(100, {
      ...defaultTypographyStyles.caption2,
      fontStyle: tokens.fontStyleRegular
    }),
    caption2Strong: createVariableFallback(100, {
      ...defaultTypographyStyles.caption2Strong,
      fontStyle: tokens.fontStyleRegular
    }),
    heading2: createVariableFallback(1300, {
      ...defaultTypographyStyles.title2,
      fontStyle: tokens.fontStyleRegular
    }),
    heading3: createVariableFallback(1200, {
      ...defaultTypographyStyles.title3,
      fontStyle: tokens.fontStyleRegular
    }),
    heading4: createVariableFallback(1100, {
      ...defaultTypographyStyles.subtitle1,
      fontStyle: tokens.fontStyleRegular
    }),
    subtitle1: createVariableFallback(1100, {
      ...defaultTypographyStyles.subtitle1,
      fontStyle: tokens.fontStyleRegular
    }),
    subtitle1Italic: createVariableFallback(1100, {
      ...defaultTypographyStyles.subtitle1,
      fontStyle: tokens.fontStyleItalic
    }),
    subtitle2: createVariableFallback(1000, {
      ...defaultTypographyStyles.subtitle2,
      fontStyle: tokens.fontStyleRegular
    }),
    subtitle2Stronger: createVariableFallback(1000, {
      ...defaultTypographyStyles.subtitle2Stronger,
      fontStyle: tokens.fontStyleRegular
    }),
    title1: createVariableFallback(1400, {
      ...defaultTypographyStyles.title1,
      fontStyle: tokens.fontStyleRegular
    }),
    title2: createVariableFallback(1300, {
      ...defaultTypographyStyles.title2,
      fontStyle: tokens.fontStyleRegular
    }),
    title3: createVariableFallback(1200, {
      ...defaultTypographyStyles.title3,
      fontStyle: tokens.fontStyleRegular
    }),
    largeTitle: createVariableFallback(1500, {
      ...defaultTypographyStyles.largeTitle,
      fontStyle: tokens.fontStyleRegular
    }),
    display: createVariableFallback(1600, {
      ...defaultTypographyStyles.display,
      fontStyle: tokens.fontStyleRegular
    }),
    webPartHeader: createVariableFallback(1100, {
      ...defaultTypographyStyles.subtitle1,
      fontStyle: tokens.fontStyleRegular
    })
  }
};

/**
 * Returns a typography style with fallback values in:
 * - font family
 * - font weight
 * @param font - numeric classification of the font
 * @param style - token set representing CSS font styling
 * @returns custom style
 */
function createVariableFallback(font: Font, style: TypographyStyle): TypographyStyle {
  return {
    ...style,
    fontFamily: `var(--fontFamilyCustomFont${font}, ${style.fontFamily})`,
    fontWeight: `var(--fontWeightCustomFont${font}, ${style.fontWeight})`
  };
}

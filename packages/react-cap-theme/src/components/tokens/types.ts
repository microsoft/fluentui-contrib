import type {
  ColorTokens as BaseColorTokens,
  FontFamilyTokens as BaseFontFamilyTokens,
  FontSizeTokens as BaseFontSizeTokens,
  FontWeightTokens as BaseFontWeightTokens,
  LineHeightTokens as BaseLineHeightTokens,
  Theme as BaseTheme,
  TypographyStyle as BaseTypographyStyle,
  TypographyStyles as BaseTypographyStyles,
} from '@fluentui/tokens';

export type Font =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000
  | 1100
  | 1200
  | 1300
  | 1400
  | 1500
  | 1600
  | 1700;

export type ColorTokens = BaseColorTokens & {
  /* placeholder: may be used to create custom color tokens to support Theme v2 */
};

export type FontSizeTokens = BaseFontSizeTokens & {
  fontSizeBase450: string;
};

export type FontFamilyCustomFontTokens = Record<
  `fontFamilyCustomFont${Font}`,
  string
>;

export type FontStyleTokens = {
  fontStyleRegular: string;
  fontStyleItalic: string;
};

export type FontWeightCustomFontTokens = Record<
  `fontWeightCustomFont${Font}`,
  number
>;

export type LineHeightTokens = BaseLineHeightTokens & {
  lineHeightBase450: string;
};

export type TypographyStyle = BaseTypographyStyle & {
  fontStyle: string;
  lineHeight: string;
};

export type TypographyStyles = BaseTypographyStyles & {
  custom: CustomizableTypographyStyles;
};

export type CustomizableTypographyStyles = Record<
  keyof BaseTypographyStyles,
  TypographyStyle
> & {
  body1Mono: TypographyStyle;
  body2Italic: TypographyStyle;
  body2Mono: TypographyStyle;
  body3: TypographyStyle;
  body3Strong: TypographyStyle;
  buttonLarge: TypographyStyle;
  buttonMedium: TypographyStyle;
  buttonSmall: TypographyStyle;
  subtitle1Italic: TypographyStyle;
  webPartHeader: TypographyStyle;
  heading2: TypographyStyle;
  heading3: TypographyStyle;
  heading4: TypographyStyle;
};

export type FontFamilyTokens = BaseFontFamilyTokens &
  Partial<FontFamilyCustomFontTokens>;

export type FontWeightTokens = BaseFontWeightTokens &
  Partial<FontWeightCustomFontTokens>;

export type FIXME_MISSING_TOKENS = {
  borderRadius2XLarge: string;
  borderRadius3XLarge: string;
  borderRadius4XLarge: string;
  colorNeutralStroke4: string;
  colorNeutralStroke4Hover: string;
  colorNeutralStroke4Pressed: string;
  colorNeutralStroke4Selected: string;
};

export const FIXME_MISSING_TOKENS_DEFAULTS: FIXME_MISSING_TOKENS = {
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
};

export type Theme = BaseTheme &
  ColorTokens &
  FontFamilyTokens &
  FontSizeTokens &
  FontStyleTokens &
  FontWeightTokens &
  LineHeightTokens &
  FIXME_MISSING_TOKENS;

export type TokenName = keyof Theme;


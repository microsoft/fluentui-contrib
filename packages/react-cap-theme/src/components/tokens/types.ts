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

export type Greys =
  | 0
  | 2
  | 4
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 26
  | 28
  | 30
  | 32
  | 34
  | 36
  | 38
  | 40
  | 42
  | 44
  | 46
  | 48
  | 50
  | 52
  | 54
  | 56
  | 58
  | 60
  | 62
  | 64
  | 66
  | 68
  | 70
  | 72
  | 74
  | 76
  | 78
  | 80
  | 82
  | 84
  | 86
  | 88
  | 90
  | 92
  | 94
  | 96
  | 98
  | 100;

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

export type CustomizableTypographyStyle = {
  fontFamily: string;
  fontWeight?: number;
};

export type FontVariants = Record<Font, CustomizableTypographyStyle>;

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
  borderRadius2XLarge: '',
  borderRadius3XLarge: '',
  borderRadius4XLarge: '',
  colorNeutralStroke4: '',
  colorNeutralStroke4Hover: '',
  colorNeutralStroke4Pressed: '',
  colorNeutralStroke4Selected: '',
};

export type Theme = BaseTheme &
  ColorTokens &
  FontFamilyTokens &
  FontSizeTokens &
  FontStyleTokens &
  FontWeightTokens &
  LineHeightTokens &
  FIXME_MISSING_TOKENS;

export type PartialTheme = Partial<Theme>;

export type TokenName = keyof Theme;

export type {
  BorderRadiusTokens,
  Brands,
  BrandVariants,
  ColorPaletteAnchor,
  ColorPaletteBeige,
  ColorPaletteBerry,
  ColorPaletteBlue,
  ColorPaletteBrass,
  ColorPaletteBrown,
  ColorPaletteCornflower,
  ColorPaletteCranberry,
  ColorPaletteDarkGreen,
  ColorPaletteDarkOrange,
  ColorPaletteDarkRed,
  ColorPaletteForest,
  ColorPaletteGrape,
  ColorPaletteGold,
  ColorPaletteGreen,
  ColorPaletteLavender,
  ColorPaletteLilac,
  ColorPaletteLightGreen,
  ColorPaletteLightTeal,
  ColorPaletteMagenta,
  ColorPaletteMarigold,
  ColorPaletteMink,
  ColorPaletteNavy,
  ColorPalettePeach,
  ColorPalettePink,
  ColorPalettePlatinum,
  ColorPalettePlum,
  ColorPalettePumpkin,
  ColorPalettePurple,
  ColorPaletteRed,
  ColorPaletteRoyalBlue,
  ColorPaletteSeafoam,
  ColorPaletteSteel,
  ColorPaletteTeal,
  ColorPaletteTokens,
  ColorPaletteYellow,
  CurveTokens,
  DurationTokens,
  HorizontalSpacingTokens,
  ShadowBrandTokens,
  ShadowTokens,
  SpacingTokens,
  StrokeWidthTokens,
  VerticalSpacingTokens,
  ZIndexTokens,
} from '@fluentui/tokens';

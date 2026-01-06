import type {
  ColorTokens as BaseColorTokens,
  FontFamilyTokens as BaseFontFamilyTokens,
  FontSizeTokens as BaseFontSizeTokens,
  FontWeightTokens as BaseFontWeightTokens,
  LineHeightTokens as BaseLineHeightTokens,
  Theme as BaseTheme,
  TypographyStyle as BaseTypographyStyle,
  TypographyStyles as BaseTypographyStyles
} from '@fluentui/tokens';

/**
 * @public
 * These colors have been copied here from react-theme because they are not exported from that package.
 * They are necessary to build the theme shims.
 */
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

/**
 * @public
 * Design tokens font variations
 */
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

/**
 * @public
 * Design tokens for alias colors
 */
export type ColorTokens = BaseColorTokens & {
  /* placeholder: may be used to create custom color tokens to support Theme v2 */
};

/**
 * @public
 * Design tokens for alias font sizes
 */
export type FontSizeTokens = BaseFontSizeTokens & {
  // Use exclusively for RTE
  fontSizeBase450: string;
};

/**
 * @public
 * Design tokens for alias custom font font families
 */
export type FontFamilyCustomFontTokens = Record<`fontFamilyCustomFont${Font}`, string>;

/**
 * @public
 * Design tokens for alias font styles
 */
export type FontStyleTokens = {
  // Its value contains CSS font style "regular"
  fontStyleRegular: string;
  // Its value contains CSS font style "italic"
  fontStyleItalic: string;
};

/**
 * @public
 * Design tokens for alias custom font font weights
 */
export type FontWeightCustomFontTokens = Record<`fontWeightCustomFont${Font}`, number>;

/**
 * @public
 * Design tokens for alias line heights
 */
export type LineHeightTokens = BaseLineHeightTokens & {
  // Use exclusively for RTE
  lineHeightBase450: string;
};

/**
 * @public
 * Design tokens font styles
 */
export type TypographyStyle = BaseTypographyStyle & {
  // Expanding Base Typography Style type to includes CSS font style rule
  fontStyle: string;
  // Expanding Base Typography Style type to includes CSS line height rule
  lineHeight: string;
};

/**
 * @public
 * Design tokens font styles
 */
export type TypographyStyles = BaseTypographyStyles & {
  custom: CustomizableTypographyStyles;
};

/**
 * @public
 * Type tokens that can be modified for typography styles
 */
export type CustomizableTypographyStyles = Record<keyof BaseTypographyStyles, TypographyStyle> & {
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

/**
 * @public
 * Styling that can be modified for font style
 */
export type CustomizableTypographyStyle = {
  // Uses default fontFamily token as fallback variable
  fontFamily: string;
  // Uses typography style font weight token as fallback variable
  fontWeight?: number;
};

/**
 * @public
 * This variants defines the font family and/or font weight that will be modified in the typography styles ramp
 */
export type FontVariants = Record<Font, CustomizableTypographyStyle>;

/**
 * @public
 * Extending design tokens for font family tokens
 */
export type FontFamilyTokens = BaseFontFamilyTokens & Partial<FontFamilyCustomFontTokens>;

/**
 * @public
 * Extending design tokens for font weight tokens
 */
export type FontWeightTokens = BaseFontWeightTokens & Partial<FontWeightCustomFontTokens>;

/**
 * @public
 * Theme for ProjectTurtle Design System
 */
export type Theme = BaseTheme &
  ColorTokens &
  FontFamilyTokens &
  FontSizeTokens &
  FontStyleTokens &
  FontWeightTokens &
  LineHeightTokens;

/**
 * @public
 * Theme object type with all fields as optional
 */
export type PartialTheme = Partial<Theme>;

/**
 * @public
 */
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
  ZIndexTokens
} from '@fluentui/tokens';

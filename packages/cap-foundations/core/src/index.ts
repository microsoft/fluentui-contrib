// ---- tokens ----
export { spacingTokens, generateSpacingTokens } from './tokens/spacing';
export type { SpacingToken, SpacingValue } from './tokens/spacing';

export {
  fontFamilyTokens,
  fontSizeTokens,
  fontWeightTokens,
  lineHeightTokens,
  typographyTokens,
  generateTypographyTokens,
} from './tokens/typography';
export type {
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LineHeightToken,
  TypographyToken,
  TypographyTokenValues,
} from './tokens/typography';

export { radiiTokens, generateRadiiTokens } from './tokens/radii';
export type { RadiiToken, RadiiValue, RadiiStyle } from './tokens/radii';

export { shadowTokens, generateDarkModeShadows } from './tokens/shadows';
export type { ShadowToken, ShadowValue } from './tokens/shadows';

export { durationTokens, easingTokens, animationTokens } from './tokens/animation';
export type { DurationToken, EasingToken, AnimationToken, AnimationTokenValues } from './tokens/animation';

export { brandFlairTokens, gradientTokens } from './tokens/gradients';
export type { BrandFlairToken, GradientToken } from './tokens/gradients';

export { staticTokens } from './tokens';
export type { StaticToken } from './tokens';

// ---- colors ----
export {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  relativeLuminance,
  contrastRatio,
  meetsContrastAA,
  meetsContrastAAA,
  lighten,
  darken,
  saturate,
  mix,
  getContrastingTextColor,
  ensureContrast,
} from './colors/utils';

export {
  SURFACE_PRESETS,
  SURFACE_PRESET_NAMES,
  generateSurfaceColors,
  generateSurfaceFromPreset,
  surfaceColorsToCSSVariables,
  generateSurfaceCSS,
  generateAllSurfaceCSS,
  injectSurfaceStyles,
  getRandomSurfaceName,
  getSurfaceClassName,
} from './colors/dynamicSurface';
export type { SurfaceDefinition, SurfaceColors, SurfaceCSSVariables, ColorMode } from './colors/dynamicSurface';

// ---- surfaces ----
export type {
  TonalSurface,
  ContainerSurface,
  ControlRole,
  ControlSurface,
  FeedbackSurface,
  SurfaceType,
  Surface,
  SurfaceTokens,
  SurfaceState,
  ComponentTokens,
  SpecialTokens,
} from './surfaces/types';
export {
  tonalSurfaces,
  feedbackSurfaces,
  surfaceTypes,
  isSurfaceType,
  isTonalSurface,
  isFeedbackSurface,
  surfaceClassName,
  getSurfaceClasses,
} from './surfaces/definitions';

// ---- themes ----
export type {
  AccessibilityLevel,
  ThemeColors,
  ThemeTypography,
  ThemeSpacing,
  ThemeRadii,
  ThemeAnimation,
  ThemeAccessibility,
  ThemeConfig,
  CustomSurface,
  ThemeOverrides,
  ThemeDefinition,
} from './themes/types';

export { defaultTheme, themes } from './themes/definitions';

export {
  generateThemeTokens,
  generateThemeCSS,
  validateTheme,
  generateRuntimeThemeTokens,
} from './themes/generator';
export type { RuntimeThemeConfig } from './themes/generator';

// ---- runtime ----
export type {
  CapFoundationsConfig,
  CapFoundationsThemeState,
  ThemeCallback,
  CapFoundationsAPI,
} from './runtime/bootstrap';
export {
  CapFoundations,
  setTheme,
  getTheme,
  subscribe,
  configure,
  getInlineBootstrap,
  getInlineBootstrapPretty,
  getFallbackCSS,
  getBootstrapScript,
} from './runtime/bootstrap';

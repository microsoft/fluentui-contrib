/**
 * Theme generator - Data-driven from theme-rules.json
 *
 * Compiles theme definitions into complete CSS with all surface tokens.
 * All color relationships and derivation rules are read from the rules configuration.
 */

import type { ThemeDefinition } from './types';
import { tonalSurfaces } from '../surfaces/definitions';
import type { FeedbackSurface } from '../surfaces/types';
import {
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  lighten,
  darken,
  mix,
  getContrastingTextColor,
  ensureContrast,
  contrastRatio,
} from '../colors/utils';
import { generateSpacingTokens } from '../tokens/spacing';
import { generateTypographyTokens } from '../tokens/typography';
import { generateRadiiTokens } from '../tokens/radii';
import { shadowTokens, generateDarkModeShadows } from '../tokens/shadows';
import { generateAnimationTokens } from '../tokens/animation';
import { gradientTokens } from '../tokens/gradients';

// Import theme rules - this is the single source of truth
import themeRules from './schema/theme-rules.json';

// Types for theme rules
interface SpecialTokenConfig {
  derivation?: string | { light: string; dark: string };
  default?: string | { light: string; dark: string };
}

interface ColorGroupConfig {
  description?: string;
  defaults?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  derivation?: Record<string, string | { light: string; dark: string }>;
}

interface ProcessedColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

interface GeneratorContext {
  colors: ProcessedColors;
  isDark: boolean;
  contrastLevel: number;
  tokens: Record<string, string>;
}

/**
 * Generate all tokens for a theme mode using rules from theme-rules.json
 */
export function generateThemeTokens(
  theme: ThemeDefinition,
  mode: 'light' | 'dark'
): Record<string, string> {
  const tokens: Record<string, string> = {};
  const isDark = mode === 'dark';

  // Get colors with adjustments
  const colors = applyColorAdjustments(theme.colors, theme.config, isDark);
  const contrastLevel = theme.accessibility?.level === 'AAA' ? 7 : 4.5;

  // Pre-populate page tokens from overrides if provided
  // This ensures feedback surfaces can derive from the correct background
  const modeOverrides = isDark ? theme.overrides?.dark : theme.overrides?.light;
  if (modeOverrides?.['--page-bg']) {
    tokens['--page-bg'] = modeOverrides['--page-bg'];
  }
  if (modeOverrides?.['--page-text']) {
    tokens['--page-text'] = modeOverrides['--page-text'];
  }
  if (modeOverrides?.['--page-border']) {
    tokens['--page-border'] = modeOverrides['--page-border'];
  }

  // Create generator context
  const ctx: GeneratorContext = {
    colors,
    isDark,
    contrastLevel,
    tokens,
  };

  // Generate static tokens
  const spacingTokens = generateSpacingTokens(theme.spacing);
  const typographyTokens = generateTypographyTokens(theme.typography);
  const radiiTokens = generateRadiiTokens(theme.radii);
  const animTokens = generateAnimationTokens(theme.animation);
  const shadows = isDark ? generateDarkModeShadows() : shadowTokens;

  Object.assign(tokens, spacingTokens, typographyTokens, radiiTokens, animTokens, shadows, gradientTokens);

  // Generate color group tokens from rules
  // Each group contains all fg tokens (fg, fg-soft, fg-softer, fg-strong, fg-stronger,
  // fg-primary, fg-danger, fg-success, fg-warning, fg-info) ensuring accessibility
  generateColorGroupTokens(ctx);

  // Generate feedback surface tokens (soft backgrounds for alerts)
  generateFeedbackSurfaceTokens(ctx);

  // Generate special tokens from rules
  generateSpecialTokensFromRules(ctx);

  // Generate component shortcut tokens from rules
  generateComponentTokensFromRules(tokens);

  // Apply overrides from theme definition
  const overrides = isDark ? theme.overrides?.dark : theme.overrides?.light;
  if (overrides) {
    Object.assign(tokens, overrides);
  }

  return tokens;
}

/**
 * Apply color adjustments from theme config
 */
function applyColorAdjustments(
  colors: ThemeDefinition['colors'],
  config: ThemeDefinition['config'] = {},
  isDark: boolean
): ProcessedColors {
  const { saturation = 0, temperature = 0 } = config;

  // Derive missing colors using rules from theme-rules.json
  const rules = themeRules.colorDerivation.rules;

  let primary = colors.primary;
  let secondary = colors.secondary || applyFormula(rules['secondary-from-primary'].formula, primary);
  let accent = colors.accent || applyFormula(rules['accent-from-primary'].formula, primary);
  let neutral = colors.neutral || applyFormula(rules['neutral-from-primary'].formula, primary);

  // Apply saturation adjustment
  if (saturation !== 0) {
    primary = adjustSaturation(primary, saturation);
    secondary = adjustSaturation(secondary, saturation);
    accent = adjustSaturation(accent, saturation);
  }

  // Apply temperature adjustment
  if (temperature !== 0) {
    primary = adjustTemperature(primary, temperature);
    secondary = adjustTemperature(secondary, temperature);
    accent = adjustTemperature(accent, temperature);
    neutral = adjustTemperature(neutral, temperature);
  }

  // Get semantic colors from rules (fixed across all themes for UX clarity)
  const semanticColors = themeRules.semanticColors;

  // Info derives from primary, other semantic colors are fixed
  const infoBase = semanticColors.info.base;
  const infoColor = infoBase === 'theme:primary' ? primary : infoBase;

  return {
    primary,
    secondary,
    accent,
    neutral,
    success: semanticColors.success.base,
    warning: semanticColors.warning.base,
    danger: semanticColors.danger.base,
    info: infoColor,
  };
}

/**
 * Apply a derivation formula to a color
 */
function applyFormula(formula: string | { light: string; dark: string }, baseColor: string): string {
  if (typeof formula !== 'string') {
    // This shouldn't happen for color derivation, but handle it
    return baseColor;
  }

  // Parse formula like "shiftHue(primary, 15)" or "desaturate(primary, 80)"
  const shiftHueMatch = formula.match(/shiftHue\((\w+),\s*(-?\d+)\)/);
  if (shiftHueMatch) {
    return shiftHue(baseColor, parseInt(shiftHueMatch[2], 10));
  }

  const desaturateMatch = formula.match(/desaturate\((\w+),\s*(\d+)\)/);
  if (desaturateMatch) {
    return desaturate(baseColor, parseInt(desaturateMatch[2], 10));
  }

  return baseColor;
}

/**
 * Generate color group tokens from theme-rules.json
 * Each group has 18 tokens:
 * - bg, bg-hover, bg-pressed, bg-disabled (4)
 * - border, border-hover, border-pressed, border-disabled (4)
 * - fg, fg-soft, fg-softer, fg-strong, fg-stronger (5)
 * - fg-primary, fg-danger, fg-success, fg-warning, fg-info (5)
 */
function generateColorGroupTokens(ctx: GeneratorContext): void {
  const { colors, isDark, tokens } = ctx;
  const colorGroups = (themeRules as any).colorGroups;

  if (!colorGroups?.groups) return;

  const tokenStructure = colorGroups.tokenStructure?.tokens || [
    'bg', 'bg-hover', 'bg-pressed', 'bg-disabled',
    'border', 'border-hover', 'border-pressed', 'border-disabled',
    'fg', 'fg-soft', 'fg-softer', 'fg-strong', 'fg-stronger',
    'fg-primary', 'fg-danger', 'fg-success', 'fg-warning', 'fg-info'
  ];
  const mode = isDark ? 'dark' : 'light';

  for (const [groupName, config] of Object.entries(colorGroups.groups as Record<string, ColorGroupConfig>)) {
    const defaults = config.defaults?.[mode] || {};
    const derivation = config.derivation || {};

    // Process each token for this color group
    for (const tokenSuffix of tokenStructure) {
      const cssVar = `--${groupName}-${tokenSuffix}`;

      // Check for explicit default first
      if (defaults[tokenSuffix] !== undefined) {
        tokens[cssVar] = defaults[tokenSuffix];
        continue;
      }

      // Check for derivation rule
      const rule = derivation[tokenSuffix];
      if (rule !== undefined) {
        tokens[cssVar] = evaluateDerivation(rule, groupName, tokenSuffix, ctx);
        continue;
      }

      // Apply automatic derivation based on token type
      tokens[cssVar] = deriveColorGroupTokenValue(groupName, tokenSuffix, ctx);
    }
  }
}

/**
 * Derive a color group token value automatically based on token type
 */
function deriveColorGroupTokenValue(
  groupName: string,
  tokenSuffix: string,
  ctx: GeneratorContext
): string {
  const { colors, isDark, tokens } = ctx;

  // Get the background color for this group
  const bgToken = `--${groupName}-bg`;
  const bg = tokens[bgToken];

  // Get page colors for reference
  const pageBg = tokens['--page-bg'] || (isDark ? '#0f0f0f' : '#fafafa');
  const pageText = tokens['--page-text'] || (isDark ? '#e5e5e5' : '#171717');

  switch (tokenSuffix) {
    // Foreground tokens
    case 'fg': {
      if (bg) {
        return getContrastingTextColor(bg);
      }
      return pageText;
    }

    case 'fg-soft': {
      const fg = tokens[`--${groupName}-fg`] || deriveColorGroupTokenValue(groupName, 'fg', ctx);
      const background = bg || pageBg;
      return mix(fg, background, 0.3);
    }

    case 'fg-softer': {
      const fg = tokens[`--${groupName}-fg`] || deriveColorGroupTokenValue(groupName, 'fg', ctx);
      const background = bg || pageBg;
      return mix(fg, background, 0.5);
    }

    case 'fg-strong': {
      const fg = tokens[`--${groupName}-fg`] || deriveColorGroupTokenValue(groupName, 'fg', ctx);
      const maxContrast = isDark ? '#ffffff' : '#000000';
      return mix(fg, maxContrast, 0.3);
    }

    case 'fg-stronger':
      return isDark ? '#ffffff' : '#000000';

    // Semantic foreground colors (guaranteed accessible on this group's bg)
    case 'fg-primary': {
      // Primary link/accent color accessible on this background
      // For dark mode, we use a higher contrast target (5.5:1) and minimum lightening
      // because blues can appear perceptually dim even at 4.5:1
      const primary = colors.primary;
      if (bg) {
        const targetRatio = isDark ? 5.5 : 4.5;
        const adjusted = ensureContrast(primary, bg, targetRatio);
        // In dark mode, ensure minimum 15% lightening for better visibility
        if (isDark) {
          const minLightened = lighten(primary, 15);
          const adjustedRgb = hexToRgb(adjusted);
          const minRgb = hexToRgb(minLightened);
          if (adjustedRgb && minRgb) {
            // Use whichever is lighter (higher luminance)
            const adjustedHsl = rgbToHsl(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
            const minHsl = rgbToHsl(minRgb.r, minRgb.g, minRgb.b);
            return adjustedHsl.l >= minHsl.l ? adjusted : minLightened;
          }
        }
        return adjusted;
      }
      return isDark ? lighten(primary, 20) : darken(primary, 10);
    }

    case 'fg-danger': {
      const danger = colors.danger;
      if (bg) {
        // Use higher contrast target in dark mode for better visibility
        return ensureContrast(danger, bg, isDark ? 5.5 : 4.5);
      }
      return isDark ? lighten(danger, 25) : darken(danger, 10);
    }

    case 'fg-success': {
      const success = colors.success;
      if (bg) {
        // Use higher contrast target in dark mode for better visibility
        return ensureContrast(success, bg, isDark ? 5.5 : 4.5);
      }
      return isDark ? lighten(success, 25) : darken(success, 10);
    }

    case 'fg-warning': {
      const warning = colors.warning;
      if (bg) {
        // Warning already has good luminance, lower target is fine
        return ensureContrast(warning, bg, isDark ? 5.0 : 4.5);
      }
      return isDark ? lighten(warning, 15) : darken(warning, 15);
    }

    case 'fg-info': {
      const info = colors.info;
      if (bg) {
        // Info uses primary color, apply same treatment as fg-primary
        return ensureContrast(info, bg, isDark ? 5.5 : 4.5);
      }
      return isDark ? lighten(info, 25) : darken(info, 10);
    }

    // Border tokens
    case 'border': {
      const border = tokens['--page-border'] || (isDark ? '#333333' : '#e5e5e5');
      return border;
    }

    case 'border-hover': {
      const border = tokens[`--${groupName}-border`] || tokens['--page-border'] || (isDark ? '#333333' : '#e5e5e5');
      return isDark ? lighten(border, 10) : darken(border, 10);
    }

    case 'border-pressed': {
      const border = tokens[`--${groupName}-border`] || tokens['--page-border'] || (isDark ? '#333333' : '#e5e5e5');
      return isDark ? lighten(border, 15) : darken(border, 15);
    }

    case 'border-disabled': {
      const border = tokens[`--${groupName}-border`] || tokens['--page-border'] || (isDark ? '#333333' : '#e5e5e5');
      const background = bg || pageBg;
      return mix(border, background, 0.5);
    }

    default:
      return '';
  }
}

/**
 * Generate feedback surface tokens from feedbackSurfaces rules
 * These are soft/tinted backgrounds for alert components
 */
function generateFeedbackSurfaceTokens(ctx: GeneratorContext): void {
  const feedbackSurfaces = (themeRules as any).feedbackSurfaces;
  if (!feedbackSurfaces?.surfaces) return;

  for (const [surfaceName, config] of Object.entries(feedbackSurfaces.surfaces as Record<string, any>)) {
    const derivation = config.derivation || {};

    // Process each token for this feedback surface
    for (const [tokenSuffix, rule] of Object.entries(derivation)) {
      const cssVar = `--${surfaceName}-${tokenSuffix}`;
      if (rule !== undefined) {
        ctx.tokens[cssVar] = evaluateDerivation(rule as any, surfaceName, tokenSuffix, ctx);
      }
    }
  }
}

/**
 * Evaluate a derivation rule
 */
function evaluateDerivation(
  rule: string | { light: string; dark: string },
  surfaceName: string,
  tokenName: string,
  ctx: GeneratorContext
): string {
  const { colors, isDark, tokens } = ctx;

  // Default page colors (used as fallback when page.* tokens are referenced)
  const pageDefaults = {
    bg: isDark ? '#0f0f0f' : '#fafafa',
    text: isDark ? '#e5e5e5' : '#171717',
    border: isDark ? '#333333' : '#e5e5e5',
  };

  // Helper to resolve token with page fallback
  const resolveToken = (surface: string, token: string): string => {
    const tokenValue = tokens[`--${surface}-${token}`];
    if (tokenValue) return tokenValue;
    if (surface === 'page' && token in pageDefaults) {
      return pageDefaults[token as keyof typeof pageDefaults];
    }
    return `${surface}.${token}`;
  };

  // Get the rule string for current mode
  const ruleStr = typeof rule === 'string' ? rule : (isDark ? rule.dark : rule.light);

  // Parse different derivation patterns

  // "theme:primary" - reference theme color
  if (ruleStr.startsWith('theme:')) {
    const colorName = ruleStr.slice(6) as keyof ProcessedColors;
    return colors[colorName] || ruleStr;
  }

  // "semantic:danger" - reference semantic color
  if (ruleStr.startsWith('semantic:')) {
    const colorName = ruleStr.slice(9) as keyof ProcessedColors;
    return colors[colorName] || ruleStr;
  }

  // "inherit:surface.token" - inherit from another surface
  if (ruleStr.startsWith('inherit:')) {
    const [surface, token] = ruleStr.slice(8).split('.');
    return resolveToken(surface, token);
  }

  // "transparent" - literal value
  if (ruleStr === 'transparent') {
    return 'transparent';
  }

  // "contrast(bg)" - get contrasting text color (black or white)
  if (ruleStr.startsWith('contrast(')) {
    const refToken = ruleStr.slice(9, -1);
    const bgColor = tokens[`--${surfaceName}-${refToken}`] || tokens[`--${surfaceName}-bg`];
    return bgColor ? getContrastingTextColor(bgColor) : '#000000';
  }

  // "contrastOpacity(bg, opacity)" - contrast color with specified opacity (0-100)
  // Returns rgba() with the contrasting color (black or white) at the given opacity
  const contrastOpacityMatch = ruleStr.match(/contrastOpacity\(([^,]+),\s*([\d.]+)\)/);
  if (contrastOpacityMatch) {
    const bgRef = contrastOpacityMatch[1].trim();
    const opacity = parseFloat(contrastOpacityMatch[2]);
    // Get the background color
    let bgColor: string;
    if (bgRef === 'bg') {
      bgColor = tokens[`--${surfaceName}-bg`] || (isDark ? '#0f0f0f' : '#fafafa');
    } else if (bgRef.includes('.')) {
      const [surface, token] = bgRef.split('.');
      bgColor = tokens[`--${surface}-${token}`] || (isDark ? '#0f0f0f' : '#fafafa');
    } else {
      bgColor = tokens[`--${surfaceName}-${bgRef}`] || (isDark ? '#0f0f0f' : '#fafafa');
    }
    // Get the contrast color and apply opacity
    const contrastColor = getContrastingTextColor(bgColor);
    if (contrastColor === '#ffffff') {
      return `rgba(255, 255, 255, ${opacity / 100})`;
    } else {
      return `rgba(0, 0, 0, ${opacity / 100})`;
    }
  }

  // "accessibleColor(color, bgRef)" - ensure color is accessible on background
  // Example: accessibleColor(semantic:success, bg) - returns success color adjusted for contrast
  const accessibleMatch = ruleStr.match(/accessibleColor\(([^,]+),\s*([^)]+)\)/);
  if (accessibleMatch) {
    const baseColor = resolveColorRef(accessibleMatch[1], ctx);
    const bgRef = accessibleMatch[2].trim();
    // Get the background color - could be "bg" (same surface) or "surface.token"
    let bgColor: string;
    if (bgRef === 'bg') {
      bgColor = tokens[`--${surfaceName}-bg`] || (isDark ? '#0f0f0f' : '#fafafa');
    } else if (bgRef.includes('.')) {
      const [surface, token] = bgRef.split('.');
      bgColor = tokens[`--${surface}-${token}`] || (isDark ? '#0f0f0f' : '#fafafa');
    } else {
      bgColor = tokens[`--${surfaceName}-${bgRef}`] || (isDark ? '#0f0f0f' : '#fafafa');
    }
    // Ensure the color meets AA contrast (4.5:1) on the background
    return ensureContrast(baseColor, bgColor, 4.5);
  }

  // "darken(color, amount)" or "lighten(color, amount)"
  const darkenMatch = ruleStr.match(/darken\(([^,]+),\s*(\d+)\)/);
  if (darkenMatch) {
    const baseColor = resolveColorRef(darkenMatch[1], ctx);
    return darken(baseColor, parseInt(darkenMatch[2], 10));
  }

  const lightenMatch = ruleStr.match(/lighten\(([^,]+),\s*(\d+)\)/);
  if (lightenMatch) {
    const baseColor = resolveColorRef(lightenMatch[1], ctx);
    return lighten(baseColor, parseInt(lightenMatch[2], 10));
  }

  // "mix(color1, color2, weight)"
  const mixMatch = ruleStr.match(/mix\(([^,]+),\s*([^,]+),\s*([\d.]+)\)/);
  if (mixMatch) {
    const color1 = resolveColorRef(mixMatch[1], ctx);
    const color2 = resolveColorRef(mixMatch[2], ctx);
    const weight = parseFloat(mixMatch[3]);
    return mix(color1, color2, weight);
  }

  // "surface.token" - reference another token
  if (ruleStr.includes('.')) {
    const [surface, token] = ruleStr.split('.');
    return resolveToken(surface, token);
  }

  // Literal value (hex color, rgba, etc.)
  return ruleStr;
}

/**
 * Resolve a color reference in a derivation formula
 */
function resolveColorRef(ref: string, ctx: GeneratorContext): string {
  const { colors, tokens, isDark } = ctx;
  const trimmed = ref.trim();

  // Default page colors (used as fallback when page.* tokens are referenced)
  const pageDefaults = {
    bg: isDark ? '#0f0f0f' : '#fafafa',
    text: isDark ? '#e5e5e5' : '#171717',
    border: isDark ? '#333333' : '#e5e5e5',
  };

  // "theme:primary" style
  if (trimmed.startsWith('theme:')) {
    const colorName = trimmed.slice(6) as keyof ProcessedColors;
    return colors[colorName] || trimmed;
  }

  // "semantic:danger" style
  if (trimmed.startsWith('semantic:')) {
    const colorName = trimmed.slice(9) as keyof ProcessedColors;
    return colors[colorName] || trimmed;
  }

  // Token reference "surface.token"
  if (trimmed.includes('.')) {
    const [surface, token] = trimmed.split('.');
    const tokenValue = tokens[`--${surface}-${token}`];
    if (tokenValue) {
      return tokenValue;
    }
    // Fallback for page.* references
    if (surface === 'page' && token in pageDefaults) {
      return pageDefaults[token as keyof typeof pageDefaults];
    }
    return trimmed;
  }

  // Simple color name from ProcessedColors
  if (trimmed in colors) {
    return colors[trimmed as keyof ProcessedColors];
  }

  // Literal hex color
  if (trimmed.startsWith('#')) {
    return trimmed;
  }

  return trimmed;
}

/**
 * Generate special tokens from theme-rules.json
 */
function generateSpecialTokensFromRules(ctx: GeneratorContext): void {
  const { colors, isDark, tokens } = ctx;
  const specialTokens = themeRules.specialTokens;

  // Process each special token category
  for (const [category, config] of Object.entries(specialTokens)) {
    const categoryConfig = config as { description?: string; tokens: Record<string, SpecialTokenConfig> };

    for (const [tokenName, tokenConfig] of Object.entries(categoryConfig.tokens)) {
      const cssVar = `--${category === 'link' ? '' : category + '-'}${tokenName}`.replace('--focus-ring', '--focus-ring');

      // Handle the naming for different categories
      let finalCssVar: string;
      if (category === 'focus') {
        finalCssVar = `--focus-${tokenName}`;
      } else if (category === 'selection') {
        finalCssVar = `--selection-${tokenName}`;
      } else if (category === 'link') {
        finalCssVar = tokenName === 'default' ? '--link' : `--link-${tokenName}`;
      } else if (category === 'scrollbar') {
        finalCssVar = `--scrollbar-${tokenName}`;
      } else if (category === 'skeleton') {
        finalCssVar = `--skeleton-${tokenName}`;
      } else if (category === 'highlight') {
        finalCssVar = `--highlight-${tokenName}`;
      } else {
        finalCssVar = `--${category}-${tokenName}`;
      }

      // Evaluate the token value
      if (tokenConfig.derivation !== undefined) {
        tokens[finalCssVar] = evaluateDerivation(tokenConfig.derivation, '', tokenName, ctx);
      } else if (tokenConfig.default !== undefined) {
        const defaultVal = tokenConfig.default;
        if (typeof defaultVal === 'string') {
          tokens[finalCssVar] = defaultVal;
        } else {
          tokens[finalCssVar] = isDark ? defaultVal.dark : defaultVal.light;
        }
      }
    }
  }
}

/**
 * Generate component shortcut tokens from theme-rules.json
 */
function generateComponentTokensFromRules(tokens: Record<string, string>): void {
  const componentTokens = themeRules.componentTokens.tokens;

  for (const [tokenName, config] of Object.entries(componentTokens)) {
    const tokenConfig = config as { default: string };
    tokens[`--${tokenName}`] = tokenConfig.default;
  }
}

/**
 * Composite an rgba color over a solid hex background
 */
function compositeRgbaOverHex(rgba: string, hexBg: string): string {
  // Parse rgba(r, g, b, a)
  const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
  if (!rgbaMatch) return hexBg; // fallback to bg if can't parse

  const fgR = parseInt(rgbaMatch[1], 10);
  const fgG = parseInt(rgbaMatch[2], 10);
  const fgB = parseInt(rgbaMatch[3], 10);
  const alpha = parseFloat(rgbaMatch[4] || '1');

  const bgRgb = hexToRgb(hexBg);
  if (!bgRgb) return hexBg;

  // Alpha compositing: result = fg * alpha + bg * (1 - alpha)
  const r = Math.round(fgR * alpha + bgRgb.r * (1 - alpha));
  const g = Math.round(fgG * alpha + bgRgb.g * (1 - alpha));
  const b = Math.round(fgB * alpha + bgRgb.b * (1 - alpha));

  return rgbToHex(r, g, b);
}

/**
 * Evaluate a derivation rule for surface overrides
 * Supports: contrast(token), contrastOpacity(token, opacity)
 */
function evaluateSurfaceDerivation(
  rule: string,
  resolvedTokens: Record<string, string>,
  isDark: boolean
): string {
  // "contrast(primary-bg)" - get contrasting text color (black or white)
  const contrastMatch = rule.match(/^contrast\(([^)]+)\)$/);
  if (contrastMatch) {
    const tokenRef = contrastMatch[1].trim();
    let bgColor = resolvedTokens[tokenRef];

    if (bgColor) {
      // If bg is rgba, composite it over base-bg to get effective color
      if (bgColor.startsWith('rgba')) {
        const baseBg = resolvedTokens['base-bg'];
        if (baseBg && baseBg.startsWith('#')) {
          bgColor = compositeRgbaOverHex(bgColor, baseBg);
        }
      }

      // Only process if we have a valid hex color
      if (bgColor.startsWith('#')) {
        return getContrastingTextColor(bgColor);
      }
    }
    return isDark ? '#000000' : '#ffffff';
  }

  // "contrastOpacity(primary-bg, 85)" - contrast color with opacity
  const contrastOpacityMatch = rule.match(/^contrastOpacity\(([^,]+),\s*([\d.]+)\)$/);
  if (contrastOpacityMatch) {
    const tokenRef = contrastOpacityMatch[1].trim();
    const opacity = parseFloat(contrastOpacityMatch[2]);
    let bgColor = resolvedTokens[tokenRef];

    if (bgColor) {
      // If bg is rgba, composite it over base-bg to get effective color
      if (bgColor.startsWith('rgba')) {
        const baseBg = resolvedTokens['base-bg'];
        if (baseBg && baseBg.startsWith('#')) {
          bgColor = compositeRgbaOverHex(bgColor, baseBg);
        }
      }

      // Only process if we have a valid hex color
      if (bgColor.startsWith('#')) {
        const contrastColor = getContrastingTextColor(bgColor);
        if (contrastColor === '#ffffff') {
          return `rgba(255, 255, 255, ${opacity / 100})`;
        } else {
          return `rgba(0, 0, 0, ${opacity / 100})`;
        }
      }
    }
    return isDark ? `rgba(0, 0, 0, ${opacity / 100})` : `rgba(255, 255, 255, ${opacity / 100})`;
  }

  // Return rule as-is if not recognized (might be a literal value)
  return rule;
}

// Color utility helpers
function shiftHue(hex: string, degrees: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.h = (hsl.h + degrees) % 360;
  if (hsl.h < 0) hsl.h += 360;
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

function desaturate(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, hsl.s - amount);
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

function adjustSaturation(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

function adjustTemperature(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  // Positive = warmer (more red/yellow), negative = cooler (more blue)
  const factor = amount / 100;
  const r = Math.min(255, Math.max(0, rgb.r + factor * 20));
  const b = Math.min(255, Math.max(0, rgb.b - factor * 20));
  return rgbToHex(r, rgb.g, b);
}

// Color groups that need theme-level preservation for surface resets
const COLOR_GROUPS = ['softer', 'soft', 'base', 'strong', 'stronger', 'primary', 'inverted', 'success', 'warning', 'danger', 'info'] as const;
const COLOR_GROUP_SUFFIXES = ['bg', 'bg-hover', 'bg-pressed', 'bg-disabled', 'border', 'border-hover', 'border-pressed', 'border-disabled', 'fg', 'fg-soft', 'fg-softer', 'fg-strong', 'fg-stronger', 'fg-primary', 'fg-danger', 'fg-success', 'fg-warning', 'fg-info'] as const;

// Semantic fg token suffixes that need contrast adjustment on colored surfaces
const SEMANTIC_FG_SUFFIXES = ['fg-primary', 'fg-danger', 'fg-success', 'fg-warning', 'fg-info'] as const;

// Minimum contrast ratio for UI components (WCAG AA for UI = 3:1)
const MIN_UI_CONTRAST = 3.0;

// Semantic color groups that need accessibility checking
const SEMANTIC_COLOR_GROUPS = ['primary', 'success', 'warning', 'danger', 'info'] as const;

// Surface types that are semantically colored (their base-bg is a semantic color)
const SEMANTIC_SURFACE_TYPES = ['primary', 'success', 'warning', 'danger', 'info'] as const;

/**
 * Default semantic colors used when theme colors aren't available
 * These are approximate values for checking color similarity
 */
const DEFAULT_SEMANTIC_COLORS: Record<string, string> = {
  primary: '#2563eb', // Blue
  success: '#22c55e', // Green
  warning: '#eab308', // Amber/Yellow
  danger: '#ef4444',  // Red
  info: '#2563eb',    // Blue (same as primary)
};

/**
 * Check if two colors are in the same hue family (within 30 degrees)
 */
function isSameColorFamily(color1: string, color2: string): boolean {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return false;

  const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
  const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

  // Calculate hue difference (accounting for wraparound at 360)
  let hueDiff = Math.abs(hsl1.h - hsl2.h);
  if (hueDiff > 180) hueDiff = 360 - hueDiff;

  // Colors are in the same family if hue difference is less than 30 degrees
  // and both have some saturation (not grayscale)
  return hueDiff < 30 && hsl1.s > 20 && hsl2.s > 20;
}

/**
 * Generate an accessible bg color that contrasts with the surface base-bg
 * Uses the gravitation approach: soft → toward page bg, strong → toward inverted
 */
function deriveAccessibleBg(
  originalBg: string,
  surfaceBaseBg: string,
  isDark: boolean,
  direction: 'neutral' | 'lighter' | 'darker' = 'neutral'
): string {
  const pageBg = isDark ? '#0f0f0f' : '#fafafa';
  const invertedBg = isDark ? '#fafafa' : '#0f0f0f';

  // Determine target based on direction
  let targetBg: string;
  switch (direction) {
    case 'lighter':
      targetBg = pageBg;
      break;
    case 'darker':
      targetBg = invertedBg;
      break;
    default:
      // Neutral: pick whichever provides better contrast
      const pageBgContrast = contrastRatio(pageBg, surfaceBaseBg);
      const invertedBgContrast = contrastRatio(invertedBg, surfaceBaseBg);
      targetBg = pageBgContrast > invertedBgContrast ? pageBg : invertedBg;
  }

  // Start with original color and mix toward target until we have sufficient contrast
  let result = originalBg;
  for (let mixAmount = 0.1; mixAmount <= 1.0; mixAmount += 0.1) {
    result = mix(originalBg, targetBg, mixAmount);
    if (contrastRatio(result, surfaceBaseBg) >= MIN_UI_CONTRAST) {
      return result;
    }
  }

  // If mixing didn't work, return the target directly
  return targetBg;
}

/**
 * Generate accessible color group overrides for a surface
 *
 * This function ensures ALL color group tokens are accessible on a given surface:
 * 1. Checks each color group's bg against the surface's base-bg
 * 2. If contrast < 3:1, derives a new accessible bg
 * 3. Derives fg/border tokens that are accessible on the new bg
 *
 * @param surfaceName - The surface type being generated
 * @param baseBg - The surface's base-bg color (resolved hex value)
 * @param themeColors - The theme's color definitions
 * @param isDark - Whether in dark mode
 * @returns Record of token overrides for accessibility
 */
function generateAccessibleSurfaceOverrides(
  surfaceName: string,
  baseBg: string,
  themeColors: Record<string, string>,
  isDark: boolean
): Record<string, string> {
  const overrides: Record<string, string> = {};

  // Get contrasting text color for this surface
  const textColor = getContrastingTextColor(baseBg);
  const needsLightText = textColor === '#ffffff';

  // 1. Handle semantic color groups (primary, success, warning, danger, info)
  // These are the button/accent colors that might conflict with the surface
  for (const colorGroup of SEMANTIC_COLOR_GROUPS) {
    // Get the original bg color for this group
    const originalBg = themeColors[colorGroup] || DEFAULT_SEMANTIC_COLORS[colorGroup];

    // Check if this color group conflicts with the surface
    const currentContrast = contrastRatio(originalBg, baseBg);
    const isSameFamily = isSameColorFamily(originalBg, baseBg);

    // Need to flip if contrast is too low OR if they're in the same color family
    // (same family = would look like the same color even if contrast is technically ok)
    if (currentContrast < MIN_UI_CONTRAST || isSameFamily) {
      // Determine if this is the surface's own color group (e.g., primary on primary surface)
      const isSurfaceOwnGroup = colorGroup === surfaceName;

      // Generate flipped token values
      const flippedBg = needsLightText ? '#ffffff' : (isDark ? '#1a1a1a' : '#171717');
      const flippedBgHover = needsLightText
        ? (isDark ? '#f0f0f0' : '#f5f5f5')
        : (isDark ? '#262626' : '#252525');
      const flippedBgPressed = needsLightText
        ? (isDark ? '#e5e5e5' : '#ebebeb')
        : (isDark ? '#333333' : '#333333');
      const flippedFg = needsLightText ? '#000000' : '#ffffff';
      const flippedFgOpacity = needsLightText ? '0, 0, 0' : '255, 255, 255';
      const flippedBorderOpacity = needsLightText ? '0, 0, 0' : '255, 255, 255';

      // Override all tokens for this color group
      overrides[`${colorGroup}-bg`] = flippedBg;
      overrides[`${colorGroup}-bg-hover`] = flippedBgHover;
      overrides[`${colorGroup}-bg-pressed`] = flippedBgPressed;
      overrides[`${colorGroup}-bg-disabled`] = `rgba(${flippedFgOpacity}, 0.3)`;
      overrides[`${colorGroup}-fg`] = flippedFg;
      overrides[`${colorGroup}-fg-soft`] = `rgba(${flippedFgOpacity}, 0.85)`;
      overrides[`${colorGroup}-fg-softer`] = `rgba(${flippedFgOpacity}, 0.7)`;
      overrides[`${colorGroup}-fg-strong`] = flippedFg;
      overrides[`${colorGroup}-fg-stronger`] = flippedFg;
      overrides[`${colorGroup}-border`] = `rgba(${flippedBorderOpacity}, 0.15)`;
      overrides[`${colorGroup}-border-hover`] = `rgba(${flippedBorderOpacity}, 0.2)`;
      overrides[`${colorGroup}-border-pressed`] = `rgba(${flippedBorderOpacity}, 0.25)`;
    }
  }

  // 2. Handle semantic fg tokens on all color groups
  // These are the colored text/links that appear on various backgrounds
  // e.g., --base-fg-primary (primary-colored text on base background)
  for (const group of COLOR_GROUPS) {
    // Skip the inverted group (has its own complete token set)
    if (group === 'inverted') continue;

    // Skip the same-named group as the surface (e.g., primary-fg-primary on primary surface
    // is already handled by the color group override above)
    if (group === surfaceName) continue;

    // For each semantic fg token suffix
    for (const fgSuffix of ['fg-primary', 'fg-success', 'fg-warning', 'fg-danger', 'fg-info']) {
      const semanticColor = fgSuffix.replace('fg-', '');
      const originalFgColor = themeColors[semanticColor] || DEFAULT_SEMANTIC_COLORS[semanticColor];

      // Check if this semantic fg color conflicts with the surface
      if (isSameColorFamily(originalFgColor, baseBg)) {
        const token = `${group}-${fgSuffix}`;

        // Use appropriate contrast color
        if (needsLightText) {
          if (group === 'softer' || group === 'soft') {
            overrides[token] = `rgba(255, 255, 255, ${isDark ? 0.9 : 0.95})`;
          } else {
            overrides[token] = '#ffffff';
          }
        } else {
          if (group === 'softer' || group === 'soft') {
            overrides[token] = `rgba(0, 0, 0, ${isDark ? 0.9 : 0.85})`;
          } else {
            overrides[token] = '#000000';
          }
        }
      }
    }
  }

  return overrides;
}

// Generate short internal token names (--_a0, --_a1, ..., --_z9, --_aa, etc.)
// These are implementation details for surface resets - not meant for direct use
function generateTokenMap(): Map<string, string> {
  const map = new Map<string, string>();
  let index = 0;

  const toCode = (n: number): string => {
    // Use base36 (0-9, a-z) for compact codes
    return n.toString(36);
  };

  // Map color group tokens
  for (const group of COLOR_GROUPS) {
    for (const suffix of COLOR_GROUP_SUFFIXES) {
      const fullName = `${group}-${suffix}`;
      map.set(fullName, `--_${toCode(index++)}`);
    }
  }

  // Map special tokens
  const specialTokens = ['focus-ring', 'selection-bg', 'selection-text'];
  for (const name of specialTokens) {
    map.set(name, `--_${toCode(index++)}`);
  }

  return map;
}

const INTERNAL_TOKEN_MAP = generateTokenMap();

/**
 * Generate CSS from tokens
 */
export function generateThemeCSS(
  theme: ThemeDefinition,
  mode: 'light' | 'dark'
): string {
  const tokens = generateThemeTokens(theme, mode);
  const themeId = theme.id || theme.name.toLowerCase().replace(/\s+/g, '-');

  const lines = [
    `/* ${theme.name} - ${mode} mode */`,
    `/* Generated by @ui-kit/core from theme-rules.json */`,
    '',
  ];

  // Build the theme qualifier selector
  // Uses CSS nesting - all rules scoped to this theme+mode combination
  const qualifier = `[data-theme='${themeId}'][data-mode='${mode}']`;
  lines.push(`${qualifier} {`);

  // First pass: output internal tokens (preserved originals for surface resets)
  // Uses short codes like --_0, --_1, etc. to minimize file size
  for (const group of COLOR_GROUPS) {
    for (const suffix of COLOR_GROUP_SUFFIXES) {
      const fullName = `${group}-${suffix}`;
      const shortName = INTERNAL_TOKEN_MAP.get(fullName);
      const value = tokens[`--${fullName}`];
      if (value && shortName) {
        lines.push(`  ${shortName}: ${value};`);
      }
    }
  }
  // Also preserve special tokens that surfaces might override
  const specialTokensToPreserve = ['focus-ring', 'selection-bg', 'selection-text'];
  for (const name of specialTokensToPreserve) {
    const shortName = INTERNAL_TOKEN_MAP.get(name);
    const value = tokens[`--${name}`];
    if (value && shortName) {
      lines.push(`  ${shortName}: ${value};`);
    }
  }
  lines.push('');

  // Second pass: output all tokens normally
  for (const [name, value] of Object.entries(tokens)) {
    if (value) {
      lines.push(`  ${name}: ${value};`);
    }
  }
  lines.push('');

  // Add body typography and color rule (nested)
  lines.push('  /* Base typography */');
  lines.push('  & body {');
  lines.push('    font-family: var(--font-sans);');
  lines.push('    font-size: var(--text-base);');
  lines.push('    line-height: var(--leading-normal);');
  lines.push('    color: var(--base-fg);');
  lines.push('    background: var(--base-bg);');
  lines.push('  }');
  lines.push('');

  // Generate nested surface classes
  lines.push('  /* Surface classes */');
  // Extract theme colors for accessibility checking in surfaces
  const themeColors: Record<string, string> = {
    primary: tokens['--primary-bg'] || '#2563eb',
    success: tokens['--success-bg'] || '#22c55e',
    warning: tokens['--warning-bg'] || '#eab308',
    danger: tokens['--danger-bg'] || '#ef4444',
    info: tokens['--info-bg'] || '#2563eb',
  };
  const surfaceLines = generateSurfaceClasses(mode, themeColors);
  // Indent surface class lines for nesting
  for (const line of surfaceLines) {
    if (line.trim()) {
      lines.push(`  ${line}`);
    } else {
      lines.push('');
    }
  }

  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate surface class CSS for a specific mode
 *
 * Surfaces reset ALL color group tokens to their theme-level values (--_theme-*),
 * then apply modifier-specific overrides. This ensures nested surfaces properly
 * reset and don't inherit overrides from parent surfaces.
 *
 * Uses CSS nesting with & prefix since these are nested inside the theme qualifier.
 */
function generateSurfaceClasses(mode: 'light' | 'dark', themeColors: Record<string, string>): string[] {
  const lines: string[] = [];

  lines.push('/* ================================================================');
  lines.push('   TONAL SURFACE SYSTEM');
  lines.push('   Usage: <div class="surface raised">...</div>');
  lines.push('   Every .surface resets ALL color group tokens to theme defaults,');
  lines.push('   ensuring nested surfaces are isolated from parent overrides.');
  lines.push('   ================================================================ */');
  lines.push('');

  // Base .surface class - resets ALL color group tokens to theme values
  lines.push('& .surface {');

  // Reset all color group tokens using short internal references
  for (const group of COLOR_GROUPS) {
    for (const suffix of COLOR_GROUP_SUFFIXES) {
      const fullName = `${group}-${suffix}`;
      const shortName = INTERNAL_TOKEN_MAP.get(fullName);
      if (shortName) {
        lines.push(`  --${fullName}: var(${shortName});`);
      }
    }
  }

  // Also reset special tokens that surfaces might override
  const focusRingShort = INTERNAL_TOKEN_MAP.get('focus-ring');
  const selectionBgShort = INTERNAL_TOKEN_MAP.get('selection-bg');
  const selectionTextShort = INTERNAL_TOKEN_MAP.get('selection-text');
  lines.push(`  --focus-ring: var(${focusRingShort}, var(--primary-bg));`);
  lines.push(`  --selection-bg: var(${selectionBgShort});`);
  lines.push(`  --selection-text: var(${selectionTextShort});`);
  lines.push('');

  lines.push('  /* Apply base surface styles */');
  lines.push('  background: var(--base-bg);');
  lines.push('  color: var(--base-fg);');
  lines.push('');

  // Selection styles nested inside .surface
  lines.push('  /* Selection styles */');
  lines.push('  & ::selection {');
  lines.push('    background: var(--selection-bg);');
  lines.push('    color: var(--selection-text);');
  lines.push('  }');
  lines.push('');

  // Generate tonal surface modifiers (nested)
  const surfaceDefinitions = themeRules.surfaces?.types as Record<string, { description: string; overrides: Record<string, Record<string, string>> }> | undefined;

  if (surfaceDefinitions) {
    for (const surfaceName of tonalSurfaces) {
      const config = surfaceDefinitions[surfaceName];
      if (!config) continue;

      const overrides = config.overrides?.[mode] || {};

      // Skip if no overrides for this mode
      if (Object.keys(overrides).length === 0) {
        lines.push(`  /* &.${surfaceName} - ${config.description} */`);
        lines.push(`  /* No overrides for ${mode} mode */`);
        lines.push('');
        continue;
      }

      // First pass: collect resolved values so derivations can reference them
      const resolvedOverrides: Record<string, string> = {};

      // Process bg tokens first (they don't have derivations typically)
      for (const [token, value] of Object.entries(overrides)) {
        if (typeof value === 'string' && !value.startsWith('derive:')) {
          resolvedOverrides[token] = value;
        }
      }

      // Second pass: process derivations
      for (const [token, value] of Object.entries(overrides)) {
        if (typeof value === 'string' && value.startsWith('derive:')) {
          const derivationRule = value.slice(7); // Remove 'derive:' prefix
          resolvedOverrides[token] = evaluateSurfaceDerivation(derivationRule, resolvedOverrides, mode === 'dark');
        }
      }

      // For all surfaces with a defined base-bg, add accessibility overrides to ensure
      // color group tokens have sufficient contrast against the surface's base-bg
      if (resolvedOverrides['base-bg']) {
        const accessibilityOverrides = generateAccessibleSurfaceOverrides(
          surfaceName,
          resolvedOverrides['base-bg'],
          themeColors,
          mode === 'dark'
        );
        Object.assign(resolvedOverrides, accessibilityOverrides);
      }

      lines.push(`  /* &.${surfaceName} - ${config.description} */`);
      lines.push(`  &.${surfaceName} {`);
      for (const [token, value] of Object.entries(resolvedOverrides)) {
        lines.push(`    --${token}: ${value};`);
      }
      lines.push('  }');
      lines.push('');
    }
  }

  // Generate feedback surface modifiers (nested)
  // These use the soft tinted feedback tokens (--feedback-*), NOT the solid button tokens (--warning-bg etc.)
  lines.push('  /* Feedback surfaces - soft tinted backgrounds for alerts/cards */');
  const feedbackSurfacesList: FeedbackSurface[] = ['success', 'warning', 'danger', 'info'];
  for (const feedback of feedbackSurfacesList) {
    lines.push(`  &.${feedback} {`);
    lines.push(`    --base-bg: var(--feedback-${feedback}-bg);`);
    lines.push(`    --base-fg: var(--feedback-${feedback}-fg);`);
    lines.push(`    --base-border: var(--feedback-${feedback}-border);`);
    lines.push(`    background: var(--base-bg);`);
    lines.push(`    color: var(--base-fg);`);
    lines.push('  }');
    lines.push('');
  }

  // Close the .surface block
  lines.push('}');

  return lines;
}

/**
 * Load and validate a theme from JSON
 */
export function validateTheme(theme: unknown): theme is ThemeDefinition {
  if (!theme || typeof theme !== 'object') return false;

  const t = theme as Record<string, unknown>;
  const schema = themeRules.themeInputSchema;

  // Check required fields
  for (const field of schema.required) {
    if (!(field in t)) return false;
  }

  // Check id pattern
  if (typeof t.id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(t.id)) {
    return false;
  }

  // Check name
  if (typeof t.name !== 'string') return false;

  // Check colors
  if (!t.colors || typeof t.colors !== 'object') return false;
  const colors = t.colors as Record<string, unknown>;
  if (typeof colors.primary !== 'string') return false;

  return true;
}

// ============================================================================
// RUNTIME THEME GENERATION
// ============================================================================

/**
 * Simplified config for runtime theme generation (Theme Designer)
 */
export interface RuntimeThemeConfig {
  /** Primary brand color */
  primary: string;
  /** Secondary color (optional) */
  secondary?: string;
  /** Accent color (optional) */
  accent?: string;
  /** Neutral color (optional) */
  neutral?: string;

  /** Light mode background color override */
  lightBg?: string;
  /** Dark mode background color override */
  darkBg?: string;

  /** Saturation adjustment (-100 to 100) */
  saturation?: number;
  /** Temperature adjustment (-100 to 100) */
  temperature?: number;

  /** Border radius scale (default 1.0) */
  radiusScale?: number;
  /** Border radius style */
  radiusStyle?: 'sharp' | 'subtle' | 'rounded' | 'pill';

  /** Control size scale (0.8 to 1.3) */
  sizeScale?: number;

  /** Glow intensity (0 to 1) */
  glowIntensity?: number;

  /** Accessibility level */
  accessibilityLevel?: 'AA' | 'AAA';

  // Typography settings
  /** Sans-serif font family */
  fontSans?: string;
  /** Monospace font family */
  fontMono?: string;
  /** Serif font family */
  fontSerif?: string;
  /** Base font size in pixels (default 15) */
  fontBaseSize?: number;
  /** Font size scale multiplier (default 1.0) */
  fontScale?: number;
}

/**
 * Convert a font value from JSON array format to CSS font-family string.
 * The Theme Designer stores fonts as JSON arrays (e.g., '["Inter", "system-ui"]')
 * but CSS needs comma-separated strings (e.g., 'Inter, system-ui').
 */
function fontValueToCss(value: string | undefined): string | undefined {
  if (!value) return undefined;

  // Check if it's a JSON array (starts with '[')
  if (value.startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.join(', ');
      }
    } catch {
      // Not valid JSON, return as-is
    }
  }

  // Return as-is (already a CSS string or legacy format)
  return value;
}

/**
 * Convert RuntimeThemeConfig to ThemeDefinition
 */
function runtimeConfigToDefinition(config: RuntimeThemeConfig): ThemeDefinition {
  const overrides: ThemeDefinition['overrides'] = {};

  // Apply background overrides
  if (config.lightBg) {
    overrides.light = { '--page-bg': config.lightBg };
  }
  if (config.darkBg) {
    overrides.dark = { '--page-bg': config.darkBg };
  }

  return {
    id: 'runtime',
    name: 'Runtime Theme',
    colors: {
      primary: config.primary,
      secondary: config.secondary,
      accent: config.accent,
      neutral: config.neutral,
    },
    config: {
      saturation: config.saturation ?? 0,
      temperature: config.temperature ?? 0,
    },
    typography: {
      // Convert font values from JSON array format to CSS strings
      fontSans: fontValueToCss(config.fontSans),
      fontMono: fontValueToCss(config.fontMono),
      fontSerif: fontValueToCss(config.fontSerif),
      baseSize: config.fontBaseSize,
      scale: config.fontScale,
    },
    radii: {
      scale: config.radiusScale ?? 1,
      style: config.radiusStyle ?? 'rounded',
    },
    accessibility: {
      level: config.accessibilityLevel ?? 'AA',
    },
    overrides,
  };
}

/**
 * Generate theme tokens for runtime use (Theme Designer)
 *
 * This is the main function for browser-side theme generation.
 * It accepts a simplified config and returns tokens for a specific mode.
 */
export function generateRuntimeThemeTokens(
  config: RuntimeThemeConfig,
  mode: 'light' | 'dark'
): Record<string, string> {
  const definition = runtimeConfigToDefinition(config);
  const tokens = generateThemeTokens(definition, mode);

  // Add size scale tokens (not in core generator yet)
  const sizeScale = config.sizeScale ?? 1;
  const baseSizes = {
    '--control-height-sm': 28,
    '--control-height-md': 36,
    '--control-height-lg': 44,
    '--control-height-xl': 52,
  };
  for (const [token, baseValue] of Object.entries(baseSizes)) {
    tokens[token] = `${Math.round(baseValue * sizeScale)}px`;
  }

  // Add glow tokens (not in core generator yet)
  const glowIntensity = config.glowIntensity ?? 0.5;
  const glowOpacity = Math.round(glowIntensity * 40);
  tokens['--glow-intensity'] = String(glowIntensity);
  tokens['--glow-spread-sm'] = `${Math.round(8 * glowIntensity)}px`;
  tokens['--glow-spread-md'] = `${Math.round(20 * glowIntensity)}px`;
  tokens['--glow-spread-lg'] = `${Math.round(40 * glowIntensity)}px`;
  tokens['--glow-opacity'] = `${glowOpacity}%`;
  tokens['--glow-color'] = config.primary;

  return tokens;
}

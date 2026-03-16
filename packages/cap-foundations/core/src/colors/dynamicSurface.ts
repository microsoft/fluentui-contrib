/**
 * Dynamic Surface Color Generation
 *
 * Generates accessible, theme-aware surface color schemes from HSL hue/saturation values.
 * Creates cohesive palettes that work in both light and dark modes with proper contrast.
 *
 * @example
 * ```ts
 * import { generateSurfaceColors, SURFACE_PRESETS, injectSurfaceStyles } from '@fluentui-contrib/cap-foundations-core';
 *
 * // Generate colors for a custom hue
 * const colors = generateSurfaceColors(16, 90, 'light');
 * // Returns { bg, text, textSoft, border, icon } as HSL strings
 *
 * // Use preset surfaces
 * const roseColors = generateSurfaceColors('rose', ...SURFACE_PRESETS.rose, 'dark');
 *
 * // Inject all preset surfaces as CSS classes
 * injectSurfaceStyles(); // Creates .dynamicSurface-rose, .dynamicSurface-coral, etc.
 * ```
 */

/**
 * Surface color definition - hue and base saturation
 */
export interface SurfaceDefinition {
  /** Unique name for the surface (used in CSS class names) */
  name: string;
  /** HSL hue (0-360) and saturation (0-100) */
  hsl: [hue: number, saturation: number];
}

/**
 * Generated surface colors as HSL strings
 */
export interface SurfaceColors {
  /** Background color */
  bg: string;
  /** Primary text color */
  text: string;
  /** Secondary/soft text color */
  textSoft: string;
  /** Border color */
  border: string;
  /** Icon color */
  icon: string;
}

/**
 * CSS custom properties for a surface
 * Uses standard token names so components automatically pick up the colors
 */
export interface SurfaceCSSVariables {
  '--base-bg': string;
  '--base-fg': string;
  '--base-fg-soft': string;
  '--base-border': string;
  '--base-fg-primary': string;
}

/**
 * Color mode for surface generation
 */
export type ColorMode = 'light' | 'dark';

/**
 * 32 preset surface definitions covering the full color spectrum
 */
export const SURFACE_PRESETS: Record<string, [hue: number, saturation: number]> = {
  // Reds & Pinks (340-30)
  crimson: [0, 85],
  rose: [350, 85],
  ruby: [340, 80],
  coral: [16, 90],
  // Oranges & Yellows (30-60)
  tangerine: [25, 92],
  amber: [38, 95],
  honey: [45, 90],
  gold: [50, 88],
  // Yellow-Greens (60-100)
  lime: [80, 70],
  olive: [75, 50],
  moss: [95, 55],
  chartreuse: [90, 75],
  // Greens (100-160)
  sage: [140, 60],
  emerald: [130, 70],
  forest: [150, 65],
  mint: [160, 75],
  // Cyans & Teals (160-200)
  teal: [175, 80],
  aqua: [185, 85],
  cyan: [190, 88],
  cerulean: [195, 82],
  // Blues (200-240)
  sky: [200, 90],
  ocean: [210, 85],
  steel: [215, 45],
  cobalt: [230, 80],
  // Purples & Indigos (240-280)
  indigo: [250, 75],
  grape: [260, 70],
  lavender: [270, 70],
  violet: [280, 75],
  // Magentas & Pinks (280-340)
  plum: [290, 65],
  fuchsia: [300, 80],
  mauve: [320, 65],
  pink: [330, 75],
} as const;

/**
 * All available preset surface names
 */
export const SURFACE_PRESET_NAMES = Object.keys(SURFACE_PRESETS) as ReadonlyArray<keyof typeof SURFACE_PRESETS>;

/**
 * Generate surface colors for a given hue, saturation, and color mode
 */
export function generateSurfaceColors(
  hue: number,
  saturation: number,
  mode: ColorMode
): SurfaceColors {
  const h = hue;
  const s = saturation;

  if (mode === 'light') {
    const bgL = 85;
    const bgS = Math.min(s * 0.75, 70);

    const textL = 20;
    const softTextL = 35;
    const iconL = 30;
    const textS = Math.min(s * 0.8, 50);
    const softTextS = Math.min(s * 0.6, 40);
    const iconS = Math.min(s * 0.7, 60);

    const borderL = 58;
    const borderS = Math.min(s * 0.7, 60);

    return {
      bg: `hsl(${h}, ${bgS}%, ${bgL}%)`,
      text: `hsl(${h}, ${textS}%, ${textL}%)`,
      textSoft: `hsl(${h}, ${softTextS}%, ${softTextL}%)`,
      border: `hsl(${h}, ${borderS}%, ${borderL}%)`,
      icon: `hsl(${h}, ${iconS}%, ${iconL}%)`,
    };
  } else {
    const bgL = 28;
    const bgS = Math.min(s + 10, 95);

    const textL = 95;
    const softTextL = 80;
    const iconL = 88;
    const textS = Math.min(s * 0.3, 25);
    const softTextS = Math.min(s * 0.25, 20);
    const iconS = Math.min(s * 0.5, 50);

    const borderL = 38;
    const borderS = Math.min(s + 5, 90);

    return {
      bg: `hsl(${h}, ${bgS}%, ${bgL}%)`,
      text: `hsl(${h}, ${textS}%, ${textL}%)`,
      textSoft: `hsl(${h}, ${softTextS}%, ${softTextL}%)`,
      border: `hsl(${h}, ${borderS}%, ${borderL}%)`,
      icon: `hsl(${h}, ${iconS}%, ${iconL}%)`,
    };
  }
}

/**
 * Generate surface colors from a preset name
 */
export function generateSurfaceFromPreset(
  presetName: string,
  mode: ColorMode
): SurfaceColors | null {
  const preset = SURFACE_PRESETS[presetName];
  if (!preset) return null;
  return generateSurfaceColors(preset[0], preset[1], mode);
}

/**
 * Convert surface colors to CSS custom properties using standard token names
 */
export function surfaceColorsToCSSVariables(colors: SurfaceColors): SurfaceCSSVariables {
  return {
    '--base-bg': colors.bg,
    '--base-fg': colors.text,
    '--base-fg-soft': colors.textSoft,
    '--base-border': colors.border,
    '--base-fg-primary': colors.icon,
  };
}

/**
 * Generate CSS class definition for a dynamic surface
 */
export function generateSurfaceCSS(
  name: string,
  hue: number,
  saturation: number,
  mode: ColorMode,
  classPrefix = 'dynamicSurface'
): string {
  const colors = generateSurfaceColors(hue, saturation, mode);

  return `
.${classPrefix}-${name} {
  --base-bg: ${colors.bg};
  --base-fg: ${colors.text};
  --base-fg-soft: ${colors.textSoft};
  --base-border: ${colors.border};
  --base-fg-primary: ${colors.icon};
  background: var(--base-bg);
  color: var(--base-fg);
  border-color: var(--base-border);
}`;
}

/**
 * Generate complete CSS for all preset surfaces in both modes
 */
export function generateAllSurfaceCSS(
  classPrefix = 'dynamicSurface',
  darkModeSelector = '[data-mode="dark"]'
): string {
  const lightCSS = Object.entries(SURFACE_PRESETS)
    .map(([name, [hue, sat]]) => generateSurfaceCSS(name, hue, sat, 'light', classPrefix))
    .join('\n');

  const darkCSS = Object.entries(SURFACE_PRESETS)
    .map(([name, [hue, sat]]) => {
      const css = generateSurfaceCSS(name, hue, sat, 'dark', classPrefix);
      return css.replace(
        new RegExp(`\\.${classPrefix}-${name}`, 'g'),
        `${darkModeSelector} .${classPrefix}-${name}`
      );
    })
    .join('\n');

  return `/* Dynamic Surface Colors - Light Mode (default) */
${lightCSS}

/* Dynamic Surface Colors - Dark Mode */
${darkCSS}`;
}

/**
 * Inject dynamic surface styles into the document head (SSR-safe)
 */
export function injectSurfaceStyles(options: {
  classPrefix?: string;
  darkModeSelector?: string;
  styleId?: string;
} = {}): void {
  if (typeof document === 'undefined') return;

  const {
    classPrefix = 'dynamicSurface',
    darkModeSelector = '[data-mode="dark"]',
    styleId = 'dynamic-surface-styles',
  } = options;

  const existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  const css = generateAllSurfaceCSS(classPrefix, darkModeSelector);
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Get a random preset surface name
 */
export function getRandomSurfaceName(): string {
  const names = SURFACE_PRESET_NAMES;
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Get the CSS class name for a surface
 */
export function getSurfaceClassName(name: string, classPrefix = 'dynamicSurface'): string {
  return `${classPrefix}-${name}`;
}

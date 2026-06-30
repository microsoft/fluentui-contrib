/**
 * Theme type definitions
 */

import type { RadiiStyle } from '../tokens/radii';

/**
 * Accessibility level
 */
export type AccessibilityLevel = 'AA' | 'AAA';

/**
 * Theme color definition
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  /** Secondary color (optional, computed if omitted) */
  secondary?: string;
  /** Accent color (optional, computed if omitted) */
  accent?: string;
  /** Neutral/gray base (optional, derived from primary) */
  neutral?: string;
}

/**
 * Typography configuration
 */
export interface ThemeTypography {
  fontSans?: string;
  fontMono?: string;
  fontSerif?: string;
  scale?: number;
  baseSize?: number;
}

/**
 * Spacing configuration
 */
export interface ThemeSpacing {
  scale?: number;
  baseUnit?: number;
}

/**
 * Border radius configuration
 */
export interface ThemeRadii {
  scale?: number;
  style?: RadiiStyle;
}

/**
 * Animation configuration
 */
export interface ThemeAnimation {
  scale?: number;
  reduceMotion?: boolean;
}

/**
 * Accessibility configuration
 */
export interface ThemeAccessibility {
  level?: AccessibilityLevel;
}

/**
 * Color adjustment configuration
 */
export interface ThemeConfig {
  saturation?: number;
  temperature?: number;
  contrastBoost?: number;
}

/**
 * Custom surface definition
 */
export interface CustomSurface {
  background: string;
  text?: string;
  border?: string;
}

/**
 * Token overrides for specific modes
 */
export interface ThemeOverrides {
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

/**
 * Complete theme definition
 */
export interface ThemeDefinition {
  id: string;
  name: string;
  description?: string;
  colors: ThemeColors;
  typography?: ThemeTypography;
  spacing?: ThemeSpacing;
  radii?: ThemeRadii;
  animation?: ThemeAnimation;
  accessibility?: ThemeAccessibility;
  config?: ThemeConfig;
  surfaces?: Record<string, CustomSurface>;
  overrides?: ThemeOverrides;
}

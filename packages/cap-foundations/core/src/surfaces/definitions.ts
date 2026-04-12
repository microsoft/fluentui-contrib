/**
 * Surface definitions for the tonal surface system
 */

import type {
  SurfaceType,
  TonalSurface,
  FeedbackSurface,
} from './types';

// ============================================================================
// TONAL SURFACES
// ============================================================================

/**
 * All tonal surface types
 */
export const tonalSurfaces: readonly TonalSurface[] = [
  'base',
  'raised',
  'sunken',
  'soft',
  'softer',
  'strong',
  'stronger',
  'inverted',
  'primary',
] as const;

/**
 * All feedback surface types
 */
export const feedbackSurfaces: readonly FeedbackSurface[] = [
  'success',
  'warning',
  'danger',
  'info',
] as const;

/**
 * All surface types (tonal + feedback)
 */
export const surfaceTypes: readonly SurfaceType[] = [
  ...tonalSurfaces,
  ...feedbackSurfaces,
] as const;

/**
 * Check if a value is a valid surface type
 */
export function isSurfaceType(value: string): value is SurfaceType {
  return surfaceTypes.includes(value as SurfaceType);
}

/**
 * Check if a value is a tonal surface
 */
export function isTonalSurface(value: string): value is TonalSurface {
  return tonalSurfaces.includes(value as TonalSurface);
}

/**
 * Check if a value is a feedback surface
 */
export function isFeedbackSurface(value: string): value is FeedbackSurface {
  return feedbackSurfaces.includes(value as FeedbackSurface);
}

/**
 * CSS class name for a surface
 *
 * Returns "surface {modifier}" for use with the .surface base class
 * Example: surfaceClassName('raised') => 'surface raised'
 */
export function surfaceClassName(name: SurfaceType): string {
  return `surface ${name}`;
}

/**
 * Get CSS classes for a surface
 * Returns an object for use with classnames libraries or template strings
 *
 * Example: getSurfaceClasses('raised') => { surface: true, raised: true }
 */
export function getSurfaceClasses(surface: SurfaceType): Record<string, boolean> {
  return {
    surface: true,
    [surface]: true,
  };
}

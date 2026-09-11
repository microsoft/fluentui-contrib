/**
 * Token exports
 */
export * from './spacing';
export * from './typography';
export * from './radii';
export * from './shadows';
export * from './animation';
export * from './gradients';

import { spacingTokens } from './spacing';
import { typographyTokens } from './typography';
import { radiiTokens } from './radii';
import { shadowTokens } from './shadows';
import { animationTokens } from './animation';
import { gradientTokens } from './gradients';

/**
 * All static tokens (non-color)
 */
export const staticTokens = {
  ...spacingTokens,
  ...typographyTokens,
  ...radiiTokens,
  ...shadowTokens,
  ...animationTokens,
  ...gradientTokens,
} as const;

export type StaticToken = keyof typeof staticTokens;

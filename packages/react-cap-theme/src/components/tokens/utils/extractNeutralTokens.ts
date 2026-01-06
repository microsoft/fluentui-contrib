import type { PartialTheme } from '../types';

/**
 * @public
 * Extracts neutral colors from a theme object.
 *
 * @param theme - The theme object containing various token values
 * @returns An array of objects containing the token name and its corresponding color value
 */
export const extractNeutralTokens = (theme: PartialTheme): { token: string; value: string }[] => {
  return Object.entries(theme)
    .filter(([key, value]) => key.startsWith('colorNeutral') && typeof value === 'string') // Filter neutral color tokens
    .map(([key, value]) => ({ token: key, value: value as string })); // Return the token and value
};

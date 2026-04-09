import type { PartialTheme } from '../types';

export const extractNeutralTokens = (
  theme: PartialTheme
): { token: string; value: string }[] => {
  return Object.entries(theme)
    .filter(
      ([key, value]) =>
        key.startsWith('colorNeutral') && typeof value === 'string'
    )
    .map(([key, value]) => ({ token: key, value: value as string }));
};

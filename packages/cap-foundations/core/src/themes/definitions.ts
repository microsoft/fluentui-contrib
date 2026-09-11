import type { ThemeDefinition } from './types';
import defaultThemeJson from './definitions/default.json';

export const defaultTheme = defaultThemeJson as ThemeDefinition;

export const themes: readonly ThemeDefinition[] = [defaultTheme];

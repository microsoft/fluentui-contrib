import type { PartialTheme } from '../types';
import { extractNeutralTokens } from './extractNeutralTokens';

describe('extractNeutralTokens', () => {
  it('should return only neutral tokens with valid hex color values', () => {
    const theme: PartialTheme = {
      colorBrandBackground: '#0078d4', // Not a neutral token
      colorNeutralForeground1: '#323130',
      colorNeutralBackground1: '#ffffff',
      colorNeutralForeground2: '#605e5c',
      fontWeightMedium: 400, // Not a color value
      fontWeightRegular: 600 // Not a color value
    };

    const result = extractNeutralTokens(theme);

    expect(result).toEqual([
      { token: 'colorNeutralForeground1', value: '#323130' },
      { token: 'colorNeutralBackground1', value: '#ffffff' },
      { token: 'colorNeutralForeground2', value: '#605e5c' }
    ]);
  });

  it('should return an empty array if no neutral tokens are present', () => {
    const theme: PartialTheme = {
      colorBrandBackground2: '#0078d4',
      fontWeightMedium: 400,
      fontWeightRegular: 600
    };

    const result = extractNeutralTokens(theme);

    expect(result).toEqual([]);
  });

  it('should return an empty array for an empty theme object', () => {
    const theme: PartialTheme = {};

    const result = extractNeutralTokens(theme);

    expect(result).toEqual([]);
  });

  it('should ignore non-string values in the theme', () => {
    const theme: PartialTheme = {
      colorNeutralForeground1: '#323130',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      colorNeutralBackground1: 123 as any, // Invalid
      colorNeutralForeground2: '#605e5c'
    };

    const result = extractNeutralTokens(theme);

    expect(result).toEqual([
      { token: 'colorNeutralForeground1', value: '#323130' },
      { token: 'colorNeutralForeground2', value: '#605e5c' }
    ]);
  });
});

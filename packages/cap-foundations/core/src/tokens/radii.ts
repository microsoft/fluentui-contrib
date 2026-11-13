/**
 * Border radius tokens
 */
export const radiiTokens = {
  '--radius-sm': '2px',
  '--radius-md': '4px',
  '--radius-lg': '8px',
  '--radius-xl': '12px',
  '--radius-2xl': '16px',
  '--radius-full': '9999px',
} as const;

export type RadiiToken = keyof typeof radiiTokens;
export type RadiiValue = (typeof radiiTokens)[RadiiToken];

export type RadiiStyle = 'sharp' | 'subtle' | 'rounded' | 'pill';

const styleBaseValues: Record<RadiiStyle, number> = {
  sharp: 0,
  subtle: 2,
  rounded: 4,
  pill: 8,
};

/**
 * Generate radii tokens with custom options
 */
export function generateRadiiTokens(options: {
  style?: RadiiStyle;
  scale?: number;
} = {}): Record<RadiiToken, string> {
  const { style = 'rounded', scale = 1.0 } = options;

  const baseValue = styleBaseValues[style];

  const multipliers: Record<RadiiToken, number> = {
    '--radius-sm': 0.5,
    '--radius-md': 1,
    '--radius-lg': 2,
    '--radius-xl': 3,
    '--radius-2xl': 4,
    '--radius-full': 9999,
  };

  return Object.fromEntries(
    Object.entries(multipliers).map(([token, multiplier]) => {
      if (token === '--radius-full') {
        return [token, '9999px'];
      }
      const value = Math.round(baseValue * multiplier * scale);
      return [token, `${value}px`];
    })
  ) as Record<RadiiToken, string>;
}

/**
 * Spacing tokens based on a 4px grid
 */
export const spacingTokens = {
  '--space-1': '4px',
  '--space-2': '8px',
  '--space-3': '12px',
  '--space-4': '16px',
  '--space-5': '20px',
  '--space-6': '24px',
  '--space-8': '32px',
  '--space-10': '40px',
  '--space-12': '48px',
  '--space-16': '64px',
  '--space-20': '80px',
  '--space-24': '96px',
} as const;

export type SpacingToken = keyof typeof spacingTokens;
export type SpacingValue = (typeof spacingTokens)[SpacingToken];

/**
 * Generate spacing tokens with a custom scale
 */
export function generateSpacingTokens(options: {
  baseUnit?: number;
  scale?: number;
} = {}): Record<SpacingToken, string> {
  const { baseUnit = 4, scale = 1.0 } = options;

  const multipliers: Record<SpacingToken, number> = {
    '--space-1': 1,
    '--space-2': 2,
    '--space-3': 3,
    '--space-4': 4,
    '--space-5': 5,
    '--space-6': 6,
    '--space-8': 8,
    '--space-10': 10,
    '--space-12': 12,
    '--space-16': 16,
    '--space-20': 20,
    '--space-24': 24,
  };

  return Object.fromEntries(
    Object.entries(multipliers).map(([token, multiplier]) => [
      token,
      `${Math.round(baseUnit * multiplier * scale)}px`,
    ])
  ) as Record<SpacingToken, string>;
}

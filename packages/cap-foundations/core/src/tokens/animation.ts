/**
 * Animation tokens
 */

// Duration tokens
export const durationTokens = {
  '--duration-fast': '100ms',
  '--duration-normal': '200ms',
  '--duration-slow': '300ms',
} as const;

// Easing tokens
export const easingTokens = {
  '--ease-default': 'ease-out',
  '--ease-in': 'ease-in',
  '--ease-out': 'ease-out',
  '--ease-in-out': 'ease-in-out',
  '--ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const animationTokens = {
  ...durationTokens,
  ...easingTokens,
} as const;

export type DurationToken = keyof typeof durationTokens;
export type EasingToken = keyof typeof easingTokens;
export type AnimationToken = keyof typeof animationTokens;

/** Animation tokens type for custom generation */
export type AnimationTokenValues = {
  '--duration-fast': string;
  '--duration-normal': string;
  '--duration-slow': string;
  '--ease-default': string;
  '--ease-in': string;
  '--ease-out': string;
  '--ease-in-out': string;
  '--ease-bounce': string;
};

/**
 * Generate animation tokens with custom options
 */
export function generateAnimationTokens(options: {
  scale?: number;
  reduceMotion?: boolean;
} = {}): AnimationTokenValues {
  const { scale = 1.0, reduceMotion = false } = options;

  if (reduceMotion) {
    return {
      '--duration-fast': '0ms',
      '--duration-normal': '0ms',
      '--duration-slow': '0ms',
      '--ease-default': easingTokens['--ease-default'],
      '--ease-in': easingTokens['--ease-in'],
      '--ease-out': easingTokens['--ease-out'],
      '--ease-in-out': easingTokens['--ease-in-out'],
      '--ease-bounce': easingTokens['--ease-bounce'],
    };
  }

  const baseDurations: Record<DurationToken, number> = {
    '--duration-fast': 100,
    '--duration-normal': 200,
    '--duration-slow': 300,
  };

  return {
    '--duration-fast': `${Math.round(baseDurations['--duration-fast'] * scale)}ms`,
    '--duration-normal': `${Math.round(baseDurations['--duration-normal'] * scale)}ms`,
    '--duration-slow': `${Math.round(baseDurations['--duration-slow'] * scale)}ms`,
    '--ease-default': easingTokens['--ease-default'],
    '--ease-in': easingTokens['--ease-in'],
    '--ease-out': easingTokens['--ease-out'],
    '--ease-in-out': easingTokens['--ease-in-out'],
    '--ease-bounce': easingTokens['--ease-bounce'],
  };
}

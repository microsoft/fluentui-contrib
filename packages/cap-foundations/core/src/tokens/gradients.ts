/**
 * Gradient tokens
 *
 * Brand flair gradients for premium visual elements.
 * Based on Copilot brand colors from Koto design system.
 */

// Brand flair color stops (Copilot gradient)
export const brandFlairTokens = {
  '--brand-flair-1': '#464FEB', // Purple/blue
  '--brand-flair-2': '#47CFFA', // Cyan
  '--brand-flair-3': '#B47CF8', // Violet
} as const;

// Gradient definitions
export const gradientTokens = {
  '--gradient-brand':
    'linear-gradient(90deg, var(--brand-flair-1), var(--brand-flair-2), var(--brand-flair-3))',
  '--gradient-brand-vertical':
    'linear-gradient(180deg, var(--brand-flair-1), var(--brand-flair-2), var(--brand-flair-3))',
  '--gradient-brand-diagonal':
    'linear-gradient(135deg, var(--brand-flair-1), var(--brand-flair-2), var(--brand-flair-3))',
  ...brandFlairTokens,
} as const;

export type BrandFlairToken = keyof typeof brandFlairTokens;
export type GradientToken = keyof typeof gradientTokens;

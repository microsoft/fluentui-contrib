/**
 * Shadow tokens
 */
export const shadowTokens = {
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '--shadow-inner': 'inset 0 1px 0 0 rgba(0, 0, 0, 0.06)',
} as const;

export type ShadowToken = keyof typeof shadowTokens;
export type ShadowValue = (typeof shadowTokens)[ShadowToken];

/**
 * Generate shadow tokens for dark mode (reduced opacity)
 */
export function generateDarkModeShadows(): Record<ShadowToken, string> {
  return {
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
    '--shadow-inner': 'inset 0 1px 0 0 rgba(0, 0, 0, 0.15)',
  };
}

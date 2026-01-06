import type { FontSizeTokens, FontStyleTokens, LineHeightTokens } from '../types';

/**
 * Global font sizes
 */
export const fontSizes: Pick<FontSizeTokens, 'fontSizeBase450'> = {
  fontSizeBase450: '18px'
};

/**
 * Global font styles
 */
export const fontStyles: FontStyleTokens = {
  fontStyleRegular: 'normal',
  fontStyleItalic: 'italic'
};

/**
 * Global line heights
 */
export const lineHeights: Pick<LineHeightTokens, 'lineHeightBase450'> = {
  lineHeightBase450: '24px'
};

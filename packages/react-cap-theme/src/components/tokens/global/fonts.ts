import type {
  FontSizeTokens,
  FontStyleTokens,
  LineHeightTokens,
} from '../types';

export const fontSizes: Pick<FontSizeTokens, 'fontSizeBase450'> = {
  fontSizeBase450: '18px',
};

export const fontStyles: FontStyleTokens = {
  fontStyleRegular: 'normal',
  fontStyleItalic: 'italic',
};

export const lineHeights: Pick<LineHeightTokens, 'lineHeightBase450'> = {
  lineHeightBase450: '24px',
};

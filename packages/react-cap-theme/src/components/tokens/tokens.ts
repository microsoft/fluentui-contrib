import { tokens as fluentTokens } from '@fluentui/tokens';
import type { TokenName } from './types';

export const tokens: Record<TokenName, string> = {
  ...fluentTokens,
  borderRadius2XLarge: 'var(--borderRadius2XLarge)',
  borderRadius3XLarge: 'var(--borderRadius3XLarge)',
  borderRadius4XLarge: 'var(--borderRadius4XLarge)',
  colorNeutralStroke4: 'var(--colorNeutralStroke4)',
  colorNeutralStroke4Hover: 'var(--colorNeutralStroke4Hover)',
  colorNeutralStroke4Pressed: 'var(--colorNeutralStroke4Pressed)',
  colorNeutralStroke4Selected: 'var(--colorNeutralStroke4Selected)',
};

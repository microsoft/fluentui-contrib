import type { Theme as FluentTheme } from '@fluentui/tokens';

export type FIXME_MISSING_TOKENS = {
  borderRadius2XLarge: string;
  borderRadius3XLarge: string;
  borderRadius4XLarge: string;
  colorNeutralStroke4: string;
  colorNeutralStroke4Hover: string;
  colorNeutralStroke4Pressed: string;
  colorNeutralStroke4Selected: string;
};

export const FIXME_MISSING_TOKENS_DEFAULTS: FIXME_MISSING_TOKENS = {
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
};

export type Theme = FluentTheme & FIXME_MISSING_TOKENS;

export type TokenName = keyof Theme;

import {
  type Theme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import type { FluentProviderProps } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../src/index';
import type { CAPTokens } from '../src/components/tokens/types';

const capLightTokens: CAPTokens = {
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
  colorNeutralForeground5: '#616161',
  colorNeutralForeground5Hover: '#242424',
  colorNeutralForeground5Pressed: '#242424',
};

const capDarkTokens: CAPTokens = {
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#3d3d3d',
  colorNeutralStroke4Hover: '#444444',
  colorNeutralStroke4Pressed: '#4a4a4a',
  colorNeutralStroke4Selected: '#3d3d3d',
  colorNeutralForeground5: '#adadad',
  colorNeutralForeground5Hover: '#ffffff',
  colorNeutralForeground5Pressed: '#ffffff',
};

const capLightTheme: Theme = { ...webLightTheme, ...capLightTokens };
const capDarkTheme: Theme = { ...webDarkTheme, ...capDarkTokens };

export type ThemeId = 'fluentLight' | 'fluentDark' | 'capLight' | 'capDark';

type ThemeConfig = {
  title: string;
  theme: Theme;
  styleHooks?: FluentProviderProps['customStyleHooks_unstable'];
};

export const THEMES: Record<ThemeId, ThemeConfig> = {
  fluentLight: { title: 'Fluent UI Light', theme: webLightTheme },
  fluentDark: { title: 'Fluent UI Dark', theme: webDarkTheme },
  capLight: {
    title: 'CAP Light',
    theme: capLightTheme,
    styleHooks: CAP_STYLE_HOOKS,
  },
  capDark: {
    title: 'CAP Dark',
    theme: capDarkTheme,
    styleHooks: CAP_STYLE_HOOKS,
  },
};

export const DEFAULT_THEME: ThemeId = 'capLight';

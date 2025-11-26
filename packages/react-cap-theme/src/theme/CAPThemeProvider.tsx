import * as React from 'react';
import {
  BadgeState,
  CardFooterState,
  CardHeaderState,
  CardState,
  FluentProvider,
  FluentProviderProps,
  InputState,
  type Theme,
} from '@fluentui/react-components';

import type { ButtonState } from '../components/Button';

import { useButtonStylesHook } from '../components/Button/Button.styles';
import { CAPTheme, formatCAPTokenCssVar } from './CAPTheme';
import { useBadgeStylesHook } from '../components/Badge/Badge.styles';
import { useInputStylesHook } from '../components/Input/Input.styles';
import { useCardStylesHook } from '../components/Card/Card.styles';
import { useCardHeaderStylesHook } from '../components/Card/CardHeader.styles';
import { useCardFooterStylesHook } from '../components/Card/CardFooter.styles';

const customStyleHooks: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = {
  useBadgeStyles_unstable: (state) => useBadgeStylesHook(state as BadgeState),
  useButtonStyles_unstable: (state) =>
    useButtonStylesHook(state as ButtonState),
  useCardStyles_unstable: (state) => useCardStylesHook(state as CardState),
  useCardHeaderStyles_unstable: (state) =>
    useCardHeaderStylesHook(state as CardHeaderState),
  useCardFooterStyles_unstable: (state) =>
    useCardFooterStylesHook(state as CardFooterState),
  useInputStyles_unstable: (state) => useInputStylesHook(state as InputState),
};

export const CAPThemeProvider = ({
  children,
  theme: _theme,
}: {
  children: React.ReactNode;
  theme: Partial<Theme> & Partial<CAPTheme>;
}): React.ReactElement => {
  const theme: Record<string, string | number | null> = {};
  for (const [key, value] of Object.entries(_theme)) {
    theme[formatCAPTokenCssVar(key)] = value;
  }
  return (
    <FluentProvider theme={theme} customStyleHooks_unstable={customStyleHooks}>
      {children}
    </FluentProvider>
  );
};

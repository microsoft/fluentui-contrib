import * as React from 'react';
import {
  FluentProvider,
  FluentProviderProps,
  type Theme,
} from '@fluentui/react-components';

import { useCAPButtonStylesHook } from './Button.styles';
import { CAPTheme } from './Theme';
import { useCAPBadgeStylesHook } from './Badge.styles';
import { useCAPInputStylesHook } from './Input.styles';
import {
  useCAPCardFooterStylesHook,
  useCAPCardHeaderStylesHook,
  useCAPCardStylesHook,
} from './Card.styles';

const customStyleHooks: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = {
  useBadgeStyles_unstable: useCAPBadgeStylesHook,
  useButtonStyles_unstable: useCAPButtonStylesHook,
  useCardStyles_unstable: useCAPCardStylesHook,
  useCardHeaderStyles_unstable: useCAPCardHeaderStylesHook,
  useCardFooterStyles_unstable: useCAPCardFooterStylesHook,
  useInputStyles_unstable: useCAPInputStylesHook,
};

export const CAPThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Partial<Theme> & Partial<CAPTheme>;
}): React.ReactElement => {
  return (
    <FluentProvider theme={theme} customStyleHooks_unstable={customStyleHooks}>
      {children}
    </FluentProvider>
  );
};

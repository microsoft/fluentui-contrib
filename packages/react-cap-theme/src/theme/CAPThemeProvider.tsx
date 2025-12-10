import * as React from 'react';
import {
  BadgeState,
  ButtonState,
  CardFooterState,
  CardHeaderState,
  CardState,
  DialogBodyState,
  DialogSurfaceState,
  DrawerBodyState,
  DrawerFooterState,
  DrawerHeaderNavigationState,
  DrawerHeaderState,
  DrawerHeaderTitleState,
  DrawerState,
  FluentProvider,
  FluentProviderProps,
  InputState,
  InlineDrawerState,
  OverlayDrawerState,
  type Theme,
} from '@fluentui/react-components';

import { useButtonStylesHook } from '../components/Button/Button.styles';
import { CAPTheme, formatCAPTokenCssVar } from './CAPTheme';
import { useBadgeStylesHook } from '../components/Badge/Badge.styles';
import { useInputStylesHook } from '../components/Input/Input.styles';
import { useCardStylesHook } from '../components/Card/Card.styles';
import { useCardHeaderStylesHook } from '../components/Card/CardHeader.styles';
import { useCardFooterStylesHook } from '../components/Card/CardFooter.styles';
import { useDialogBodyStylesHook } from '../components/Dialog/DialogBody.styles';
import { useDrawerStylesHook } from '../components/Drawer/Drawer.styles';
import { useDrawerBodyStylesHook } from '../components/Drawer/DrawerBody.styles';
import { useDrawerHeaderStylesHook } from '../components/Drawer/DrawerHeader.styles';
import { useDrawerHeaderTitleStylesHook } from '../components/Drawer/DrawerHeaderTitle.styles';
import { useDrawerHeaderNavigationStylesHook } from '../components/Drawer/DrawerHeaderNavigation.styles';
import { useDrawerFooterStylesHook } from '../components/Drawer/DrawerFooter.styles';
import { useInlineDrawerStylesHook } from '../components/Drawer/InlineDrawer.styles';
import { useOverlayDrawerStylesHook } from '../components/Drawer/OverlayDrawer.styles';
import { useDialogSurfaceStylesHook } from '../components/Dialog/DialogSurface.styles';

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
  useDialogBodyStyles_unstable: (state) =>
    useDialogBodyStylesHook(state as DialogBodyState),
  useDialogSurfaceStyles_unstable: (state) =>
    useDialogSurfaceStylesHook(state as DialogSurfaceState),
  useDrawerStyles_unstable: (state) =>
    useDrawerStylesHook(state as DrawerState),
  useOverlayDrawerStyles_unstable: (state) =>
    useOverlayDrawerStylesHook(state as OverlayDrawerState),
  useDrawerOverlayStyles_unstable: (state) =>
    useOverlayDrawerStylesHook(state as OverlayDrawerState),
  useInlineDrawerStyles_unstable: (state) =>
    useInlineDrawerStylesHook(state as InlineDrawerState),
  useDrawerInlineStyles_unstable: (state) =>
    useInlineDrawerStylesHook(state as InlineDrawerState),
  useDrawerBodyStyles_unstable: (state) =>
    useDrawerBodyStylesHook(state as DrawerBodyState),
  useDrawerHeaderStyles_unstable: (state) =>
    useDrawerHeaderStylesHook(state as DrawerHeaderState),
  useDrawerHeaderTitleStyles_unstable: (state) =>
    useDrawerHeaderTitleStylesHook(state as DrawerHeaderTitleState),
  useDrawerHeaderNavigationStyles_unstable: (state) =>
    useDrawerHeaderNavigationStylesHook(state as DrawerHeaderNavigationState),
  useDrawerFooterStyles_unstable: (state) =>
    useDrawerFooterStylesHook(state as DrawerFooterState),
  useInputStyles_unstable: (state) => useInputStylesHook(state as InputState),
};

type CAPThemeProviderProps = Omit<
  FluentProviderProps,
  'theme' | 'customStyleHooks_unstable'
> & {
  theme: Partial<Theme> & Partial<CAPTheme>;
};
export const CAPThemeProvider = ({
  children,
  theme: _theme,
  ...rest
}: CAPThemeProviderProps): React.ReactElement => {
  const theme: Record<string, string | number | null> = {};
  for (const [key, value] of Object.entries(_theme)) {
    theme[formatCAPTokenCssVar(key)] = value;
  }
  return (
    <FluentProvider
      theme={theme}
      customStyleHooks_unstable={customStyleHooks}
      {...rest}
    >
      {children}
    </FluentProvider>
  );
};

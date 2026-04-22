import { FluentProviderProps } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../index';
import type {
  ButtonState,
  MenuButtonState,
  SplitButtonState,
  ToggleButtonState,
} from '@fluentui-contrib/react-cap-theme/react-button';
import { useButtonStyles } from './components/react-button/components/Button/useButtonStyles.styles';
import { useMenuButtonStyles } from './components/react-button/components/MenuButton/useMenuButtonStyles.styles';
import { useSplitButtonStyles } from './components/react-button/components/SplitButton/useSplitButtonStyles.styles';
import { useToggleButtonStyles } from './components/react-button/components/ToggleButton/useToggleButtonStyles.styles';

/**
 * Style hooks for Teams, built on top of CAP_STYLE_HOOKS.
 *
 * All CAP styles are inherited. Only components where Teams diverges from CAP
 * have entries here — currently the button family, which restores V9-compatible
 * heights (Small=24px, Medium=32px, Large=40px) for zoom and reflow support.
 *
 * Usage:
 *   <FluentProvider theme={capTheme} customStyleHooks_unstable={TEAMS_STYLE_HOOKS}>
 */
export const TEAMS_STYLE_HOOKS: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = {
  ...CAP_STYLE_HOOKS,
  useButtonStyles_unstable: (state) => {
    return useButtonStyles(state as ButtonState);
  },
  useMenuButtonStyles_unstable: (state) => {
    return useMenuButtonStyles(state as MenuButtonState);
  },
  useSplitButtonStyles_unstable: (state) => {
    return useSplitButtonStyles(state as SplitButtonState);
  },
  useToggleButtonStyles_unstable: (state) => {
    return useToggleButtonStyles(state as ToggleButtonState);
  },
};

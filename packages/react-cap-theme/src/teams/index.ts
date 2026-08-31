import { FluentProviderProps } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '../capStyleHooks';
import type {
  ButtonState,
  MenuButtonState,
  SplitButtonState,
  ToggleButtonState,
} from '../components/react-button';
import { useTeamsButtonStyles } from './components/react-button/components/Button/useButtonStyles.styles';
import { useTeamsMenuButtonStyles } from './components/react-button/components/MenuButton/useMenuButtonStyles.styles';
import { useTeamsSplitButtonStyles } from './components/react-button/components/SplitButton/useSplitButtonStyles.styles';
import { useTeamsToggleButtonStyles } from './components/react-button/components/ToggleButton/useToggleButtonStyles.styles';

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
    return useTeamsButtonStyles(state as ButtonState);
  },
  useMenuButtonStyles_unstable: (state) => {
    return useTeamsMenuButtonStyles(state as MenuButtonState);
  },
  useSplitButtonStyles_unstable: (state) => {
    return useTeamsSplitButtonStyles(state as SplitButtonState);
  },
  useToggleButtonStyles_unstable: (state) => {
    return useTeamsToggleButtonStyles(state as ToggleButtonState);
  },
};

import {
  AvatarState,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useAvatarStyles = makeStyles({
  icon: {
    ...shorthands.borderWidth(CAP_TOKENS['cap/avatar/stroke-width']),
  },
});

export function useAvatarStylesHook(state: AvatarState): AvatarState {
  const styles = useAvatarStyles();

  if (state.icon) {
    state.icon.className = mergeClasses(state.icon.className, styles.icon);
  }

  return state;
}

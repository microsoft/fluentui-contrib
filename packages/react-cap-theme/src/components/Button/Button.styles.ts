import {
  makeStyles,
  mergeClasses,
  type ButtonState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useButtonStyles = makeStyles({
  root: {
    borderRadius: CAP_TOKENS['fixme/ctrl/button/corner-radius'],
  },
  primary: {
    backgroundColor: CAP_TOKENS['fixme/ctrl/button/primary-background-color'],

    ':hover': {
      backgroundColor:
        CAP_TOKENS['fixme/ctrl/button/primary-background-color-hover'],
    },
  },
  secondary: {
    backgroundColor: CAP_TOKENS['fixme/ctrl/button/secondary-background-color'],

    ':hover': {
      backgroundColor:
        CAP_TOKENS['fixme/ctrl/button/secondary-background-color-hover'],
    },
  },
  outline: {
    backgroundColor: CAP_TOKENS['fixme/ctrl/button/outline-background-color'],

    ':hover': {
      backgroundColor:
        CAP_TOKENS['fixme/ctrl/button/outline-background-color-hover'],
    },
  },
  subtle: {},
  tint: {
    backgroundColor: CAP_TOKENS['fixme/ctrl/button/tint-background-color'],

    ':hover': {
      backgroundColor:
        CAP_TOKENS['fixme/ctrl/button/tint-background-color-hover'],
    },
  },
  transparent: {},
});

export function useButtonStylesHook(state: ButtonState): ButtonState {
  const styles = useButtonStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    state.appearance && styles[state.appearance]
  );

  return state;
}

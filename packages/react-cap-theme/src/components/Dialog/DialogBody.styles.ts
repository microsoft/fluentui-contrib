import {
  makeStyles,
  mergeClasses,
  type DialogBodyState,
  useDialogBodyStyles_unstable,
} from '@fluentui/react-components';

import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDialogBodyStyles = makeStyles({
  root: {
    gap: CAP_TOKENS['cap/Dialog/Header/Gap'],
  },
});

export function useDialogBodyStylesHook(
  state: DialogBodyState
): DialogBodyState {
  // Apply base DialogBody styles first
  useDialogBodyStyles_unstable(state);

  // Then override with CAP styles
  const styles = useDialogBodyStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

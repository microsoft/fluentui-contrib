import {
  makeStyles,
  mergeClasses,
  type DialogSurfaceState,
  useDialogSurfaceStyles_unstable,
} from '@fluentui/react-components';

import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDialogSurfaceStyles = makeStyles({
  root: {
    borderRadius: CAP_TOKENS['cap/Dialog/Corner'],
    border: `${CAP_TOKENS['cap/Dialog/strokeWidth']} solid ${CAP_TOKENS['cap/Dialog/strokeColor']}`,
  },
});

export function useDialogSurfaceStylesHook(
  state: DialogSurfaceState
): DialogSurfaceState {
  // Apply base DialogSurface styles first
  useDialogSurfaceStyles_unstable(state);

  // Then override with CAP styles
  const styles = useDialogSurfaceStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

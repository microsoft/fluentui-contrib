import {
  makeStyles,
  mergeClasses,
  type OverlayDrawerState,
} from '@fluentui/react-components';

export const useOverlayDrawerStyles = makeStyles({
  root: {},
  backdrop: {},
});

export function useOverlayDrawerStylesHook(
  state: OverlayDrawerState
): OverlayDrawerState {
  const styles = useOverlayDrawerStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  const backdrop = state.root.backdrop;
  if (backdrop) {
    backdrop.className = mergeClasses(backdrop.className, styles.backdrop);
  }

  return state;
}

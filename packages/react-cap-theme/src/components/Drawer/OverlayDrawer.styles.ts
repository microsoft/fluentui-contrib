import {
  makeStyles,
  mergeClasses,
  type OverlayDrawerState,
} from '@fluentui/react-components';

export const useOverlayDrawerStyles = makeStyles({
  root: {},
});

export function useOverlayDrawerStylesHook(
  state: OverlayDrawerState
): OverlayDrawerState {
  const styles = useOverlayDrawerStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

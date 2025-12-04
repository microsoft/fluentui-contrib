import {
  makeStyles,
  mergeClasses,
  type InlineDrawerState,
} from '@fluentui/react-components';

export const useInlineDrawerStyles = makeStyles({
  root: {},
});

export function useInlineDrawerStylesHook(
  state: InlineDrawerState
): InlineDrawerState {
  const styles = useInlineDrawerStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

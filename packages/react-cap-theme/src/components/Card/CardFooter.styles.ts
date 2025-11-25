import {
  makeStyles,
  mergeClasses,
  type CardFooterState,
} from '@fluentui/react-components';

export const useCardFooterStyles = makeStyles({
  root: {},
});

export function useCardFooterStylesHook(
  state: CardFooterState
): CardFooterState {
  const styles = useCardFooterStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

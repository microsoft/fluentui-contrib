import {
  makeStyles,
  mergeClasses,
  type CardHeaderState,
} from '@fluentui/react-components';

export const useCardHeaderStyles = makeStyles({
  root: {},
});

export function useCardHeaderStylesHook(
  state: CardHeaderState
): CardHeaderState {
  const styles = useCardHeaderStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

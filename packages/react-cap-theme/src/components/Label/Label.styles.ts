import {
  makeStyles,
  mergeClasses,
  type LabelState,
} from '@fluentui/react-components';

export const useLabelStyles = makeStyles({
  root: {},
});

export function useLabelStylesHook(state: LabelState): LabelState {
  const styles = useLabelStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

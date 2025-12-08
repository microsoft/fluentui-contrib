import {
  makeStyles,
  mergeClasses,
  type FieldState,
} from '@fluentui/react-components';

export const useFieldStyles = makeStyles({
  root: {},
});

export function useFieldStylesHook(state: FieldState): FieldState {
  const styles = useFieldStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

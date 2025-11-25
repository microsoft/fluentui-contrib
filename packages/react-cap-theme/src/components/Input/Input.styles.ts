import {
  makeStyles,
  mergeClasses,
  type InputState,
} from '@fluentui/react-components';

export const useInputStyles = makeStyles({
  root: {},
});

export function useInputStylesHook(state: InputState): InputState {
  const styles = useInputStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

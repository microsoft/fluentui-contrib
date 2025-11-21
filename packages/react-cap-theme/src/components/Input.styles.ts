import {
  makeStyles,
  mergeClasses,
  type InputState,
} from '@fluentui/react-components';

const useCAPInputStyles = makeStyles({
  root: {},
});

export function useCAPInputStylesHook(_state: unknown): InputState {
  const state = _state as InputState;
  const styles = useCAPInputStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

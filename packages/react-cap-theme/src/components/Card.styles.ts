import {
  makeStyles,
  mergeClasses,
  type CardFooterState,
  type CardHeaderState,
  type CardState,
} from '@fluentui/react-components';
import { CAPTokens } from '../Theme';

const useCAPCardStyles = makeStyles({
  root: {
    borderRadius: CAPTokens.cardCornerRadius,
  },
});

export function useCAPCardStylesHook(_state: unknown): CardState {
  const state = _state as CardState;
  const styles = useCAPCardStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

const useCAPCardHeaderStyles = makeStyles({
  root: {},
});

export function useCAPCardHeaderStylesHook(_state: unknown): CardHeaderState {
  const state = _state as CardHeaderState;
  const styles = useCAPCardHeaderStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

const useCAPCardFooterStyles = makeStyles({
  root: {},
});

export function useCAPCardFooterStylesHook(_state: unknown): CardFooterState {
  const state = _state as CardFooterState;
  const styles = useCAPCardFooterStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

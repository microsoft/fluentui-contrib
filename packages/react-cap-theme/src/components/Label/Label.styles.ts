import {
  makeStyles,
  mergeClasses,
  tokens,
  type LabelState,
} from '@fluentui/react-components';

export const useLabelStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
  startSlot: {
    marginRight: tokens.spacingHorizontalXXS,
  },
  required: {
    paddingLeft: 0,
  },
});

export function useLabelStylesHook(state: LabelState): LabelState {
  const styles = useLabelStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);
  if (state.required) {
    state.required.className = mergeClasses(
      state.required.className,
      styles.required
    );
  }

  return state;
}

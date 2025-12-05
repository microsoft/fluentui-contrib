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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
  },
});

export function useLabelStylesHook(state: LabelState): LabelState {
  const styles = useLabelStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}

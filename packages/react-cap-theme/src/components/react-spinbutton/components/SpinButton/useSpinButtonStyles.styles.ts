import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import type { SpinButtonState } from './SpinButton.types';

const useStyles = makeStyles({
  root: {
    minHeight: '36px',
  },
  small: {
    minHeight: '28px',
  },
  medium: {},
  // Pill radius on `outline`; border is painted on `root::before`, so radius is
  // applied to both. The Fluent focus underline (`root::after`) is removed because
  // it conflicts with the pill shape — outline focus is conveyed by the accessible
  // border color in `outlineInteractive`. Other appearances keep the base underline.
  outline: {
    borderRadius: capTokens.borderRadius2XLarge,
    '::before': {
      borderRadius: capTokens.borderRadius2XLarge,
    },
    '::after': { content: 'unset' },
  },
  outlineSmall: {
    borderRadius: tokens.borderRadiusXLarge,
    '::before': {
      borderRadius: tokens.borderRadiusXLarge,
    },
  },
  outlineInteractive: {
    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    },
    ':hover::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
      },
    },
  },
});

/**
 * Apply CAP styling to the SpinButton slots based on the state.
 * @alpha
 */
export const useSpinButtonStyles = (
  state: SpinButtonState
): SpinButtonState => {
  const styles = useStyles();
  const { appearance, size } = state;
  const disabled = state.input.disabled;
  const isOutline = appearance === 'outline';

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[size],
    isOutline && styles.outline,
    isOutline && size === 'small' && styles.outlineSmall,
    isOutline && !disabled && styles.outlineInteractive,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};

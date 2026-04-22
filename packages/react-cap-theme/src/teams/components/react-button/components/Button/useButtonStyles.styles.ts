import {
  useButtonStyles as useCapButtonStyles,
  type ButtonState,
} from '../../../../../components/react-button';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// Teams vertical padding values — smaller than CAP to restore V9-compatible heights.
// Small: 24px, Medium: 32px, Large: 40px (CAP gives 44px with 9px, so override to 7px).
export const teamsButtonSpacingVerticalSmall = '3px';
export const teamsButtonSpacingVerticalMedium = '5px';
export const teamsButtonSpacingVerticalLarge = '7px';

export const useRootSizeStyles = makeStyles({
  small: {
    paddingTop: teamsButtonSpacingVerticalSmall,
    paddingBottom: teamsButtonSpacingVerticalSmall,
  },
  medium: {
    paddingTop: teamsButtonSpacingVerticalMedium,
    paddingBottom: teamsButtonSpacingVerticalMedium,
  },
  large: {
    paddingTop: teamsButtonSpacingVerticalLarge,
    paddingBottom: teamsButtonSpacingVerticalLarge,
  },
});

// Icon-only: override padding (all sides) + width constraints.
export const useRootIconOnlySizeStyles = makeStyles({
  small: {
    minWidth: '24px',
    maxWidth: '24px',
    padding: teamsButtonSpacingVerticalSmall,
  },
  medium: {
    minWidth: '32px',
    maxWidth: '32px',
    padding: teamsButtonSpacingVerticalMedium,
  },
  large: {
    minWidth: '40px',
    maxWidth: '40px',
    padding: teamsButtonSpacingVerticalLarge,
  },
});

export const useTeamsButtonStyles = (state: ButtonState): ButtonState => {
  const rootSizeStyles = useRootSizeStyles();
  const rootIconOnlySizeStyles = useRootIconOnlySizeStyles();

  useCapButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    state.iconOnly
      ? rootIconOnlySizeStyles[state.size]
      : rootSizeStyles[state.size],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};

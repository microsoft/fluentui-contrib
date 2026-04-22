import {
  useButtonStyles as capUseButtonStyles,
  type ButtonState,
} from '@fluentui-contrib/react-cap-theme/react-button';
import { makeStyles, mergeClasses } from '@griffel/react';

// Teams vertical padding values — smaller than CAP to restore V9-compatible heights.
// Small: 24px, Medium: 32px. Large is unchanged from CAP so is not redefined here.
export const teamsButtonSpacingVerticalSmall = '3px';
export const teamsButtonSpacingVerticalMedium = '5px';

// Only small and medium need padding overrides; large is the same as CAP.
export const useRootSizeStyles = makeStyles({
  small: {
    paddingTop: teamsButtonSpacingVerticalSmall,
    paddingBottom: teamsButtonSpacingVerticalSmall,
  },
  medium: {
    paddingTop: teamsButtonSpacingVerticalMedium,
    paddingBottom: teamsButtonSpacingVerticalMedium,
  },
});

// Icon-only: override padding (all sides) + width constraints.
// Large only needs width adjusted; padding is the same as CAP (9px).
// Note: a 20px small icon-only variant may be needed once all icons are
// available at that size. For now 24px matches the text button height.
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
  },
});

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const rootSizeStyles = useRootSizeStyles();
  const rootIconOnlySizeStyles = useRootIconOnlySizeStyles();

  capUseButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    state.iconOnly
      ? rootIconOnlySizeStyles[state.size]
      : rootSizeStyles[state.size as keyof typeof rootSizeStyles]
  );

  return state;
};

import {
  useSplitButtonStyles as capUseSplitButtonStyles,
  type SplitButtonState,
} from '@fluentui-contrib/react-cap-theme/react-button';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  teamsButtonSpacingVerticalMedium,
  teamsButtonSpacingVerticalSmall,
} from '../Button/useButtonStyles.styles';

// Repositions the SplitButton divider line to match Teams button heights.
// Large is unchanged from CAP so has no entry here.
const useDividerPositionStyles = makeStyles({
  small: {
    ':after': {
      top: teamsButtonSpacingVerticalSmall,
      bottom: teamsButtonSpacingVerticalSmall,
    },
  },
  medium: {
    ':after': {
      top: teamsButtonSpacingVerticalMedium,
      bottom: teamsButtonSpacingVerticalMedium,
    },
  },
});

export const useSplitButtonStyles = (
  state: SplitButtonState
): SplitButtonState => {
  const dividerPositionStyles = useDividerPositionStyles();

  capUseSplitButtonStyles(state);

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      state.primaryActionButton.className,
      dividerPositionStyles[state.size as keyof typeof dividerPositionStyles],
      getSlotClassNameProp_unstable(state.primaryActionButton)
    );
  }

  return state;
};

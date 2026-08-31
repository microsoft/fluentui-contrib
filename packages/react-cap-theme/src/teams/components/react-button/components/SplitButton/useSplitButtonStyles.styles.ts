import {
  useSplitButtonStyles as useCapSplitButtonStyles,
  type SplitButtonState,
} from '../../../../../components/react-button';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  teamsButtonSpacingVerticalLarge,
  teamsButtonSpacingVerticalMedium,
  teamsButtonSpacingVerticalSmall,
} from '../Button/useButtonStyles.styles';

// Repositions the SplitButton divider line to match Teams button heights.
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
  large: {
    ':after': {
      top: teamsButtonSpacingVerticalLarge,
      bottom: teamsButtonSpacingVerticalLarge,
    },
  },
});

export const useTeamsSplitButtonStyles = (
  state: SplitButtonState
): SplitButtonState => {
  const dividerPositionStyles = useDividerPositionStyles();

  useCapSplitButtonStyles(state);

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      state.primaryActionButton.className,
      dividerPositionStyles[state.size],
      getSlotClassNameProp_unstable(state.primaryActionButton)
    );
  }

  return state;
};

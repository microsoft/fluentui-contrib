import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { ButtonState } from '../../../../components/react-button/Button';
import { tokens } from '@fluentui/tokens';

export const buttonSpacingVerticalSmall = '5px';
export const buttonSpacingVerticalMedium = '7px';
export const buttonSpacingVerticalLarge = '9px';

const useRootStyles = makeStyles({
  small: {
    padding: `${buttonSpacingVerticalSmall} ${tokens.spacingHorizontalMNudge}`,
  },
  medium: {
    padding: `${buttonSpacingVerticalMedium} ${tokens.spacingHorizontalM}`,
  },
  large: {
    padding: `${buttonSpacingVerticalLarge} ${tokens.spacingHorizontalL}`,
  },
});

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { size } = state;
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    state.root.className,
    rootStyles[size],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionGroupState } from '@fluentui/react-combobox';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    rowGap: 0,

    '&:not(:last-child)::after': {
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
      paddingBottom: 0,
      margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
    },
  },

  label: {
    borderRadius: tokens.borderRadiusLarge,
    color: tokens.colorNeutralForeground2,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalS}`,
    ...typographyStyles.caption1Strong,
  },
});

/**
 * Apply styling to the OptionGroup slots based on the state
 * @param state - The current OptionGroup state
 * @returns The updated OptionGroup state with applied styles
 * @alpha
 */
export const useOptionGroupStyles = (
  state: OptionGroupState
): OptionGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.label) {
    state.label.className = mergeClasses(
      state.label.className,
      styles.label,
      getSlotClassNameProp_unstable(state.label)
    );
  }

  return state;
};

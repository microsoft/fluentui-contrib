import { ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from '@fluentui/react-aria';
import { optionClassNames, type OptionState } from '@fluentui/react-combobox';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusLarge,
    color: tokens.colorNeutralForeground3,
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
    ...typographyStyles.body1,

    ':hover': {
      [`& .${iconFilledClassName}`]: { display: 'block' },
      [`& .${iconRegularClassName}`]: { display: 'none' },
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(
        tokens.colorTransparentStroke
      ),
    },
    ':active': {
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(
        tokens.colorTransparentStroke
      ),
    },
  },

  active: {
    [`[${ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE}]::after`]: {
      borderRadius: 'inherit',
      boxShadow: `0 0 0 1px ${tokens.colorStrokeFocus1} inset`,
    },
  },

  disabled: { color: tokens.colorNeutralForegroundDisabled },
  disabledNotSelected: {
    ':hover': {
      [`& .${iconFilledClassName}`]: { display: 'none' },
      [`& .${iconRegularClassName}`]: { display: 'block' },
    },
  },
});

const useCheckIconStyles = makeStyles({
  base: {
    color: 'inherit',
    margin: 0,

    // override Fluent '& svg' style
    [`& .${iconFilledClassName}`]: { display: 'none' },
    [`& .${iconRegularClassName}`]: { display: 'block' },
  },
  radio: {
    visibility: 'hidden',
    '@media (forced-colors: active)': { visibility: 'visible' },
  },
  checkmark: {
    backgroundColor: 'none',
    ...shorthands.borderColor(tokens.colorTransparentStroke), // Keep border for high contrast
    visibility: 'hidden',
    '@media (forced-colors: active)': { visibility: 'visible' },
  },
  disabled: { color: 'inherit' },
  selected: {
    [`& .${iconFilledClassName}`]: { display: 'block' },
    [`& .${iconRegularClassName}`]: { display: 'none' },
  },
  selectedRadio: {
    color: tokens.colorCompoundBrandForeground1Pressed,
    visibility: 'visible',
  },
  selectedCheckmark: { visibility: 'visible' },
});

/**
 * Apply styling to the Option slots based on the state
 * @param state - The current Option state
 * @returns The updated Option state with applied styles
 * @alpha
 */
export const useOptionStyles = (state: OptionState): OptionState => {
  const styles = useStyles();
  const checkIconStyles = useCheckIconStyles();

  const { disabled, multiselect, selected } = state;

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles.active,
    disabled && styles.disabled,
    disabled && !selected && styles.disabledNotSelected,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.checkIcon) {
    state.checkIcon.className = mergeClasses(
      state.checkIcon.className,
      checkIconStyles.base,
      multiselect ? checkIconStyles.checkmark : checkIconStyles.radio,
      selected &&
        mergeClasses(
          checkIconStyles.selected,
          multiselect
            ? checkIconStyles.selectedCheckmark
            : checkIconStyles.selectedRadio
        ),
      disabled && checkIconStyles.disabled,
      getSlotClassNameProp_unstable(state.checkIcon)
    );
  }

  return state;
};

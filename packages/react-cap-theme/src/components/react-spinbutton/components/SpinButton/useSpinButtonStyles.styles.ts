import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';

import {
  bundleIcon,
  ChevronDownFilled,
  ChevronDownRegular,
  ChevronUpFilled,
  ChevronUpRegular,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { SpinButtonState } from './SpinButton.types';

const stepperBoldSwap = {
  [`& .${iconRegularClassName}`]: { display: 'none' },
  [`& .${iconFilledClassName}`]: { display: 'inline' },
} as const;

const ChevronUp = bundleIcon(ChevronUpFilled, ChevronUpRegular);
const ChevronDown = bundleIcon(ChevronDownFilled, ChevronDownRegular);

const removeFluentUIStyleAdditions = {
  '::before': {
    display: 'none',
  },
  '::after': {
    display: 'none',
  },
};

const stepperButton = {
  borderRadius: tokens.borderRadiusNone,
  ':hover': {
    ...stepperBoldSwap,
  },
  ':active': {
    ...stepperBoldSwap,
  },
  ['&.fui-SpinButton__button_active']: {
    ...stepperBoldSwap,
  },
};

const useRootStyles = makeStyles({
  root: {
    minHeight: '16px',
    overflow: 'hidden',
  },
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  stepperButton: {
    width: '34px',
    height: '16px',
    fontSize: '13px',
    ...stepperButton,
  },
  incrementButton: {
    top: '-8px', // no other way
    right: 0, // rtl/ltr issue
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalMNudge} ${tokens.spacingVerticalNone}`,
  },
  decrementButton: {
    bottom: 0,
    right: 0, // rtl/ltr
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalMNudge} ${tokens.spacingVerticalXS}`,
  },
  stepperButtonSmall: {
    width: '26px',
    height: tokens.lineHeightBase100,
    fontSize: '13px',
    ...stepperButton,
  },
  incrementButtonSmall: {
    top: '-6px', // no other way
    right: 0, // rtl/ltr issue
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalSNudge} ${tokens.spacingVerticalNone}`,
  },
  decrementButtonSmall: {
    bottom: 0,
    right: 0, // rtl/ltr
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge} ${tokens.spacingVerticalXXS}`,
  },

  stepperButtonLarge: {
    width: '42px',
    height: '22px',
    fontSize: tokens.fontSizeBase400,
    ...stepperButton,
  },
  incrementButtonLarge: {
    top: '-10px', // no other way
    right: 0, // rtl/ltr issue
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM} ${tokens.spacingVerticalNone}`,
  },
  decrementButtonLarge: {
    bottom: 0,
    right: 0, // rtl/ltr
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM} ${tokens.spacingVerticalXS}`,
  },
});

const useRootSizeStyles = makeStyles({
  small: {
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusXLarge,
    ...removeFluentUIStyleAdditions,
  },
  medium: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalMNudge}`,
    borderRadius: capTokens.borderRadius2XLarge,
    ...removeFluentUIStyleAdditions,
  },
  large: {
    minHeight: '22px',
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalM}`,
    borderRadius: capTokens.borderRadius2XLarge,
    ...removeFluentUIStyleAdditions,
  },
});

const useRootAppearanceStyles = makeStyles({
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    },
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
    ':focus-within:not(:active)': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    },
    ':active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
    },
  },
  underline: {
    borderRadius: tokens.borderRadiusNone,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  'filled-darker': {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  'filled-lighter': {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
});

/**
 * Apply CAP styling to the SpinButton slots based on the state.
 * @alpha
 */
export const useSpinButtonStyles = (
  state: SpinButtonState
): SpinButtonState => {
  const rootStyles = useRootStyles();
  const rootSizeStyles = useRootSizeStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();

  const { size, appearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootStyles.root,
    rootSizeStyles[size],
    rootAppearanceStyles[appearance],
    state.input.disabled && rootStyles.disabled
  );

  if (state.incrementButton) {
    state.incrementButton.children = React.createElement(ChevronUp);
    state.incrementButton.className = mergeClasses(
      state.incrementButton.className,
      size === 'small'
        ? rootStyles.stepperButtonSmall
        : size === 'large'
        ? rootStyles.stepperButtonLarge
        : rootStyles.stepperButton,
      size === 'small'
        ? rootStyles.incrementButtonSmall
        : size === 'large'
        ? rootStyles.incrementButtonLarge
        : rootStyles.incrementButton,
      getSlotClassNameProp_unstable(state.incrementButton)
    );
  }

  if (state.decrementButton) {
    state.decrementButton.children = React.createElement(ChevronDown);
    state.decrementButton.className = mergeClasses(
      state.decrementButton.className,
      size === 'small'
        ? rootStyles.stepperButtonSmall
        : size === 'large'
        ? rootStyles.stepperButtonLarge
        : rootStyles.stepperButton,
      size === 'small'
        ? rootStyles.decrementButtonSmall
        : size === 'large'
        ? rootStyles.decrementButtonLarge
        : rootStyles.decrementButton,
      getSlotClassNameProp_unstable(state.decrementButton)
    );
  }

  return state;
};

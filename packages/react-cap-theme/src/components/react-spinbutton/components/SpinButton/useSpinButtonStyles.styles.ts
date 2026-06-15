import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  bundleIcon,
  ChevronUpFilled,
  ChevronUpRegular,
  ChevronDownFilled,
  ChevronDownRegular,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import type { SpinButtonState } from './SpinButton.types';

const ChevronUp = bundleIcon(ChevronUpFilled, ChevronUpRegular);
const ChevronDown = bundleIcon(ChevronDownFilled, ChevronDownRegular);

const stepperBoldSwap = {
  [`& .${iconRegularClassName}`]: { display: 'none' },
  [`& .${iconFilledClassName}`]: { display: 'inline' },
} as const;

const useStyles = makeStyles({
  root: {
    minHeight: '36px',
  },
  small: {
    minHeight: '28px',
  },
  medium: {},
  large: {
    minHeight: '42px',
    '& .fui-SpinButton__input': {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  rounded: {
    borderRadius: capTokens.borderRadius2XLarge,
    '::before': {
      borderRadius: capTokens.borderRadius2XLarge,
    },
  },
  roundedSmall: {
    borderRadius: tokens.borderRadiusXLarge,
    '::before': {
      borderRadius: tokens.borderRadiusXLarge,
    },
  },
  outline: {
    '::after': { content: 'unset' },
  },
  outlineSteppers: {
    gridTemplateColumns: '1fr 34px',
  },
  outlineSteppersSmall: {
    gridTemplateColumns: '1fr 26px',
  },
  outlineSteppersLarge: {
    gridTemplateColumns: '1fr 42px',
  },
  outlinePlaceholder: {
    '& .fui-SpinButton__input::placeholder': {
      color: capTokens.colorNeutralForeground5,
      opacity: 1,
      fontWeight: 300,
    },
    ':hover .fui-SpinButton__input::placeholder': {
      color: capTokens.colorNeutralForeground5Hover,
    },
    ':active .fui-SpinButton__input::placeholder': {
      color: capTokens.colorNeutralForeground5Pressed,
    },
    ':focus-within .fui-SpinButton__input::placeholder': {
      color: capTokens.colorNeutralForeground5Pressed,
    },
    '& .fui-SpinButton__input:disabled::placeholder': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  outlineInteractive: {
    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    },
    ':hover::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
    ':focus-within:not(:active)::before': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    },
    ':active::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
    },
  },
  outlineInvalid: {
    ':focus-within::before': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    },
  },
  stepperButton: {
    width: '34px',
    fontSize: '12px',
    top: '1px',
    color: capTokens.colorNeutralForeground5,
    ':enabled': {
      ':hover': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Hover,
        ...stepperBoldSwap,
      },
      ':active': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
      ['&.fui-SpinButton__button_active']: {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
    },
  },
  incrementButton: {
    paddingInline: '11px',
    paddingTop: '5px',
    paddingBottom: '1px',
  },
  decrementButton: {
    paddingInline: '11px',
    paddingTop: '1px',
    paddingBottom: '5px',
  },
  incrementRounded: {
    borderTopRightRadius: capTokens.borderRadius2XLarge,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
  },
  decrementRounded: {
    borderBottomRightRadius: capTokens.borderRadius2XLarge,
    borderTopLeftRadius: tokens.borderRadiusMedium,
  },
  stepperButtonSmall: {
    width: '26px',
    fontSize: '12px',
    top: '1px',
    color: capTokens.colorNeutralForeground5,
    ':enabled': {
      ':hover': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Hover,
        ...stepperBoldSwap,
      },
      ':active': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
      ['&.fui-SpinButton__button_active']: {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
    },
  },
  incrementButtonSmall: {
    paddingInline: '7px',
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: 0,
  },
  decrementButtonSmall: {
    paddingInline: '7px',
    paddingTop: 0,
    paddingBottom: tokens.spacingVerticalXXS,
  },
  incrementRoundedSmall: {
    borderTopRightRadius: tokens.borderRadiusXLarge,
  },
  decrementRoundedSmall: {
    borderBottomRightRadius: tokens.borderRadiusXLarge,
  },
  stepperButtonLarge: {
    width: '42px',
    fontSize: '16px',
    top: '2px',
    color: capTokens.colorNeutralForeground5,
    ':enabled': {
      ':hover': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Hover,
        ...stepperBoldSwap,
      },
      ':active': {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
      ['&.fui-SpinButton__button_active']: {
        backgroundColor: 'transparent',
        color: capTokens.colorNeutralForeground5Pressed,
        ...stepperBoldSwap,
      },
    },
  },
  incrementButtonLarge: {
    paddingInline: '13px',
    paddingTop: '5px',
    paddingBottom: '1px',
  },
  decrementButtonLarge: {
    paddingInline: '13px',
    paddingTop: '1px',
    paddingBottom: '5px',
  },
  incrementRoundedLarge: {
    borderTopRightRadius: capTokens.borderRadius2XLarge,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
  },
  decrementRoundedLarge: {
    borderBottomRightRadius: capTokens.borderRadius2XLarge,
    borderTopLeftRadius: tokens.borderRadiusMedium,
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
  const { appearance } = state;
  const size = state.size as 'small' | 'medium' | 'large';
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const isOutline = appearance === 'outline';
  const isFilledDarker = appearance === 'filled-darker';
  const isFilledLighter = appearance === 'filled-lighter';
  const isOutlineLike = isOutline || isFilledDarker;
  const isRounded = isOutline || isFilledDarker || isFilledLighter;
  const isSmall = size === 'small';
  const bySize = <T,>(s: T, m: T, l: T): T =>
    size === 'small' ? s : size === 'large' ? l : m;

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    bySize(styles.small, styles.medium, styles.large),
    isRounded && (isSmall ? styles.roundedSmall : styles.rounded),
    isOutline && styles.outline,
    styles.outlinePlaceholder,
    bySize(
      styles.outlineSteppersSmall,
      styles.outlineSteppers,
      styles.outlineSteppersLarge
    ),
    isOutline && !disabled && !invalid && styles.outlineInteractive,
    isOutline && !disabled && invalid && styles.outlineInvalid,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.incrementButton) {
    state.incrementButton.children = React.createElement(ChevronUp);
    state.incrementButton.className = mergeClasses(
      state.incrementButton.className,
      bySize(
        styles.stepperButtonSmall,
        styles.stepperButton,
        styles.stepperButtonLarge
      ),
      bySize(
        styles.incrementButtonSmall,
        styles.incrementButton,
        styles.incrementButtonLarge
      ),
      isRounded &&
        bySize(
          styles.incrementRoundedSmall,
          styles.incrementRounded,
          styles.incrementRoundedLarge
        ),
      getSlotClassNameProp_unstable(state.incrementButton)
    );
  }

  if (state.decrementButton) {
    state.decrementButton.children = React.createElement(ChevronDown);
    state.decrementButton.className = mergeClasses(
      state.decrementButton.className,
      bySize(
        styles.stepperButtonSmall,
        styles.stepperButton,
        styles.stepperButtonLarge
      ),
      bySize(
        styles.decrementButtonSmall,
        styles.decrementButton,
        styles.decrementButtonLarge
      ),
      isRounded &&
        bySize(
          styles.decrementRoundedSmall,
          styles.decrementRounded,
          styles.decrementRoundedLarge
        ),
      getSlotClassNameProp_unstable(state.decrementButton)
    );
  }

  return state;
};

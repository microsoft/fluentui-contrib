import {
  checkboxClassNames,
  useCheckboxStyles_unstable,
} from '@fluentui/react-checkbox';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { CheckboxState } from './Checkbox.types';

const mediumHitTargetWidth = '28px';
const largeHitTargetWidth = '32px';

const useBaseOverrides = makeStyles({
  indicator: {
    border: 'none',
    backgroundColor: 'transparent',

    '::before': {
      display: 'none',
    },

    '::after': {
      display: 'none',
    },
  },
  inputMedium: {
    width: mediumHitTargetWidth,
    left: tokens.spacingHorizontalXS,
  },
  inputLarge: {
    width: largeHitTargetWidth,
    left: tokens.spacingHorizontalXS,
  },
});

const useFocusStyles = makeStyles({
  root: {
    ...createFocusOutlineStyle({
      style: {
        outlineRadius: tokens.borderRadius2XLarge,
        outlineOffset: '-2px',
      },
      selector: 'focus-within',
    }),
  },
});

const useSizeStyles = makeStyles({
  medium: {
    fontSize: tokens.fontSizeBase500,
    height: tokens.fontSizeBase500,
    width: tokens.fontSizeBase500,
  },
  large: {
    fontSize: tokens.fontSizeBase600,
    height: tokens.fontSizeBase600,
    width: tokens.fontSizeBase600,
  },
});

const useIndicatorStyles = makeStyles({
  unchecked: { color: tokens.colorNeutralForeground3 },
  brandChecked: { color: tokens.colorCompoundBrandForeground1 },
  neutralChecked: { color: tokens.colorNeutralForeground3Pressed },
  disabled: { color: tokens.colorNeutralForegroundDisabled },
});

const useRootInteractionStyles = makeStyles({
  unchecked: {
    [`:hover .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`:hover .${iconRegularClassName}`]: {
      display: 'none',
    },
    [`:hover:active .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`:hover:active .${iconRegularClassName}`]: {
      display: 'none',
    },
    [`:hover .${checkboxClassNames.indicator}`]: {
      color: tokens.colorNeutralForeground1Hover,
    },
    [`:active .${checkboxClassNames.indicator}`]: {
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  brandChecked: {
    [`:hover .${checkboxClassNames.indicator}`]: {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    [`:active .${checkboxClassNames.indicator}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  neutralChecked: {
    [`:hover .${checkboxClassNames.indicator}`]: {
      color: tokens.colorNeutralForeground1Hover,
    },
    [`:active .${checkboxClassNames.indicator}`]: {
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
});

export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const baseOverrides = useBaseOverrides();
  const focusStyles = useFocusStyles();
  const indicatorStyles = useIndicatorStyles();
  const rootInteractionStyles = useRootInteractionStyles();
  const sizeStyles = useSizeStyles();

  const { color, checked, disabled, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
    focusStyles.root,
    !disabled && !checked && rootInteractionStyles.unchecked,
    !disabled && checked && rootInteractionStyles[`${color}Checked`],
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.indicator) {
    state.indicator.className = mergeClasses(
      state.indicator.className,
      baseOverrides.indicator,
      sizeStyles[size],
      !disabled && !checked && indicatorStyles.unchecked,
      !disabled && checked && indicatorStyles[`${color}Checked`],
      disabled && indicatorStyles.disabled,
      getSlotClassNameProp_unstable(state.indicator)
    );
  }

  if (state.input) {
    state.input.className = mergeClasses(
      state.input.className,
      size === 'large' ? baseOverrides.inputLarge : baseOverrides.inputMedium,
      getSlotClassNameProp_unstable(state.input)
    );
  }

  const { color: _, ...baseState } = state;
  void _;
  useCheckboxStyles_unstable(baseState);

  return state;
};

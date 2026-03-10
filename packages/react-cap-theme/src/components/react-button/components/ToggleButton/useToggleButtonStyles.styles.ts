import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, shorthands, mergeClasses } from '@griffel/react';
import { useButtonStyles, type ButtonSlots } from '../../Button';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

const iconFilledClassName = 'fui-Icon-filled';
const iconRegularClassName = 'fui-Icon-regular';

const displayInline = { display: 'inline' };
const displayNone = { display: 'none' };

const useRootCheckedStyles = makeStyles({
  base: {
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
  },
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    color: tokens.colorNeutralForeground3Selected,
  },

  primary: {
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  tint: {
    backgroundColor: tokens.colorBrandBackground2Pressed,
    color: tokens.colorCompoundBrandForeground1Pressed,
    ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
  outlineColor: {
    backgroundColor: tokens.colorBrandBackground2Pressed,
    color: tokens.colorCompoundBrandForeground1Pressed,
    ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
  secondary: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderColor(tokens.colorNeutralBackground3Hover),
    color: tokens.colorNeutralForeground1,
    [`& .${toggleButtonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground3Selected,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  transparent: {
    color: tokens.colorCompoundBrandForeground1Pressed,
  },
});

const useRootCheckedDisabledStyles = makeStyles({
  base: {
    ':hover': {
      [`& .${iconFilledClassName}`]: displayInline,
      [`& .${iconRegularClassName}`]: displayNone,
    },
    ':hover:active': {
      [`& .${iconFilledClassName}`]: displayInline,
      [`& .${iconRegularClassName}`]: displayNone,
    },
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
    [`:hover:active .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  secondary: {},
  primary: {},
  outline: {},
  transparent: {},
  subtle: {},
  tint: {
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
  outlineColor: {
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
});

const useIconCheckedStyles = makeStyles({
  outline: {
    color: tokens.colorCompoundBrandForeground1Pressed,
  },
});

export const useToggleButtonStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  'use no memo';

  const rootCheckedStyles = useRootCheckedStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const checkedDisabledStyles = useRootCheckedDisabledStyles();
  const { appearance, checked, disabled, disabledFocusable } = state;
  const showAsDisabled = disabled || disabledFocusable;

  useButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    toggleButtonClassNames.root,
    checked && !showAsDisabled && rootCheckedStyles.base,
    checked && !showAsDisabled && rootCheckedStyles[appearance],
    checked && showAsDisabled && checkedDisabledStyles.base,
    checked && showAsDisabled && checkedDisabledStyles[appearance]
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      toggleButtonClassNames.icon,
      checked && appearance === 'outline' && iconCheckedStyles.outline
    );
  }

  return state;
};

import { toggleButtonClassNames } from '@fluentui/react-button';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '../../../tokens';
import {
  type GriffelStyle,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { buttonClassNames, useButtonStyles } from '../../Button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { ToggleButtonState } from './ToggleButton.types';

const highContrastPrimaryStyles: GriffelStyle = {
  ...createCustomFocusIndicatorStyle({
    '@media (forced-colors: active)': {
      outlineColor: 'Highlight',
      ':focus': shorthands.borderColor('Highlight'),
    },
  }),
  '@media (forced-colors: active)': {
    backgroundColor: 'ButtonFace',
    ...shorthands.borderColor('ButtonBorder'),
    color: 'ButtonText',
    ':focus': shorthands.borderColor('ButtonBorder'),
  },
};

const useStyles = makeStyles({
  outline: {
    // same as Button
  },
  primary: highContrastPrimaryStyles,
  secondary: {
    // same as Button
  },
  subtle: {
    // same as Button
  },
  transparent: {
    // same as Button
  },
  tint: highContrastPrimaryStyles,
});

const useRootCheckedStyles = makeStyles({
  base: {
    [`& .${iconFilledClassName}`]: { display: 'inline' },
    [`& .${iconRegularClassName}`]: { display: 'none' },

    ...createCustomFocusIndicatorStyle({
      '@media (forced-colors: active)': {
        ':focus': shorthands.borderColor('ButtonFace'),
      },
    }),

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',
      ':focus': shorthands.borderColor('Highlight'),
    },
  },
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4Selected),
    color: tokens.colorNeutralForeground1,
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  primary: { backgroundColor: tokens.colorBrandBackgroundSelected },
  tint: {
    backgroundColor: tokens.colorBrandBackground2Pressed,
    ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    color: tokens.colorCompoundBrandForeground1Pressed,
    ':hover': shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
    ':hover:active': shorthands.borderColor(
      tokens.colorCompoundBrandStrokePressed
    ),
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4Selected),
    color: tokens.colorNeutralForeground1,
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  subtle: {
    color: tokens.colorNeutralForeground1,
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  transparent: {
    color: tokens.colorNeutralForeground1,
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
});

const useRootCheckedDisabledStyles = makeStyles({
  base: {
    [`& .${iconFilledClassName}`]: { display: 'inline' },
    [`& .${iconRegularClassName}`]: { display: 'none' },
    ':hover': {
      [`& .${iconFilledClassName}`]: { display: 'inline' },
      [`& .${iconRegularClassName}`]: { display: 'none' },
    },
    ':hover:active': {
      [`& .${iconFilledClassName}`]: { display: 'inline' },
      [`& .${iconRegularClassName}`]: { display: 'none' },
    },
  },
});

const useIconCheckedStyles = makeStyles({
  base: {
    '@media (forced-colors: active)': {
      color: 'inherit',
      forcedColorAdjust: 'auto',
    },
  },
  outline: { color: tokens.colorCompoundBrandForeground1Pressed },
  primary: {
    // same as base
  },
  tint: {
    // same as base
  },
  secondary: { color: tokens.colorCompoundBrandForeground1Pressed },
  subtle: { color: tokens.colorCompoundBrandForeground1Pressed },
  transparent: {
    // same as base
  },
});

export const useToggleButtonStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  const styles = useStyles();
  const rootCheckedStyles = useRootCheckedStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const checkedDisabledStyles = useRootCheckedDisabledStyles();
  const { appearance, checked, disabled, disabledFocusable } = state;
  const showAsDisabled = disabled || disabledFocusable;

  state.root.className = mergeClasses(
    state.root.className,
    toggleButtonClassNames.root,
    !showAsDisabled && styles[appearance],

    checked && !showAsDisabled && rootCheckedStyles.base,
    checked && !showAsDisabled && rootCheckedStyles[appearance],
    checked && showAsDisabled && checkedDisabledStyles.base,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      toggleButtonClassNames.icon,
      checked && iconCheckedStyles.base,
      checked && !showAsDisabled && iconCheckedStyles[appearance],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  useButtonStyles(state);

  return state;
};

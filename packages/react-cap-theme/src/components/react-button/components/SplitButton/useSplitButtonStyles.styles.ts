import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
  menuButton: 'fui-SplitButton__menuButton',
};

const createPaddingWithStrokeAdjustment = (
  horizontal: string
): {
  paddingLeft: string;
  paddingRight: string;
} => ({
  paddingLeft: `calc(${horizontal} - ${tokens.strokeWidthThin})`,
  paddingRight: horizontal,
});

const createSizeStyles = (
  dimension: string
): {
  height: string;
  width: string;
} => ({
  height: dimension,
  width: dimension,
});

const useFocusStyles = makeStyles({
  primaryActionButton: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorStrokeFocus1),
    borderRadius: 0,
    borderRightWidth: 0,
    boxShadow: 'none',
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    ':after': {
      borderRightColor: 'inherit',
      height: '100%',
    },
  }),

  menuButton: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorStrokeFocus1),
    borderRadius: 0,
    borderLeft: 'none',
    boxShadow: 'none',
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    position: 'relative',
    zIndex: 1,
    ':after': {
      content: '""',
      borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorStrokeFocus1}`,
    },
  }),
});

const useRootStyles = makeStyles({
  small: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [`& .${splitButtonClassNames.menuButton}`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
  medium: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [`& .${splitButtonClassNames.menuButton}`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
    },
  },
  large: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [`& .${splitButtonClassNames.menuButton}`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
    },
  },
});

const useRootAppearanceStyles = makeStyles({
  tint: {
    [`&:hover .${splitButtonClassNames.primaryActionButton}`]: {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
    },
    [`&:hover .${splitButtonClassNames.menuButton}`]: {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
    },
  },
  outlineColor: {},
  primary: {},
  outline: {},
  secondary: {},
  subtle: {},
  transparent: {},
});

const usePrimaryActionButtonStyles = makeStyles({
  base: {
    borderRadius: tokens.borderRadiusNone,
    borderRightWidth: '0',
    position: 'relative',
    ':after': {
      content: '""',
      borderRight: `${tokens.strokeWidthThin} solid`,
      borderRightColor: 'inherit',
      boxSizing: 'border-box',
      height: `calc(100% - ${tokens.strokeWidthThin} * 2 - ${tokens.spacingVerticalS} * 2)`,
      opacity: 0.3,
      position: 'absolute',
      right: 0,
    },

    '@media (forced-colors: active)': {
      ':after': { borderRightColor: 'inherit' },
      ':hover:after': { borderRightColor: 'inherit' },
      ':active:after': { borderRightColor: 'inherit' },
    },
  },
  outline: {},
  primary: {
    ':after': { borderRightColor: tokens.colorNeutralStrokeOnBrand2 },
    ':hover:after': {
      borderRightColor: tokens.colorNeutralStrokeOnBrand2Hover,
    },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStrokeOnBrand2Pressed,
    },
  },
  secondary: {},
  subtle: {
    ':after': { borderRightColor: tokens.colorNeutralStroke1 },
    ':hover:after': { borderRightColor: tokens.colorNeutralStroke1Hover },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStroke1Pressed,
    },
  },
  transparent: {
    ':after': { borderRightColor: tokens.colorNeutralStroke1 },
    ':hover:after': { borderRightColor: tokens.colorNeutralStroke1Hover },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStroke1Pressed,
    },
  },
  tint: {
    ':after': {
      borderRightColor: tokens.colorBrandStroke2,
      opacity: 1,
    },
    ':hover:after': {
      borderRightColor: tokens.colorBrandStroke2Hover,
    },
    ':active:after': {
      borderRightColor: tokens.colorBrandStroke2Pressed,
    },
  },
  outlineColor: {},
  disabled: {
    ':after': { borderRightColor: tokens.colorNeutralStrokeDisabled },
    ':hover:after': { borderRightColor: tokens.colorNeutralStrokeDisabled },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },
  },
  small: createPaddingWithStrokeAdjustment(tokens.spacingHorizontalS),
  medium: createPaddingWithStrokeAdjustment(tokens.spacingHorizontalM),
  large: createPaddingWithStrokeAdjustment(tokens.spacingHorizontalM),
});

const useMenuButtonStyles = makeStyles({
  base: {
    borderRadius: tokens.borderRadiusNone,
    borderLeft: 'none',
    ':after': {
      borderLeft: `${tokens.strokeWidthThin} solid`,
      boxSizing: 'border-box',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  },
  small: { paddingLeft: tokens.spacingHorizontalSNudge },
  medium: { paddingLeft: tokens.spacingHorizontalS },
  large: { paddingLeft: tokens.spacingHorizontalMNudge },
});

const useMenuIconStyles = makeStyles({
  small: createSizeStyles('12px'),
  medium: createSizeStyles('16px'),
  large: createSizeStyles('16px'),
});

export const useSplitButtonStyles = (
  state: SplitButtonState
): SplitButtonState => {
  const rootStyles = useRootStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();
  const focusStyles = useFocusStyles();
  const primaryActionButtonStyles = usePrimaryActionButtonStyles();
  const menuButtonStyles = useMenuButtonStyles();
  const menuIconStyles = useMenuIconStyles();

  state.root.className = mergeClasses(
    splitButtonClassNames.root,
    rootStyles[state.size],
    rootAppearanceStyles[state.appearance],
    state.root.className
  );

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      splitButtonClassNames.primaryActionButton,
      primaryActionButtonStyles.base,
      primaryActionButtonStyles[state.appearance],
      primaryActionButtonStyles[state.size],
      focusStyles.primaryActionButton,
      (state.disabled || state.disabledFocusable) &&
        primaryActionButtonStyles.disabled,
      state.primaryActionButton.className
    );
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitButtonClassNames.menuButton,
      menuButtonStyles.base,
      menuButtonStyles[state.size],
      focusStyles.menuButton,
      state.menuButton.className
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      menuIconStyles[state.size],
      state.menuIcon.className
    );
  }

  return state;
};

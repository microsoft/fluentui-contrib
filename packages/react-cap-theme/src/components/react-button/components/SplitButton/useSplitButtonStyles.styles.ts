import { splitButtonClassNames } from '@fluentui/react-button';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import {
  buttonSpacingVerticalLarge,
  buttonSpacingVerticalMedium,
  buttonSpacingVerticalSmall,
} from '../Button/useButtonStyles.styles';
import type { SplitButtonState } from './SplitButton.types';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
});

const useFocusStyles = makeStyles({
  primaryActionButton: createCustomFocusIndicatorStyle({
    borderBottomRightRadius: tokens.borderRadiusNone,
    borderTopRightRadius: tokens.borderRadiusNone,
    ':after': { content: 'none' },
  }),
  menuButton: createCustomFocusIndicatorStyle({
    position: 'relative', // prevent outline clipping
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
  }),
});

const usePrimaryActionButtonStyles = makeStyles({
  base: {
    borderBottomRightRadius: tokens.borderRadiusNone,
    borderRightWidth: '0',
    borderTopRightRadius: tokens.borderRadiusNone,
    position: 'relative',
    ':after': {
      content: '""',
      borderRight: `${tokens.strokeWidthThin} solid`,
      borderRightColor: 'inherit',
      position: 'absolute',
      right: 0,
    },

    '@media (forced-colors: active)': {
      ':after': { borderRightColor: 'inherit' },
      ':hover:after': { borderRightColor: 'inherit' },
      ':active:after': { borderRightColor: 'inherit' },
    },
  },
  outline: {
    // same as base
  },
  primary: {
    ':after': { borderRightColor: tokens.colorNeutralStrokeOnBrand2 },
    ':hover:after': {
      borderRightColor: tokens.colorNeutralStrokeOnBrand2Hover,
    },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStrokeOnBrand2Pressed,
    },
    '@media (forced-colors: active)': {
      ':after': { borderRightColor: 'HighlightText' },
    },
  },
  secondary: {
    // same as base
  },
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
    '@media (forced-colors: active)': {
      ':after': { borderRightColor: 'HighlightText' },
    },
  },
  disabled: {
    ':after': { borderRightColor: tokens.colorNeutralStrokeDisabled },
    ':hover:after': { borderRightColor: tokens.colorNeutralStrokeDisabled },
    ':active:after': {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },
    '@media (forced-colors: active)': {
      ':after': { borderRightColor: 'GrayText' },
      ':hover:after': { borderRightColor: 'GrayText' },
      ':active:after': { borderRightColor: 'GrayText' },
    },
  },
  small: {
    ':after': {
      top: buttonSpacingVerticalSmall,
      bottom: buttonSpacingVerticalSmall,
    },
  },
  medium: {
    ':after': {
      top: buttonSpacingVerticalMedium,
      bottom: buttonSpacingVerticalMedium,
    },
  },
  large: {
    ':after': {
      top: buttonSpacingVerticalLarge,
      bottom: buttonSpacingVerticalLarge,
    },
  },
});

const useMenuButtonStyles = makeStyles({
  base: {
    borderBottomLeftRadius: tokens.borderRadiusNone,
    borderLeft: 'none',
    borderTopLeftRadius: tokens.borderRadiusNone,
  },
  small: { padding: '7px' }, // padding S - 1px border
  medium: { padding: '9px' }, // padding MNudge - 1px border
  large: { padding: '11px' }, // padding M - 1px border
});

export const useSplitButtonStyles = (
  state: SplitButtonState
): SplitButtonState => {
  const styles = useStyles();
  const focusStyles = useFocusStyles();
  const primaryActionButtonStyles = usePrimaryActionButtonStyles();
  const menuButtonStyles = useMenuButtonStyles();

  state.root.className = mergeClasses(
    state.root.className,
    splitButtonClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      state.primaryActionButton.className,
      splitButtonClassNames.primaryActionButton,
      primaryActionButtonStyles.base,
      primaryActionButtonStyles[state.appearance],
      primaryActionButtonStyles[state.size],
      focusStyles.primaryActionButton,
      (state.disabled || state.disabledFocusable) &&
        primaryActionButtonStyles.disabled,
      getSlotClassNameProp_unstable(state.primaryActionButton)
    );
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      state.menuButton.className,
      splitButtonClassNames.menuButton,
      menuButtonStyles.base,
      menuButtonStyles[state.size],
      focusStyles.menuButton,
      getSlotClassNameProp_unstable(state.menuButton)
    );
  }

  return state;
};

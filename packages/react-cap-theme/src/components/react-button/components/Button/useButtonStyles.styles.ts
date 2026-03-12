import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '../../../tokens';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const BORDER_WIDTH = tokens.strokeWidthThin;
const buttonSpacingSmall = `calc(${tokens.spacingVerticalSNudge} - ${BORDER_WIDTH})`;
const buttonSpacingMedium = `calc(${tokens.spacingVerticalS} - ${BORDER_WIDTH})`;
const buttonSpacingLarge = `calc(${tokens.spacingVerticalMNudge} - ${BORDER_WIDTH})`;

const iconFilledClassName = 'fui-Icon-filled';
const iconRegularClassName = 'fui-Icon-regular';

const displayInline = { display: 'inline' };
const displayNone = { display: 'none' };

const useRootStyles = makeStyles({
  base: {
    borderRadius: '12px',
    minWidth: 'unset',
    [`:hover .${iconFilledClassName}`]: displayInline,
    [`:hover .${iconRegularClassName}`]: displayNone,
    [`:hover:active .${iconFilledClassName}`]: displayInline,
    [`:hover:active .${iconRegularClassName}`]: displayNone,

    ...createCustomFocusIndicatorStyle({
      borderRadius: '12px',
      boxShadow: `
      0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1} inset
      `,
    }),
  },
  small: {
    ...typographyStyles.caption1Strong,
    borderRadius: '8px',
    height: '28px',
    padding: `${buttonSpacingSmall} calc(${tokens.spacingHorizontalS} - ${BORDER_WIDTH})`,
  },
  medium: {
    height: '36px',
    padding: `${buttonSpacingMedium} calc(${tokens.spacingHorizontalM} - ${BORDER_WIDTH})`,
  },
  large: {
    ...typographyStyles.body1Strong,
    height: '44px',
    padding: `${buttonSpacingLarge} calc(${tokens.spacingHorizontalM} - ${BORDER_WIDTH})`,
  },
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralBackground5),
    color: tokens.colorNeutralForeground3,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  primary: {
    ...shorthands.borderColor(tokens.colorBrandBackground),
    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandBackgroundHover),
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandBackgroundPressed),
    },
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralBackground5),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  subtle: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground3,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Hover),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1,
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground1,
      },
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForeground3Pressed,
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  transparent: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground3,
    ':hover': { color: tokens.colorCompoundBrandForeground1Hover },
    [':hover:active']: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  tint: {
    ...shorthands.borderColor(tokens.colorBrandStroke2),
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorCompoundBrandForeground1,
    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  outlineColor: {
    ...shorthands.borderColor(tokens.colorBrandStroke2),
    backgroundColor: 'transparent',
    color: tokens.colorCompoundBrandForeground1,
    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralBackground5),
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForegroundDisabled,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackground5),
      backgroundColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground5),
      backgroundColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralBackground5),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForegroundDisabled,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackground5),
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground5),
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  subtle: {},
  transparent: {},
  primary: {
    ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),
    },
  },
  tint: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },
  outlineColor: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    ':hover:active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },
});

const useRootIconOnlyStyles = makeStyles({
  small: {
    minWidth: '28px',
    maxWidth: '28px',
    padding: buttonSpacingSmall,
  },
  medium: {
    minWidth: '36px',
    maxWidth: '36px',
    padding: buttonSpacingMedium,
  },
  large: {
    minWidth: '40px',
    maxWidth: '40px',
    padding: buttonSpacingLarge,
  },
});

const useIconStyles = makeStyles({
  small: {
    fontSize: '16px',
    height: '16px',
    width: '16px',
  },
  medium: {},
  large: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
});

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
    buttonClassNames.root,
    rootStyles.base,
    rootStyles[appearance],
    (disabled || disabledFocusable) && rootDisabledStyles[appearance],
    rootStyles[size],
    iconOnly && rootIconOnlyStyles[size]
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      buttonClassNames.icon,
      iconStyles[size]
    );
  }

  return state;
};

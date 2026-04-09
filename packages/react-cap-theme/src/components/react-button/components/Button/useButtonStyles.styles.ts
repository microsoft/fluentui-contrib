import { buttonClassNames } from '@fluentui/react-button';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '../../../tokens';
import {
  type GriffelStyle,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import type { ButtonState } from './Button.types';

const iconSpacingVar = '--fui-Button__icon--spacing';
const rootSpacingAsymmetryVar = '--fui-Button--spacing-asymmetry';

export const buttonSpacingVerticalSmall = '5px';
export const buttonSpacingVerticalMedium = '7px';
export const buttonSpacingVerticalLarge = '9px';

const boxShadowStrokeWidthThinMoz = `calc(${tokens.strokeWidthThin} + 0.25px)`;

const innerFocusRing = (
  strokeColor: string = tokens.colorStrokeFocus1
): GriffelStyle => ({
  boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${strokeColor} inset`,
  '@supports (-moz-appearance:button)': {
    boxShadow: `0 0 0 ${boxShadowStrokeWidthThinMoz} ${strokeColor} inset`,
  },
});

const highContrastPrimaryStyles: GriffelStyle = {
  '@media (forced-colors: active)': {
    backgroundColor: 'Highlight',
    ...shorthands.borderColor('Highlight'),
    color: 'HighlightText',
    forcedColorAdjust: 'none',
    ':focus': { ...shorthands.borderColor('Highlight') },
  },
};

const useRootBaseStyles = makeStyles({
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',

    margin: 0,
    overflow: 'hidden',

    color: tokens.colorNeutralForeground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke4}`,
    borderRadius: tokens.borderRadius2XLarge,
    cursor: 'pointer',

    ':hover': { color: tokens.colorNeutralForeground1Hover },
    ':hover:active': { color: tokens.colorNeutralForeground1Pressed },
    ':focus-visible': { outline: 'none', outlineOffset: 0 }, // Remove browser defaults

    ...typographyStyles.body1Strong,

    transitionDuration: tokens.durationFaster,
    transitionProperty: 'background, border, color',
    transitionTimingFunction: tokens.curveEasyEase,
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },

    '@media (forced-colors: active)': {
      ':focus': { ...shorthands.borderColor('ButtonBorder') },
      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
        [`& .${buttonClassNames.icon}`]: { color: 'inherit' },
      },
      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
        [`& .${buttonClassNames.icon}`]: { color: 'inherit' },
      },
    },
  },
});

const useIconBaseStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase500,

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
  },
});

const useRootStyles = makeStyles({
  root: {
    [`:hover .${iconFilledClassName}`]: { display: 'inline' },
    [`:hover .${iconRegularClassName}`]: { display: 'none' },
    [`:hover:active .${iconFilledClassName}`]: { display: 'inline' },
    [`:hover:active .${iconRegularClassName}`]: { display: 'none' },
  },
  outline: {
    backgroundColor: tokens.colorTransparentBackground, // Remove browser styling
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4Hover),
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
    },
  },
  primary: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ...highContrastPrimaryStyles,
  },
  secondary: {
    backgroundColor: tokens.colorNeutralBackground3,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4Hover),
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
    },
  },
  subtle: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground, // Remove browser styling
    ':hover': { backgroundColor: tokens.colorNeutralBackground3Hover },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
    },
  },
  transparent: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground, // Remove browser styling
    '@media (forced-colors: active)': {
      ':hover': { backgroundColor: tokens.colorTransparentBackground },
      ':hover:active': {
        backgroundColor: tokens.colorTransparentBackground,
      },
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
    ...highContrastPrimaryStyles,
  },
  small: {
    ...typographyStyles.caption1Strong,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${buttonSpacingVerticalSmall} ${tokens.spacingHorizontalMNudge}`,
  },
  medium: {
    padding: `${buttonSpacingVerticalMedium} ${tokens.spacingHorizontalM}`,
  },
  large: {
    ...typographyStyles.subtitle2,
    padding: `${buttonSpacingVerticalLarge} ${tokens.spacingHorizontalL}`,
  },
});

const useRootDisabledStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      color: tokens.colorNeutralForegroundDisabled,
      [`& .${iconFilledClassName}`]: { display: 'none' },
      [`& .${iconRegularClassName}`]: { display: 'inline' },
    },
    ':hover:active': {
      color: tokens.colorNeutralForegroundDisabled,
      [`& .${iconFilledClassName}`]: { display: 'none' },
      [`& .${iconRegularClassName}`]: { display: 'inline' },
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': { ...shorthands.borderColor('GrayText') },
      ':hover': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },
      ':hover:active': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },
    },
  },
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorTransparentBackground,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorTransparentBackground,
    },
  },
  primary: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ':hover': { backgroundColor: tokens.colorNeutralBackgroundDisabled },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
  },
  subtle: {
    ':hover': { backgroundColor: tokens.colorTransparentBackground },
    ':hover:active': { backgroundColor: tokens.colorTransparentBackground },
  },
  transparent: {
    // same as base
  },
  tint: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
  },
});

const useRootBaseFocusIndicatorStyles = makeStyles({
  base: createCustomFocusIndicatorStyle({
    borderColor: tokens.colorStrokeFocus2,
    borderRadius: tokens.borderRadius2XLarge,
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    zIndex: 1,
    ...innerFocusRing(),

    ':hover': { borderColor: tokens.colorStrokeFocus2 },
    '@media (forced-colors: active)': {
      outlineColor: 'Highlight',
      ...innerFocusRing('ButtonFace'),
      ':focus': { borderColor: 'Highlight' },
    },
  }) as unknown as GriffelStyle,
  small: createCustomFocusIndicatorStyle({
    borderRadius: tokens.borderRadiusXLarge,
  }) as unknown as GriffelStyle,
});

const useRootFocusStyles = makeStyles({
  primary: createCustomFocusIndicatorStyle({
    ...innerFocusRing(tokens.colorNeutralStrokeOnBrand),
    '@media (forced-colors: active)': {
      outlineColor: 'ButtonBorder',
      ...innerFocusRing('ButtonFace'),
      ':focus': { ...shorthands.borderColor('ButtonFace') },
    },
  }) as unknown as GriffelStyle,
});

const useRootIconOnlyStyles = makeStyles({
  small: {
    minWidth: '28px',
    maxWidth: '28px',
    padding: buttonSpacingVerticalSmall,
  },
  medium: {
    minWidth: '36px',
    maxWidth: '36px',
    padding: buttonSpacingVerticalMedium,
  },
  large: {
    minWidth: '44px',
    maxWidth: '44px',
    padding: buttonSpacingVerticalLarge,
  },
});

const useRootTextAndIconStyles = makeStyles({
  small: {
    [rootSpacingAsymmetryVar]: tokens.spacingHorizontalS,
  },
  medium: {
    [rootSpacingAsymmetryVar]: tokens.spacingHorizontalMNudge,
  },
  large: {
    [rootSpacingAsymmetryVar]: '14px', // FIXME update to token when available
  },
  before: { paddingLeft: `var(${rootSpacingAsymmetryVar})` },
  after: { paddingRight: `var(${rootSpacingAsymmetryVar})` },
});

const useIconStyles = makeStyles({
  small: {
    fontSize: tokens.fontSizeBase400,
    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    // same as useIconBaseClassName
  },
  large: {
    fontSize: tokens.fontSizeBase600,
    [iconSpacingVar]: tokens.spacingHorizontalS,
  },
  before: { marginRight: `var(${iconSpacingVar})` },
  after: { marginLeft: `var(${iconSpacingVar})` },
});

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const rootBaseStyles = useRootBaseStyles();
  const iconBaseStyles = useIconBaseStyles();

  const rootStyles = useRootStyles();
  const rootBaseFocusIndicatorStyles = useRootBaseFocusIndicatorStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const rootTextAndIconStyles = useRootTextAndIconStyles();
  const iconStyles = useIconStyles();

  const {
    appearance,
    disabled,
    disabledFocusable,
    iconOnly,
    iconPosition,
    size,
  } = state;
  const isPrimary = ['primary', 'tint'].includes(appearance);
  const isTextAndIcon = !!state.root.children && state.icon;

  state.root.className = mergeClasses(
    state.root.className,
    buttonClassNames.root,
    rootBaseStyles.base,
    rootBaseFocusIndicatorStyles.base,
    rootStyles.root,
    rootStyles[appearance],
    rootStyles[size],
    size === 'small' && rootBaseFocusIndicatorStyles.small,

    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    !disabledFocusable && isPrimary && rootFocusStyles.primary,
    isTextAndIcon && rootTextAndIconStyles[iconPosition],
    isTextAndIcon && rootTextAndIconStyles[size],
    iconOnly && rootIconOnlyStyles[size],
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      buttonClassNames.icon,
      iconBaseStyles.base,
      !!state.root.children && iconStyles[iconPosition],
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  return state;
};

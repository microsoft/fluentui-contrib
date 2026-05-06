import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/tokens';
import type { InteractionTagSecondaryState } from '@fluentui/react-tags';
import { capTokens } from '../../../tokens/tokens';

const useRootBaseClassName = makeResetStyles({
  color: 'inherit',
  fontFamily: 'inherit',
  padding: '0px',
  borderStyle: 'none',
  appearance: 'button',
  textAlign: 'unset',
  backgroundColor: 'transparent',

  // Layout
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  boxSizing: 'border-box',
  position: 'relative',
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  borderRadius: 'inherit',
  borderTopLeftRadius: tokens.borderRadiusNone,
  borderBottomLeftRadius: tokens.borderRadiusNone,
  borderLeft: 'none',
  cursor: 'pointer',

  ...createCustomFocusIndicatorStyle({
    outline: 'none',
    boxShadow: 'none',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: '0',
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      zIndex: 1,
      pointerEvents: 'none',
    },
  }),

  // Divider line via ::before pseudo-element
  '::before': {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },

  // Pseudo element for Windows high contrast mode
  '@media (forced-colors: active)': {
    ...createCustomFocusIndicatorStyle({
      '::before': { borderLeftColor: 'Highlight' },
      '::after': { outline: `${tokens.strokeWidthThick} solid Highlight` },
    }),
  },
});

const useRootStyles = makeStyles({
  // Sizes — explicit top-right/bottom-right radii (left corners are flat,
  // owned by the base reset). The focus-ring `::after` mirrors them.
  medium: {
    padding: tokens.spacingHorizontalMNudge,
    fontSize: '16px',
    borderTopRightRadius: capTokens.borderRadius2XLarge,
    borderBottomRightRadius: capTokens.borderRadius2XLarge,
    '::before': { height: '16px' },
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: capTokens.borderRadius2XLarge },
    }),
  },
  small: {
    padding: tokens.spacingHorizontalSNudge,
    fontSize: '12px',
    borderTopRightRadius: tokens.borderRadiusXLarge,
    borderBottomRightRadius: tokens.borderRadiusXLarge,
    '::before': { height: '12px' },
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusXLarge },
    }),
  },
  'extra-small': {
    padding: tokens.spacingHorizontalXS,
    fontSize: '12px',
    borderTopRightRadius: tokens.borderRadiusLarge,
    borderBottomRightRadius: tokens.borderRadiusLarge,
    '::before': { height: '12px' },
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusLarge },
    }),
  },

  // Shape — `rounded` (default) is already covered by the per-size styles above.
  // `circular` overrides the right-corner radii (and focus-ring radius) for
  // backward-compat with Fluent's `shape` prop.
  circular: {
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusCircular },
    }),
  },
});

const useRootAppearanceStyles = makeStyles({
  notDisabled: {
    ':hover': {
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':active': {
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorNeutralBackground3Pressed,
    },
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ':hover': {
      color: tokens.colorBrandForeground2Hover,
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
    ':active': {
      color: tokens.colorBrandForeground2Pressed,
      backgroundColor: tokens.colorBrandBackground2Pressed,
    },
    '::before': { borderLeftColor: tokens.colorBrandStroke2 },
  },
});

const useRootDisabledStyles = makeStyles({
  base: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
});

const useRootSelectedStyles = makeStyles({
  base: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),

    ...createCustomFocusIndicatorStyle({
      '::after': {
        outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
        boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset`,
      },
    }),

    '::before': { borderLeftColor: tokens.colorNeutralStrokeOnBrand2 },

    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
      backgroundColor: 'Highlight',
      color: 'HighlightText',
      ...createCustomFocusIndicatorStyle({
        '::after': {
          outline: `${tokens.strokeWidthThick} solid Highlight`,
          boxShadow: `0 0 0 ${tokens.strokeWidthThin} ButtonFace inset`,
        },
      }),
      '::before': { borderLeftColor: 'ButtonBorder' },
    },
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInvertedSelected,
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInvertedSelected,
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
});

/**
 * Apply styling to the SharePoint InteractionTagSecondary component.
 * @param state - The InteractionTagSecondary state object
 * @returns The styled InteractionTagSecondary state
 * @alpha
 */
export const useInteractionTagSecondaryStyles = (
  state: InteractionTagSecondaryState
): InteractionTagSecondaryState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootSelectedStyles = useRootSelectedStyles();

  const { disabled, size, appearance, selected, shape } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootBaseClassName,
    rootStyles[size],
    shape === 'circular' && rootStyles.circular,
    disabled ? rootDisabledStyles.base : rootAppearanceStyles[appearance],
    !disabled && rootAppearanceStyles.notDisabled,
    selected && !disabled && rootSelectedStyles.base,
    selected && !disabled && rootSelectedStyles[appearance],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};

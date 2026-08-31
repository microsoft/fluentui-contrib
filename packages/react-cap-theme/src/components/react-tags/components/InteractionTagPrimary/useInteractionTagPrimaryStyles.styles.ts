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
import { tokens, typographyStyles } from '@fluentui/tokens';
import type { InteractionTagPrimaryState } from '@fluentui/react-tags';
import {
  useIconStyles,
  useMediaStyles,
  useSecondaryTextBaseClassName,
} from '../Tag/useTagStyles.styles';
import { capTokens } from '../../../tokens';

/**
 * Base reset styles for the InteractionTagPrimary root slot.
 * Self-contained — replaces Fluent's useInteractionTagPrimaryStyles_unstable entirely.
 */
const useRootBaseClassName = makeResetStyles({
  color: 'inherit',
  fontFamily: 'inherit',
  padding: '0px',
  borderStyle: 'none',
  appearance: 'button',
  textAlign: 'unset',
  backgroundColor: 'transparent',

  // Grid layout handles the 2D slot arrangement (media/icon spans two rows).
  display: 'inline-grid',
  height: '100%',
  alignItems: 'center',
  gridTemplateAreas: `
    "media primary"
    "media secondary"
  `,
  boxSizing: 'border-box',
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  borderRadius: 'inherit',
  cursor: 'pointer',
  position: 'relative',

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

  // Pseudo element to draw the border for Windows high contrast mode.
  '@media (forced-colors: active)': {
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      inset: '-1px',
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      pointerEvents: 'none',
    },
    ...createCustomFocusIndicatorStyle({
      '::before': { borderTopColor: 'Highlight' },
      '::after': { outline: `${tokens.strokeWidthThick} solid Highlight` },
    }),
  },
});

const useRootStyles = makeStyles({
  // Sizes (rounded focus-ring radius is the SPDS default and is baked into each size).
  // The element itself uses `borderRadius: 'inherit'` (from the InteractionTag root),
  // so visible corners follow `shape` automatically — only the `::after` focus ring
  // needs an explicit per-size radius.
  medium: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: capTokens.borderRadius2XLarge },
    }),
  },
  small: {
    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusXLarge },
    }),
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusLarge },
    }),
  },

  // Shape — `rounded` (default) is already covered by the per-size styles above.
  // `circular` overrides the focus-ring radius for backward-compat with Fluent's `shape` prop.
  circular: {
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: tokens.borderRadiusCircular },
    }),
  },
});

const useRootAppearanceStyles = makeStyles({
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground2Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorBrandForeground2Hover,
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorBrandForeground2Pressed,
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
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
    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ...createCustomFocusIndicatorStyle({
      '::after': {
        outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
        boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset`,
      },
    }),

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

const useRootWithIconStyles = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalMNudge,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalS,
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

const useRootWithMediaStyles = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalSNudge,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalXXS,
  },
});

const useRootWithSecondaryActionStyles = makeStyles({
  base: {
    borderTopRightRadius: tokens.borderRadiusNone,
    borderBottomRightRadius: tokens.borderRadiusNone,
    borderRightStyle: 'none',
  },
});

const useRootWithSecondaryTextStyles = makeStyles({
  base: {
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
  },
});

const usePrimaryTextStyles = makeStyles({
  base: {
    gridArea: 'primary',
    gridRowEnd: 'secondary',
    whiteSpace: 'nowrap',
  },
  medium: typographyStyles.body1Strong,
  small: typographyStyles.caption1Strong,
  'extra-small': typographyStyles.caption2Strong,
  withSecondaryText: {
    gridArea: 'primary',
    ...typographyStyles.caption1Strong,
    marginTop: '-2px',
  },
});

/**
 * @param state - The InteractionTagPrimary state object
 * @returns The styled InteractionTagPrimary state
 * @alpha
 */
export const useInteractionTagPrimaryStyles = (
  state: InteractionTagPrimaryState
): InteractionTagPrimaryState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootSelectedStyles = useRootSelectedStyles();
  const rootWithIconStyles = useRootWithIconStyles();
  const rootWithMediaStyles = useRootWithMediaStyles();
  const rootWithSecondaryActionStyles = useRootWithSecondaryActionStyles();
  const rootWithSecondaryTextStyles = useRootWithSecondaryTextStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();

  const { disabled, size, appearance, selected, shape } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootBaseClassName,
    rootStyles[size],
    shape === 'circular' && rootStyles.circular,
    disabled ? rootDisabledStyles.base : rootAppearanceStyles[appearance],
    selected && !disabled && rootSelectedStyles.base,
    selected && !disabled && rootSelectedStyles[appearance],
    state.icon && rootWithIconStyles[size],
    state.media && rootWithMediaStyles[size],
    state.hasSecondaryAction && rootWithSecondaryActionStyles.base,
    state.secondaryText && rootWithSecondaryTextStyles.base,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      state.primaryText.className,
      primaryTextStyles.base,
      primaryTextStyles[size],
      state.secondaryText && primaryTextStyles.withSecondaryText,
      getSlotClassNameProp_unstable(state.primaryText)
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      state.secondaryText.className,
      secondaryTextBaseClassName,
      getSlotClassNameProp_unstable(state.secondaryText)
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconStyles.base,
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      mediaStyles.base,
      mediaStyles[size],
      getSlotClassNameProp_unstable(state.media)
    );
  }

  return state;
};

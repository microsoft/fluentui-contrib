import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { TagState } from '@fluentui/react-tags';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';

const useRootBaseClassName = makeResetStyles({
  // Reset default button style:
  fontFamily: 'inherit',
  padding: '0px',
  appearance: 'button',
  textAlign: 'unset',

  // Grid layout handles the 2D slot arrangement (media/icon spans two rows).
  // Flex would require a wrapper element for the primary+secondary text stack,
  // which doesn't exist in Fluent's renderTag_unstable.
  display: 'inline-grid',
  alignItems: 'center',
  gridTemplateAreas: `
    "media primary   dismissIcon"
    "media secondary dismissIcon"
  `,
  boxSizing: 'border-box',
  width: 'fit-content',
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

  ...createCustomFocusIndicatorStyle({
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    borderRadius: 'inherit',
    boxShadow: 'none',
  }),

  // Pseudo element to draw the border for windows high contrast mode —
  // when Tag has secondary text, primary text has negative margin that covers the border.
  '@media (forced-colors: active)': {
    position: 'relative',
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      inset: '-1px',
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
    },
    ...createCustomFocusIndicatorStyle({
      '::before': { borderTopColor: 'Highlight' },
    }),
  },
});

const useRootStyles = makeStyles({
  // Appearance
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },

  medium: {
    height: '36px',
    borderRadius: capTokens.borderRadius2XLarge,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    ...createCustomFocusIndicatorStyle({
      borderRadius: capTokens.borderRadius2XLarge,
    }),
  },
  small: {
    height: '24px',
    borderRadius: tokens.borderRadiusXLarge,
    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: tokens.borderRadiusXLarge,
    }),
  },
  'extra-small': {
    position: 'relative',
    height: '20px',
    borderRadius: tokens.borderRadiusLarge,
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: tokens.borderRadiusLarge,
    }),
    // Increase clickable area to meet WCAG 2.2 AA
    // https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
    '@media (forced-colors: none)': {
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        height: '2px',
        left: '0',
        width: '100%',
      },
      '&:before': {
        bottom: '100%',
      },
      '&:after': {
        top: '100%',
      },
    },
  },

  // Shape — `rounded` (default) is already covered by the per-size styles above.
  // `circular` overrides the radius for backward-compat with Fluent's `shape` prop.
  circular: {
    borderRadius: tokens.borderRadiusCircular,
    ...createCustomFocusIndicatorStyle({
      borderRadius: tokens.borderRadiusCircular,
    }),
  },
});

const useRootDisabledStyles = makeStyles({
  filled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
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
      boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset`,
    }),

    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
      backgroundColor: 'Highlight',
      color: 'HighlightText',
      ...createCustomFocusIndicatorStyle({
        outline: `${tokens.strokeWidthThick} solid Highlight`,
        boxShadow: `0 0 0 ${tokens.strokeWidthThin} ButtonFace inset`,
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
  },
});

const useRootWithIconStyles = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalMNudge, // 10px
  },
  small: {
    paddingLeft: tokens.spacingHorizontalS, // 8px
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalXS, // 4px
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

const useRootWithDismissStyles = makeStyles({
  medium: {
    paddingRight: tokens.spacingHorizontalMNudge,
  },
  small: {
    paddingRight: tokens.spacingHorizontalS,
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalXS,
  },
});

const useRootDismissibleStyles = makeStyles({
  filled: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  outline: {
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground2Pressed,
      ...shorthands.borderColor(tokens.colorSubtleBackgroundPressed),
    },
  },
  brand: {
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorBrandForeground2Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorBrandForeground2Pressed,
    },
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
});

// When secondaryText is present (medium only — see useTag), primary text
// downsizes from body1Strong to caption1Strong and occupies only the primary row.
const usePrimaryTextWithSecondaryStyles = makeStyles({
  base: {
    gridArea: 'primary', // gridArea resets gridRowEnd from base (which spans both rows via gridRowEnd: 'secondary')
    ...typographyStyles.caption1Strong,
    marginTop: '-2px',
  },
});

/** Icon size constants — shared with InteractionTagPrimary. */
const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

/** Secondary text base class — shared with InteractionTagPrimary. */
export const useSecondaryTextBaseClassName = makeResetStyles({
  gridArea: 'secondary',
  ...typographyStyles.caption2,
  whiteSpace: 'nowrap',
});

// Icon-to-text gap is handled via paddingRight on the icon slot rather than
// columnGap on the root grid, because columnGap would also add unwanted space
// between text and the (potentially empty) dismissIcon column.
// Shared with InteractionTagPrimary.
export const useIconStyles = makeStyles({
  base: {
    gridArea: 'media',
    display: 'flex',
    boxSizing: 'content-box',
  },
  medium: {
    paddingRight: tokens.spacingHorizontalSNudge, // 6px gap between icon and text
    width: mediumIconSize,
    fontSize: mediumIconSize,
  },
  small: {
    paddingRight: tokens.spacingHorizontalXS, // 4px gap between icon and text
    width: smallIconSize,
    fontSize: smallIconSize,
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalXXS, // 2px gap between icon and text
    width: extraSmallIconSize,
    fontSize: extraSmallIconSize,
  },
});

/** Media (avatar) slot styles — shared with InteractionTagPrimary. */
export const useMediaStyles = makeStyles({
  base: {
    gridArea: 'media',
    display: 'flex',
  },
  medium: {
    paddingRight: tokens.spacingHorizontalS, // 8px gap between avatar and text
  },
  small: {
    paddingRight: tokens.spacingHorizontalSNudge, // 6px gap between avatar and text
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalXS, // 4px gap between avatar and text
  },
});

const useDismissIconStyles = makeStyles({
  base: {
    gridArea: 'dismissIcon',
    display: 'flex',
    // Windows high contrast:
    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',
      },
      ':active': {
        color: 'Highlight',
      },
    },
  },
  notDisabled: {
    cursor: 'pointer',
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
  medium: {
    paddingLeft: tokens.spacingHorizontalSNudge, // 6px gap between text and dismiss
    fontSize: '16px',
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXS, // 4px gap between text and dismiss
    fontSize: '12px',
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalXXS, // 2px gap between text and dismiss
    fontSize: '12px',
  },
});

export const useTagStyles = (state: TagState): TagState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootSelectedStyles = useRootSelectedStyles();
  const rootWithIconStyles = useRootWithIconStyles();
  const rootWithMediaStyles = useRootWithMediaStyles();
  const rootWithDismissStyles = useRootWithDismissStyles();
  const rootDismissibleStyles = useRootDismissibleStyles();
  const rootWithSecondaryTextStyles = useRootWithSecondaryTextStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const primaryTextWithSecondaryStyles = usePrimaryTextWithSecondaryStyles();
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const dismissIconStyles = useDismissIconStyles();

  const { disabled, size, appearance, selected, shape } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootBaseClassName,
    disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
    selected && !disabled && rootSelectedStyles.base,
    selected && !disabled && rootSelectedStyles[appearance],
    rootStyles[size],
    shape === 'circular' && rootStyles.circular,
    state.icon && rootWithIconStyles[size],
    state.media && rootWithMediaStyles[size],
    state.dismissIcon && rootWithDismissStyles[size],
    state.dismissible && !disabled && rootDismissibleStyles[appearance],
    state.secondaryText && rootWithSecondaryTextStyles.base,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      state.primaryText.className,
      primaryTextStyles.base,
      primaryTextStyles[size],
      state.secondaryText && primaryTextWithSecondaryStyles.base,
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

  if (state.dismissIcon) {
    state.dismissIcon.className = mergeClasses(
      state.dismissIcon.className,
      dismissIconStyles.base,
      dismissIconStyles[size],
      !disabled && dismissIconStyles.notDisabled,
      getSlotClassNameProp_unstable(state.dismissIcon)
    );
  }

  return state;
};

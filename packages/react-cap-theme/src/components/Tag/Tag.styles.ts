import { createElement } from 'react';
import {
  makeStyles,
  mergeClasses,
  // shorthands,
  tokens,
  typographyStyles,
  type TagState,
  tagClassNames,
  useTagStyles_unstable,
} from '@fluentui/react-components';
import {
  bundleIcon,
  DismissFilled,
  DismissRegular,
} from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const tagAvatarSizeMap = {
  medium: 20,
  small: 20,
  'extra-small': 16,
} as const;

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

const useRootStyles = makeStyles({
  root: {
    // ...createCustomFocusIndicatorStyle({
    //   boxShadow: `
    //     0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset,
    //     0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
    //   `,
    // }),
    // '@media (forced-colors: active)': {
    //   '::before': {
    //     borderTopLeftRadius: 'inherit',
    //     borderTopRightRadius: 'inherit',
    //   },
    //   ...createCustomFocusIndicatorStyle({
    //     '::before': { borderTopColor: 'Highlight' },
    //   }),
    // },
  },
  medium: {
    height: CAP_TOKENS['fixme/tag/height/medium'],
    borderRadius: CAP_TOKENS['fixme/tag/corner-radius/medium'],
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_TOKENS['fixme/tag/corner-radius/medium'],
    }),
  },
  small: {
    borderRadius: CAP_TOKENS['fixme/tag/corner-radius/small'],
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_TOKENS['fixme/tag/corner-radius/small'],
    }),
  },
  'extra-small': {
    borderRadius: CAP_TOKENS['fixme/tag/corner-radius/xsmall'],
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_TOKENS['fixme/tag/corner-radius/xsmall'],
    }),
  },
});

const useRootAppearanceStyles = makeStyles({
  filled: {
    backgroundColor: CAP_TOKENS['fixme/tag/background/filled/rest'],
    color: CAP_TOKENS['fixme/tag/foreground/filled/rest'],
  },
  outline: {
    color: CAP_TOKENS['fixme/tag/foreground/outline/rest'],
  },
  brand: {
    backgroundColor: CAP_TOKENS['fixme/tag/background/brand/rest'],
    color: CAP_TOKENS['fixme/tag/foreground/brand/rest'],
  },
});

// Selectet state styles are missing on the design specs
// const useRootSelectedStyles = makeStyles({
//   base: {
//     ...shorthands.borderColor(CAP_TOKENS['fixme/tag/filled/stroke/rest']),
//     color: tokens.colorNeutralForegroundOnBrand,
//     // [`& .${iconFilledClassName}`]: {
//     //   display: 'inline',
//     // },
//     // [`& .${iconRegularClassName}`]: {
//     //   display: 'none',
//     // },

//     // '@media (forced-colors: active)': {
//     //   ...createCustomFocusIndicatorStyle({
//     //     outline: 'none',
//     //     boxShadow: `
//     //       0 0 0 ${tokens.strokeWidthThin} ButtonFace inset,
//     //       0 0 0 ${tokens.strokeWidthThick} Highlight
//     //     `,
//     //   }),
//     // },
//   },
//   filled: {
//     backgroundColor: tokens.colorNeutralBackgroundInverted,
//   },
//   outline: {
//     backgroundColor: tokens.colorNeutralBackgroundInverted,
//   },
//   brand: {
//     backgroundColor: tokens.colorBrandBackground,
//   },
// });

const useRootWithoutMediaStyles = makeStyles({
  'extra-small': {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/xs'],
  },
  small: {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/s'],
  },
  medium: {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/medium'],
  },
});

const useRootWithSecondaryTextStyles = makeStyles({
  base: {
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
  },
});

const useRootWithoutDismissStyles = makeStyles({
  'extra-small': {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/xs'],
  },
  small: {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/s'],
  },
  medium: {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/medium'],
  },
});

const usePrimaryTextStyles = makeStyles({
  medium: {
    ...typographyStyles.body1Strong,
  },
  small: {
    ...typographyStyles.caption1Strong,
  },
  'extra-small': {
    ...typographyStyles.caption1Strong,
  },
  withSecondaryText: {
    ...typographyStyles.caption1Strong,
  },
});

const useIconStyles = makeStyles({
  medium: {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/medium'],
    paddingRight: CAP_TOKENS['fixme/tag/icon/padding/horizontal/medium'],
  },
  small: {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/s'],
    paddingRight: CAP_TOKENS['fixme/tag/icon/padding/horizontal/s'],
  },
  'extra-small': {
    paddingLeft: CAP_TOKENS['fixme/tag/padding/horizontal/xs'],
    paddingRight: CAP_TOKENS['fixme/tag/icon/padding/horizontal/xs'],
  },
});

const useMediaStyles = makeStyles({
  medium: {
    paddingLeft: CAP_TOKENS['fixme/tag/avatar/padding/horizontal/medium'],
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/medium'],
  },
  small: {
    paddingLeft: CAP_TOKENS['fixme/tag/avatar/padding/horizontal/s'],
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/s'],
  },
  'extra-small': {
    paddingLeft: CAP_TOKENS['fixme/tag/avatar/padding/horizontal/xs'],
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/xs'],
  },
});

const useDismissIconStyles = makeStyles({
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
    ':hover': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/filled/foreground/hover'],
    },
    ':active': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/filled/foreground/pressed'],
    },
  },
  outline: {
    ':hover': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/outline/foreground/hover'],
    },
    ':active': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/outline/foreground/pressed'],
    },
  },
  brand: {
    ':hover': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/brand/foreground/hover'],
    },
    ':active': {
      color: CAP_TOKENS['fixme/tag/dismiss-icon/brand/foreground/pressed'],
    },
  },
  medium: {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/medium'],
    fontSize: '16px',
  },
  small: {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/s'],
    fontSize: '12px',
  },
  'extra-small': {
    paddingRight: CAP_TOKENS['fixme/tag/padding/horizontal/xs'],
    fontSize: '12px',
  },
  // selected: {
  //   ':hover': {
  //     color: tokens.colorNeutralForegroundOnBrand,
  //   },
  //   ':active': {
  //     color: tokens.colorNeutralForegroundOnBrand,
  //   },
  // },
});

/**
 * Apply styling to the SharePoint Tag component.
 *
 * @param state - The Tag state object
 * @returns The styled Tag state
 * @alpha
 */
export const useTagStylesHook = (state: TagState): TagState => {
  const rootStyles = useRootStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();
  // const rootSelectedStyles = useRootSelectedStyles();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithoutDismissStyles = useRootWithoutDismissStyles();
  const rootWithSecondaryTextStyles = useRootWithSecondaryTextStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const dismissIconStyles = useDismissIconStyles();

  state.avatarSize = tagAvatarSizeMap[state.size];
  if (state.dismissible && state.dismissIcon) {
    state.dismissIcon.children = createElement(DismissIcon);
  }
  console.log("'extra-small': {", state.size);
  state.root.className = mergeClasses(
    state.root.className,
    tagClassNames.root,
    rootStyles.root,
    rootStyles[state.size],
    !state.disabled && rootAppearanceStyles[state.appearance],
    // !state.media && !state.icon && rootWithoutMediaStyles.base,
    // !state.media &&
    //   !state.icon &&
    //   state.size === 'medium' &&
    //   rootWithoutMediaStyles.mediumWithoutMedia,
    !state.media && !state.icon && rootWithoutMediaStyles[state.size],
    !state.dismissible && rootWithoutDismissStyles[state.size],
    // !state.dismissible && rootWithoutDismissStyles.base,
    // !state.dismissible &&
    //   (state.media || state.icon) &&
    //   state.size === 'medium' &&
    //   rootWithoutDismissStyles.mediumWithMedia,
    // !state.dismissible &&
    //   !(state.media || state.icon) &&
    //   state.size === 'medium' &&
    //   rootWithoutDismissStyles.mediumWithoutMedia,
    state.secondaryText && rootWithSecondaryTextStyles.base
    // state.selected && rootSelectedStyles.base,
    // state.selected && rootSelectedStyles[state.appearance]
  );

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      state.primaryText.className,
      tagClassNames.primaryText,
      primaryTextStyles[state.size],
      state.secondaryText && primaryTextStyles.withSecondaryText
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      state.secondaryText.className,
      tagClassNames.secondaryText
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      tagClassNames.icon,
      iconStyles[state.size]
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      tagClassNames.media,
      mediaStyles[state.size]
    );
  }

  if (state.dismissIcon) {
    state.dismissIcon.className = mergeClasses(
      state.dismissIcon.className,
      dismissIconStyles[state.size],
      !state.disabled && dismissIconStyles.notDisabled,
      !state.disabled && dismissIconStyles[state.appearance]
      // state.selected && !state.disabled && dismissIconStyles.selected
    );
  }

  useTagStyles_unstable(state);

  return state;
};

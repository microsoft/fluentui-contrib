import { tabClassNames } from '@fluentui/react-tabs';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';
import type { TabState } from './Tab.types';

const smallSpacingVertical = tokens.spacingVerticalSNudge;
const mediumSpacingVertical = tokens.spacingVerticalS;
const largeSpacingVertical = tokens.spacingVerticalMNudge;

const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground3,
    [`& .${tabClassNames.content}`]: { color: 'inherit' },

    ':enabled:hover': {
      color: tokens.colorNeutralForeground1Hover,
      [`& .${iconFilledClassName}`]: { display: 'inline' },
      [`& .${iconRegularClassName}`]: { display: 'none' },
      [`& .${tabClassNames.icon}`]: { color: 'inherit' },
      [`& .${tabClassNames.content}`]: { color: 'inherit' },
    },

    ':enabled:active': {
      color: tokens.colorNeutralForeground1Pressed,
      [`& .${tabClassNames.icon}`]: { color: 'inherit' },
      [`& .${tabClassNames.content}`]: { color: 'inherit' },
    },

    ...createCustomFocusIndicatorStyle({
      boxShadow: `
        0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2},
        0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeOnBrand} inset
      `,
    }),
  },

  small: {
    columnGap: tokens.spacingHorizontalXS,
    padding: `${smallSpacingVertical} ${tokens.spacingHorizontalMNudge}`,
  },
  medium: { padding: `${mediumSpacingVertical} ${tokens.spacingHorizontalM}` },
  large: {
    columnGap: tokens.spacingHorizontalS,
    padding: `${largeSpacingVertical} ${tokens.spacingHorizontalL}`,
  },

  selected: {
    color: tokens.colorNeutralForeground1,
    [`& .${tabClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1,
    },
    ':enabled:hover': {
      color: tokens.colorNeutralForeground1Hover,
      [`& .${tabClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':enabled:active': {
      color: tokens.colorNeutralForeground1Pressed,
      [`& .${tabClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    [`& .${tabClassNames.icon}`]: { color: 'inherit' },
  },
});

const useRootIconOnlyStyles = makeStyles({
  small: { padding: `${smallSpacingVertical} ${tokens.spacingHorizontalS}` },
  medium: {
    padding: `${mediumSpacingVertical} ${tokens.spacingHorizontalMNudge}`,
  },
  large: { padding: `${largeSpacingVertical} 14px` },
});

const useRootTextAndIconStyles = makeStyles({
  // Asymmetrical spacing is intentional
  small: { paddingLeft: tokens.spacingHorizontalS },
  medium: { paddingLeft: tokens.spacingHorizontalMNudge },
  large: { paddingLeft: '14px' },
});

const useCircularStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThin} solid ${capTokens.colorNeutralStroke4}`,
    ':enabled:hover': {
      border: `${tokens.strokeWidthThin} solid ${capTokens.colorNeutralStroke4Hover}`,
    },
    ':enabled:active': {
      border: `${tokens.strokeWidthThin} solid ${capTokens.colorNeutralStroke4Pressed}`,
    },
  },

  // Follow Fluent
  small: {
    paddingBlock: `calc(${smallSpacingVertical} - ${tokens.strokeWidthThin})`,
  },
  medium: {
    paddingBlock: `calc(${mediumSpacingVertical} - ${tokens.strokeWidthThin})`,
  },
  large: {
    paddingBlock: `calc(${largeSpacingVertical} - ${tokens.strokeWidthThin})`,
  },

  selected: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorCompoundBrandStroke}`,
    ':enabled:hover': {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorCompoundBrandStrokeHover}`,
    },
    ':enabled:active': {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorCompoundBrandStrokePressed}`,
    },
  },
  disabled: {
    border: `solid ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeDisabled}`,
  },
});

const useUnderlineStyles = makeStyles({
  root: {
    ...createCustomFocusIndicatorStyle({
      borderRadius: capTokens.borderRadius2XLarge,
    }),
    [`& .${tabClassNames.icon}`]: { color: 'inherit' },
  },
});

const useSubtleStyles = makeStyles({
  root: {
    ':enabled:hover': { backgroundColor: tokens.colorNeutralBackground3Hover },
    ':enabled:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
    },
  },
  selected: {
    background: tokens.colorTransparentBackground,
    ':enabled:hover': { backgroundColor: tokens.colorTransparentBackground },
    ':enabled:active': { backgroundColor: tokens.colorTransparentBackground },
  },
});

const useIndicatorStyles = makeStyles({
  vertical: {
    // Align same as horizontal
    '::before': {
      bottom: 0,
      top: 'unset',
      height: tokens.strokeWidthThicker,
      width: 'unset',
    },
    '::after': {
      bottom: 0,
      top: 'unset',
      height: tokens.strokeWidthThicker,
      width: 'unset',
    },
  },
  small: {
    '::before': {
      left: tokens.spacingHorizontalS,
      right: tokens.spacingHorizontalS,
    },
    '::after': {
      left: tokens.spacingHorizontalS,
      right: tokens.spacingHorizontalS,
    },
  },
  medium: {
    '::before': {
      left: tokens.spacingHorizontalMNudge,
      right: tokens.spacingHorizontalMNudge,
    },
    '::after': {
      left: tokens.spacingHorizontalMNudge,
      right: tokens.spacingHorizontalMNudge,
    },
  },
  large: {
    '::before': { left: '14px', right: '14px' },
    '::after': { left: '14px', right: '14px' },
  },
  smallVertical: {
    '::before': { height: tokens.strokeWidthThick },
    '::after': { height: tokens.strokeWidthThick },
  },
  mediumVertical: {
    /* Same as vertical */
  },
  largeVertical: {
    /* Same as vertical */
  },
});

const useIconStyles = makeStyles({
  small: {
    fontSize: tokens.fontSizeBase400,
    height: '16px',
    width: '16px',
  },
  medium: {
    /* Same as Fluent */
  },
  large: {
    /* Same as Fluent */
  },
});

const useContentStyles = makeStyles({
  base: { padding: 0 }, // override Fluent
  small: { ...typographyStyles.caption1Strong },
  medium: { ...typographyStyles.body1Strong },
  large: { ...typographyStyles.subtitle2 },
});

/**
 * Applies styles for the Tab indicator based on its current state.
 * @param state - The `Tab` component's current state
 * @returns The state object with updated button styles
 * @alpha
 */
export const useTabIndicatorStyles_unstable = (state: TabState): TabState => {
  const indicatorStyles = useIndicatorStyles();

  const { appearance, size, vertical } = state;
  const isCircular = appearance?.includes('-circular');

  state.root.className = mergeClasses(
    state.root.className,
    !isCircular && vertical && indicatorStyles.vertical,
    !isCircular && indicatorStyles[size],
    !isCircular && vertical && indicatorStyles[`${size}Vertical`],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};

/**
 * Applies styles to the Tab button slot based on its current state.
 * @param state - The Tab component state object.
 * @param slot - The button slot of the Tab component
 * @returns The updated state object with applied button styles.
 * @alpha
 */
export const useTabButtonStyles_unstable = (
  state: TabState,
  slot: TabState['root']
): TabState => {
  const styles = useStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const rootTextAndIconStyles = useRootTextAndIconStyles();
  const circularStyles = useCircularStyles();
  const underlineStyles = useUnderlineStyles();
  const subtleStyles = useSubtleStyles();

  const { appearance, disabled, iconOnly, selected, size } = state;
  const isCircular = appearance?.includes('-circular');
  const isSubtle = appearance?.includes('subtle');
  const isTextAndIcon = !!state.root.children && state.icon;

  slot.className = mergeClasses(
    slot.className,
    styles.root,
    isCircular ? circularStyles.root : underlineStyles.root,

    styles[size],
    iconOnly && rootIconOnlyStyles[size],
    isTextAndIcon && rootTextAndIconStyles[size],
    isCircular && circularStyles[size],

    isSubtle && subtleStyles.root,

    selected && styles.selected,
    selected && isCircular && circularStyles.selected,
    selected && isSubtle && subtleStyles.selected,

    disabled && styles.disabled,
    disabled && isCircular && circularStyles.disabled,
    getSlotClassNameProp_unstable(slot)
  );

  return state;
};

/**
 * Applies styles to the Tab content and icon slots based on its current state.
 * @param state - The Tab component state object.
 * @returns The updated state object with applied styles.
 * @alpha
 */
export const useTabContentStyles_unstable = (state: TabState): TabState => {
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();
  const { size } = state;

  state.content.className = mergeClasses(
    state.content.className,
    contentStyles.base,
    contentStyles[size]
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  return state;
};

/**
 * Applies styles to the Tab component.
 * @param state - The Tab component state object.
 * @returns The updated state object with applied styles.
 * @alpha
 */
export const useTabStyles = (state: TabState): TabState => {
  useTabIndicatorStyles_unstable(state);
  useTabButtonStyles_unstable(state, state.root);
  useTabContentStyles_unstable(state);
  return state;
};

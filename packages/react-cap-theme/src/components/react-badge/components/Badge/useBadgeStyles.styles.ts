import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BadgeSlots, BadgeState } from './Badge.types';
import { useBadgeStyles_unstable } from '@fluentui/react-badge';
import { tokens, typographyStyles } from '../../../tokens/index';

/**
 * CSS class names for the Badge component slots.
 * @alpha
 */
export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon'
};

// The text content of the badge has additional horizontal padding, but there is no `text` slot to add that padding to.
// Instead, add extra padding to the root, and a negative margin on the icon to "remove" the extra padding on the icon.
const textPadding = tokens.spacingHorizontalXXS;
const useRootStyles = makeStyles({
  tiny: {},
  'extra-small': {},
  small: {
    padding: `${tokens.spacingVerticalXXS} calc(${tokens.spacingHorizontalXS} + ${textPadding})`
  },
  medium: {
    ...typographyStyles.caption1Strong,
    padding: `${tokens.spacingVerticalXS} calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
    gap: tokens.spacingHorizontalXXS
  },
  large: {
    padding: `${tokens.spacingVerticalXS} calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
    gap: tokens.spacingHorizontalXXS
  },
  'extra-large': {
    ...typographyStyles.body1Strong,
    padding: `${tokens.spacingVerticalSNudge} calc(${tokens.spacingHorizontalS} + ${textPadding})`,
    gap: tokens.spacingHorizontalXS
  },

  // appearance: filled
  'filled-brand': {
    // Same as default
  },
  'filled-danger': {
    backgroundColor: tokens.colorStatusDangerBackground3,
    color: tokens.colorNeutralForegroundOnBrand
  },
  'filled-important': {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundOnBrand
  },
  'filled-informative': {
    // Same as default
  },
  'filled-severe': {},
  'filled-subtle': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3
  },
  'filled-success': {
    backgroundColor: tokens.colorStatusSuccessBackground3
  },
  'filled-warning': {
    backgroundColor: tokens.colorStatusWarningBackground3,
    color: tokens.colorNeutralForegroundOnBrand
  },

  // appearance: tint
  'tint-brand': {
    color: tokens.colorCompoundBrandBackground
  },
  'tint-danger': {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorStatusDangerForeground1,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1)
  },
  'tint-important': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1)
  },
  'tint-informative': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1)
  },
  'tint-severe': {},
  'tint-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1)
  },
  'tint-success': {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1)
  },
  'tint-warning': {
    backgroundColor: tokens.colorStatusWarningBackground1,
    color: tokens.colorStatusWarningForeground2,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1)
  },

  // appearance: outline
  'outline-brand': {
    color: tokens.colorCompoundBrandBackground,
    ...shorthands.borderColor(tokens.colorBrandStroke2)
  },
  'outline-danger': {
    color: tokens.colorStatusDangerForeground3,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1)
  },
  'outline-important': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1)
  },
  'outline-informative': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1)
  },
  'outline-severe': {},
  'outline-subtle': {
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand2)
  },
  'outline-success': {
    color: tokens.colorStatusSuccessForeground3,
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1)
  },
  'outline-warning': {
    color: tokens.colorStatusWarningForeground2,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1)
  },

  // appearance: ghost
  'ghost-brand': {
    color: tokens.colorCompoundBrandForeground1
  },
  'ghost-danger': {
    color: tokens.colorStatusDangerForeground3
  },
  'ghost-important': {
    color: tokens.colorNeutralForeground3
  },
  'ghost-informative': {},
  'ghost-severe': {},
  'ghost-subtle': {
    color: tokens.colorNeutralForegroundOnBrand
  },
  'ghost-success': {
    color: tokens.colorStatusSuccessForeground3
  },
  'ghost-warning': {
    color: tokens.colorStatusWarningForeground2
  }
});

const useIconRootClassName = makeResetStyles({
  margin: `0 calc(-1 * ${textPadding})` // Remove text padding added to root
});

const useIconStyles = makeStyles({
  beforeText: { marginRight: textPadding },
  afterText: { marginLeft: textPadding }
});

const useIconOnlyStlyles = makeStyles({
  tiny: {
    /* no styling applied */
  },
  'extra-small': {
    /* no styling applied */
  },
  small: { padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}` },
  medium: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}` },
  large: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}` },
  'extra-large': {
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`
  }
});

/**
 * Apply styling to the Badge slots based on the state
 * @param state - The current Badge state
 * @returns The updated Badge state with applied styles
 * @alpha
 */
export const useBadgeStyles = (state: BadgeState): BadgeState => {
  const rootStyles = useRootStyles();

  const { appearance } = state;

  // Icon only
  const iconOnly: boolean = state.root.children === undefined && state.icon !== undefined;
  const iconRootClassName = useIconRootClassName();

  const iconOnlyClassName = useIconOnlyStlyles();
  const iconClassName = useIconStyles();

  // Apply our custom styles on top
  state.root.className = mergeClasses(
    badgeClassNames.root,
    rootStyles[state.size],
    iconOnly && iconOnlyClassName[state.size],
    rootStyles[`${appearance}-${state.color}`],
    state.root.className
  );

  if (state.icon) {
    const iconPositionClass =
      state.iconPosition === 'before' ? iconClassName.beforeText : iconClassName.afterText;

    state.icon.className = mergeClasses(
      badgeClassNames.icon,
      iconRootClassName,
      !iconOnly && iconPositionClass,
      state.icon.className
    );
  }

  useBadgeStyles_unstable({ ...state, shape: 'circular' });

  return state;
};

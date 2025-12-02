import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  type BadgeState,
  useBadgeStyles_unstable,
} from '@fluentui/react-components';

import { CAP_TOKENS } from '../../theme/CAPTheme';

const textPadding = tokens.spacingHorizontalXXS;

export const useBadgeStyles = makeStyles({
  root: {
    padding: `0 calc(${CAP_TOKENS['cap/badge-m/padding']} + ${textPadding})`,
  },

  tiny: {
    padding: 'unset',
  },

  'extra-small': {
    padding: 'unset',
  },

  small: {
    padding: `0 calc(${CAP_TOKENS['cap/badge-s/padding']} + ${textPadding})`,
  },

  medium: {
    // Set by root
  },

  large: {
    padding: `0 calc(${CAP_TOKENS['cap/badge-l/padding']} + ${textPadding})`,
  },

  'extra-large': {
    padding: `0 calc(${CAP_TOKENS['cap/badge-xl/padding']} + ${textPadding})`,
  },

  // shape
  'rounded-extra-large': {
    borderRadius: CAP_TOKENS['cap/badge-xl/corner-rounded'],
  },
  'rounded-large': { borderRadius: CAP_TOKENS['cap/badge-l/corner-rounded'] },

  'outline-brand': {
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/brand/outlined/stroke']),
  },
  'outline-warning': {
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/warning/outlined/stroke']),
  },
  'outline-important': {
    ...shorthands.borderColor(
      CAP_TOKENS['cap/badge/important/outlined/stroke']
    ),
  },
  'outline-danger': {
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/danger/outlined/stroke']),
  },
  'outline-success': {
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/success/outlined/stroke']),
  },
  'outline-informative': {
    ...shorthands.borderColor(
      CAP_TOKENS['cap/badge/informative/outlined/stroke']
    ),
  },
  'outline-subtle': {
    color: CAP_TOKENS['cap/badge/subtle/outlined/foreground'],
    ...shorthands.borderColor(
      CAP_TOKENS['cap/badge/subtle/outlined/foreground']
    ),
  },

  'tint-brand': {
    color: CAP_TOKENS['cap/badge/brand/tint/foreground'],
  },

  'ghost-brand': {
    color: CAP_TOKENS['cap/badge/brand/ghost/foreground'],
  },

  'filled-warning': {
    color: CAP_TOKENS['cap/badge/warning/filled/foreground'],
    backgroundColor: CAP_TOKENS['cap/badge/warning/filled/background'],
  },

  'tint-informative': {
    backgroundColor: CAP_TOKENS['cap/badge/informative/tint/background'],
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/informative/tint/stroke']),
  },

  'filled-important': {
    backgroundColor: CAP_TOKENS['cap/badge/important/filled/background'],
    color: CAP_TOKENS['cap/badge/important/filled/foreground'],
  },

  'tint-important': {
    backgroundColor: CAP_TOKENS['cap/badge/important/tint/background'],
    color: CAP_TOKENS['cap/badge/important/tint/foreground'],
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/important/tint/stroke']),
  },

  'filled-subtle': {
    color: CAP_TOKENS['cap/badge/subtle/filled/foreground'],
    backgroundColor: CAP_TOKENS['cap/badge/subtle/filled/background'],
  },

  'tint-subtle': {
    ...shorthands.borderColor(CAP_TOKENS['cap/badge/subtle/tint/stroke']),
  },
});

const useBadgeIconStyles = makeStyles({
  beforeTextSmall: {
    // Should use calc(${CAP_TOKENS['cap/badge-s/gap']}px + ${textPadding}) but for some reason it is not working
    // as CAP_TOKENS['cap/badge-s/gap'] points to '0' instead of '0px'
    marginRight: textPadding,
  },
  afterTextSmall: {
    // Should use calc(${CAP_TOKENS['cap/badge-s/gap-toSecondaryIcon']}px + ${textPadding}) but for some reason it is not working
    // as CAP_TOKENS['cap/badge-s/gap-toSecondaryIcon'] points to '0' instead of '0px'
    marginLeft: textPadding,
  },
});

export function useBadgeStylesHook(state: BadgeState): BadgeState {
  // Apply base Badge styles first
  useBadgeStyles_unstable(state);

  // Then override with CAP styles
  const styles = useBadgeStyles();
  const iconStyles = useBadgeIconStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[state.size],
    state.shape === 'rounded' &&
      `rounded-${state.size}` in styles &&
      styles[`rounded-${state.size}` as keyof typeof styles],
    `${state.appearance}-${state.color}` in styles &&
      styles[`${state.appearance}-${state.color}` as keyof typeof styles]
  );

  // Override icon spacing for small size
  if (state.icon && state.size === 'small') {
    const iconPositionClass =
      state.iconPosition === 'after'
        ? iconStyles.afterTextSmall
        : iconStyles.beforeTextSmall;
    state.icon.className = mergeClasses(
      state.icon.className,
      iconPositionClass
    );
  }

  return state;
}

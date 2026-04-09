import type { BadgeState } from '@fluentui/react-badge';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '../../../tokens';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

const badgeSpacingAsymmetryVar = '--fui-Badge--spacing-asymmetry';

const useRootSizeStyles = makeStyles({
  tiny: {},
  'extra-small': {},
  small: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    [badgeSpacingAsymmetryVar]: tokens.spacingHorizontalXXS,
  },
  medium: {
    ...typographyStyles.caption1Strong,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    [badgeSpacingAsymmetryVar]: tokens.spacingHorizontalXS,
  },
  large: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    [badgeSpacingAsymmetryVar]: tokens.spacingHorizontalXS,
  },
  'extra-large': {
    ...typographyStyles.body1Strong,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
    [badgeSpacingAsymmetryVar]: tokens.spacingHorizontalSNudge,
  },
});

const useRootShapeStyles = makeStyles({
  circular: {},

  'rounded-tiny': { borderRadius: tokens.borderRadiusSmall },
  'rounded-extra-small': { borderRadius: tokens.borderRadiusSmall },
  'rounded-small': { borderRadius: tokens.borderRadiusSmall },
  'rounded-medium': { borderRadius: tokens.borderRadiusMedium },
  'rounded-large': { borderRadius: tokens.borderRadiusLarge },
  'rounded-extra-large': { borderRadius: tokens.borderRadiusXLarge },

  square: { borderRadius: tokens.borderRadiusSmall },
});

const useRootAppearanceStyles = makeStyles({
  'filled-brand': {
    // Same as default
  },
  'filled-danger': {
    backgroundColor: tokens.colorStatusDangerBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-important': {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
  },
  'filled-informative': {
    // Same as fluent
  },
  'filled-severe': {
    backgroundColor: tokens.colorPaletteDarkRedBackground2,
  },
  'filled-subtle': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  'filled-success': {
    backgroundColor: tokens.colorStatusSuccessBackground3,
  },
  'filled-warning': {
    backgroundColor: tokens.colorStatusWarningBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },

  'tint-brand': {
    color: tokens.colorCompoundBrandForeground1,
  },
  'tint-danger': {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorStatusDangerForeground1,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1),
  },
  'tint-important': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'tint-informative': {
    backgroundColor: tokens.colorNeutralBackground5,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'tint-severe': {
    backgroundColor: tokens.colorPaletteDarkRedBackground2,
    color: tokens.colorPaletteDarkRedForeground2,
    ...shorthands.borderColor(tokens.colorPaletteDarkRedBorderActive),
  },
  'tint-subtle': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'tint-success': {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1),
  },
  'tint-warning': {
    backgroundColor: tokens.colorStatusWarningBackground1,
    color: tokens.colorStatusWarningForeground2,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1),
  },

  'outline-brand': {
    color: tokens.colorCompoundBrandForeground1,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'outline-danger': {
    color: tokens.colorStatusDangerForeground3,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1),
  },
  'outline-important': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'outline-informative': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'outline-severe': {
    color: tokens.colorPaletteDarkRedForeground2,
    ...shorthands.borderColor(tokens.colorPaletteDarkRedBorderActive),
  },
  'outline-subtle': {
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand2),
  },
  'outline-success': {
    color: tokens.colorStatusSuccessForeground3,
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1),
  },
  'outline-warning': {
    color: tokens.colorStatusWarningForeground2,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1),
  },

  'ghost-brand': {
    color: tokens.colorCompoundBrandForeground1,
  },
  'ghost-danger': {
    color: tokens.colorStatusDangerForeground3,
  },
  'ghost-important': {
    color: tokens.colorNeutralForeground3,
  },
  'ghost-informative': {
    // Same as fluent
  },
  'ghost-severe': {
    color: tokens.colorPaletteDarkRedForeground2,
  },
  'ghost-subtle': {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'ghost-success': {
    color: tokens.colorStatusSuccessForeground3,
  },
  'ghost-warning': {
    color: tokens.colorStatusWarningForeground2,
  },
});

const useRootTextAndIconStyles = makeStyles({
  before: { paddingLeft: `var(${badgeSpacingAsymmetryVar})` },
  after: { paddingRight: `var(${badgeSpacingAsymmetryVar})` },
});

const useIconStyles = makeStyles({
  base: {
    marginLeft: '0',
    marginRight: '0',
  },
  before: { marginRight: `var(${badgeSpacingAsymmetryVar})` },
  after: { marginLeft: `var(${badgeSpacingAsymmetryVar})` },
});

const useIconOnlyStyles = makeStyles({
  tiny: {},
  'extra-small': {},
  small: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
  },
  medium: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
  },
  large: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
  },
  'extra-large': {
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
});

export const useBadgeStyles = (state: BadgeState): BadgeState => {
  const rootSizeStyles = useRootSizeStyles();
  const rootShapeStyles = useRootShapeStyles();
  const rootAppearanceStyles = useRootAppearanceStyles();
  const rootTextAndIconStyles = useRootTextAndIconStyles();
  const iconStyles = useIconStyles();
  const iconOnlyClassName = useIconOnlyStyles();

  const { appearance, iconPosition, shape, size } = state;

  const iconOnly: boolean =
    state.root.children === undefined && state.icon !== undefined;
  const isTextAndIcon = !!state.root.children && state.icon;

  const shapeClassKey = shape === 'rounded' ? `${shape}-${size}` : shape;

  state.root.className = mergeClasses(
    state.root.className,
    rootShapeStyles[shapeClassKey as keyof typeof rootShapeStyles],
    rootSizeStyles[size],
    iconOnly && iconOnlyClassName[size],
    isTextAndIcon && rootTextAndIconStyles[iconPosition],
    rootAppearanceStyles[`${appearance}-${state.color}`],
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconStyles.base,
      !!state.root.children && iconStyles[iconPosition],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  return state;
};

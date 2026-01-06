import type {
  BadgeProps as FluentBadgeProps,
  BadgeState as BaseBadgeState,
  BadgeSlots as FluentBadgeSlots
} from '@fluentui/react-badge';

/**
 * Properties for the ProjectTurtle Badge component.
 * @alpha
 */
export type BadgeProps = Omit<FluentBadgeProps, 'shape'>;
export type BadgeSlots = FluentBadgeSlots;

/**
 * State used in rendering the ProjectTurtle Badge component.
 * @alpha
 */
export type BadgeState = Omit<BaseBadgeState, 'shape'>;

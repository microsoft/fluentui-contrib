import type {
  AvatarGroupPopoverProps as FluentAvatarGroupPopoverProps,
  AvatarGroupPopoverSlots as FluentAvatarGroupPopoverSlots,
  AvatarGroupPopoverState as FluentAvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import type { PopoverSurface } from '@fluentui/react-popover';
import type { TooltipProps } from '@fluentui/react-tooltip';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';

export type AvatarGroupPopoverSlots = Omit<
  FluentAvatarGroupPopoverSlots,
  'popoverSurface' | 'tooltip'
> & {
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;
  tooltip: NonNullable<Slot<TooltipProps>>;
};

export type AvatarGroupPopoverProps = Omit<
  ComponentProps<Partial<AvatarGroupPopoverSlots>>,
  'children'
> &
  Pick<FluentAvatarGroupPopoverProps, 'indicator' | 'count' | 'children'>;

export type AvatarGroupPopoverState = ComponentState<AvatarGroupPopoverSlots> &
  Pick<
    FluentAvatarGroupPopoverState,
    'indicator' | 'count' | 'popoverOpen' | 'layout' | 'size'
  >;

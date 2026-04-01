import type {
  AvatarGroupPopoverProps as FluentAvatarGroupPopoverProps,
  AvatarGroupPopoverSlots as FluentAvatarGroupPopoverSlots,
  AvatarGroupPopoverState as FluentAvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { PopoverSurface } from '../../../react-popover';
import type { TooltipProps } from '../../../react-tooltip';

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

import type {
  AvatarGroupItemSlots as FluentAvatarGroupItemSlots,
  AvatarGroupItemState as FluentAvatarGroupItemState,
  Avatar,
} from '@fluentui/react-avatar';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';

export type AvatarGroupItemSlots = Omit<
  FluentAvatarGroupItemSlots,
  'avatar'
> & {
  avatar: NonNullable<Slot<typeof Avatar>>;
};

export type AvatarGroupItemProps = Omit<
  ComponentProps<Partial<AvatarGroupItemSlots>, 'avatar'>,
  'size' | 'shape'
>;

export type AvatarGroupItemState = ComponentState<AvatarGroupItemSlots> &
  Pick<FluentAvatarGroupItemState, 'isOverflowItem' | 'layout' | 'size'>;

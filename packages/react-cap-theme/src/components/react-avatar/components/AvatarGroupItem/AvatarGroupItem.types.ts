import type {
  AvatarGroupItemSlots as FluentAvatarGroupItemSlots,
  AvatarGroupItemState as FluentAvatarGroupItemState,
} from '@fluentui/react-avatar';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { Avatar } from '../Avatar/Avatar';

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

import { useAvatarGroupItem_unstable, Avatar } from '@fluentui/react-avatar';
import { slot } from '@fluentui/react-utilities';
import type {
  AvatarGroupItemProps,
  AvatarGroupItemState,
} from './AvatarGroupItem.types';

export const useAvatarGroupItem = (
  props: AvatarGroupItemProps,
  ref: React.Ref<HTMLElement>
): AvatarGroupItemState => {
  const state = useAvatarGroupItem_unstable(props, ref);
  const { size } = state;

  const { style, className, overflowLabel, ...avatarSlotProps } = props;
  void style;
  void className;
  void overflowLabel;

  const avatar = slot.always(props.avatar, {
    defaultProps: {
      ref,
      size,
      color: 'colorful',
      ...avatarSlotProps,
    },
    elementType: Avatar,
  });

  return {
    ...state,
    components: { ...state.components, avatar: Avatar },
    avatar,
  };
};

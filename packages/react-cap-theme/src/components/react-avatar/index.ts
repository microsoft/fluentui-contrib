export {
  avatarClassNames,
  AvatarContextProvider,
  AvatarGroup,
  avatarGroupClassNames,
  avatarGroupItemClassNames,
  avatarGroupPopoverClassNames,
  AvatarGroupProvider,
  getInitials,
  partitionAvatarGroupItems,
  renderAvatar_unstable as renderAvatar,
  renderAvatarGroup_unstable as renderAvatarGroup,
  renderAvatarGroupItem_unstable as renderAvatarGroupItem,
  renderAvatarGroupPopover_unstable as renderAvatarGroupPopover,
  useAvatar_unstable as useAvatar,
  useAvatarContext,
  useAvatarGroup_unstable as useAvatarGroup,
  useAvatarGroupContext_unstable as useAvatarGroupContext,
  useAvatarGroupContextValues,
  useAvatarGroupPopoverContextValues_unstable as useAvatarGroupPopoverContextValues,
  useAvatarGroupStyles_unstable as useAvatarGroupStyles,
} from '@fluentui/react-avatar';
export type {
  AvatarContextValue,
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  AvatarGroupProps,
  AvatarGroupSlots,
  AvatarGroupState,
  AvatarNamedColor,
  AvatarProps,
  AvatarShape,
  AvatarSize,
  AvatarSizes,
  AvatarSlots,
  AvatarState,
  PartitionAvatarGroupItems,
  PartitionAvatarGroupItemsOptions,
} from '@fluentui/react-avatar';

export { Avatar } from './components/Avatar/Avatar';
export { useAvatarStyles } from './components/Avatar/useAvatarStyles.styles';

export { AvatarGroupItem } from './components/AvatarGroupItem/AvatarGroupItem';
export type {
  AvatarGroupItemProps,
  AvatarGroupItemSlots,
  AvatarGroupItemState,
} from './components/AvatarGroupItem/AvatarGroupItem.types';
export { useAvatarGroupItem } from './components/AvatarGroupItem/useAvatarGroupItem';
export { useAvatarGroupItemStyles } from './components/AvatarGroupItem/useAvatarGroupItemStyles.styles';

export { AvatarGroupPopover } from './components/AvatarGroupPopover/AvatarGroupPopover';
export type {
  AvatarGroupPopoverProps,
  AvatarGroupPopoverSlots,
  AvatarGroupPopoverState,
} from './components/AvatarGroupPopover/AvatarGroupPopover.types';
export { useAvatarGroupPopover } from './components/AvatarGroupPopover/useAvatarGroupPopover';
export { useAvatarGroupPopoverStyles } from './components/AvatarGroupPopover/useAvatarGroupPopoverStyles.styles';

// Experimental Avatar Components
// WARNING: These are experimental and may have breaking changes without notice

export {
  AvatarContextProvider,
  getInitials,
  partitionAvatarGroupItems,
  useAvatarContext
} from '@fluentui/react-avatar';
export type {
  AvatarContextValue,
  PartitionAvatarGroupItems,
  PartitionAvatarGroupItemsOptions
} from '@fluentui/react-avatar';

export { Avatar, avatarClassNames, renderAvatar, useAvatar, useAvatarStyles, useSizeStyles } from './Avatar';
export type {
  AvatarNamedColor,
  AvatarProps,
  AvatarShape,
  AvatarSize,
  AvatarSlots,
  AvatarState
} from './Avatar';
export {
  AvatarGroup,
  AvatarGroupProvider,
  avatarGroupClassNames,
  renderAvatarGroup,
  useAvatarGroup,
  useAvatarGroupContext,
  useAvatarGroupContextValues,
  useAvatarGroupStyles
} from './AvatarGroup';
export type {
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  AvatarGroupProps,
  AvatarGroupSlots,
  AvatarGroupState
} from './AvatarGroup';
export {
  AvatarGroupItem,
  avatarGroupItemClassNames,
  renderAvatarGroupItem,
  useAvatarGroupItem,
  useAvatarGroupItemStyles
} from './AvatarGroupItem';
export type { AvatarGroupItemProps, AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem';
export {
  AvatarGroupPopover,
  avatarGroupPopoverClassNames,
  renderAvatarGroupPopover,
  useAvatarGroupPopover,
  useAvatarGroupPopoverContextValues,
  useAvatarGroupPopoverStyles
} from './AvatarGroupPopover';
export type {
  AvatarGroupPopoverProps,
  AvatarGroupPopoverSlots,
  AvatarGroupPopoverState
} from './AvatarGroupPopover';

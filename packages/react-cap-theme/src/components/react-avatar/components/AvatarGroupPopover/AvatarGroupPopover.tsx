import type * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import {
  renderAvatarGroupPopover_unstable,
  useAvatarGroupPopover_unstable,
  useAvatarGroupPopoverContextValues_unstable,
  useAvatarGroupPopoverStyles_unstable,
  type AvatarGroupPopoverProps
} from '@fluentui/react-avatar';

/**
 * AvatarGroupPopover displays overflow avatars in a popover.
 * @alpha
 */
export const AvatarGroupPopover: React.FC<AvatarGroupPopoverProps> = (props) => {
  const state = useAvatarGroupPopover_unstable(props);
  const contextValues = useAvatarGroupPopoverContextValues_unstable(state);
  useAvatarGroupPopoverStyles_unstable(state);
  useCustomStyleHook_unstable('useAvatarGroupPopoverStyles_unstable')(state);
  return renderAvatarGroupPopover_unstable(state, contextValues);
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';

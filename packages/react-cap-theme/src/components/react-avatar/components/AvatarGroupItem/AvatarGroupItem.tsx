import * as React from 'react';
import {
  renderAvatarGroupItem_unstable,
  useAvatarGroupItem_unstable,
  useAvatarGroupItemStyles_unstable,
  type AvatarGroupItemProps
} from '@fluentui/react-avatar';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * AvatarGroupItem represents a single avatar within an AvatarGroup.
 * @alpha
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupItem_unstable(props, ref);
  useAvatarGroupItemStyles_unstable(state);
  useCustomStyleHook_unstable('useAvatarGroupItemStyles_unstable')(state);
  return renderAvatarGroupItem_unstable(state);
});

AvatarGroupItem.displayName = 'AvatarGroupItem';

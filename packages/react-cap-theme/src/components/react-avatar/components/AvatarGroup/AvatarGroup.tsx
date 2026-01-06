import * as React from 'react';
import {
  renderAvatarGroup_unstable,
  useAvatarGroup_unstable,
  useAvatarGroupContextValues,
  useAvatarGroupStyles_unstable,
  type AvatarGroupProps
} from '@fluentui/react-avatar';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * AvatarGroup displays a group of avatars with overflow handling.
 * @alpha
 */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroup_unstable(props, ref);
  const contextValues = useAvatarGroupContextValues(state);
  useAvatarGroupStyles_unstable(state);
  useCustomStyleHook_unstable('useAvatarGroupStyles_unstable')(state);
  return renderAvatarGroup_unstable(state, contextValues);
});

AvatarGroup.displayName = 'AvatarGroup';

import {
  renderAvatarGroupPopover_unstable,
  useAvatarGroupPopoverContextValues_unstable,
  type AvatarGroupPopoverState as FluentAvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type * as React from 'react';
import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';
import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverStyles } from './useAvatarGroupPopoverStyles.styles';

export const AvatarGroupPopover: React.FC<AvatarGroupPopoverProps> = (
  props
) => {
  const state = useAvatarGroupPopover(props);
  const contextValues = useAvatarGroupPopoverContextValues_unstable(
    state as FluentAvatarGroupPopoverState
  );

  useAvatarGroupPopoverStyles(state);
  useCustomStyleHook_unstable('useAvatarGroupPopoverStyles_unstable')(state);

  return renderAvatarGroupPopover_unstable(
    state as FluentAvatarGroupPopoverState,
    contextValues
  );
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';

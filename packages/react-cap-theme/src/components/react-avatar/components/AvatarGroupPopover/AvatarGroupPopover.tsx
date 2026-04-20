import {
  renderAvatarGroupPopover_unstable,
  useAvatarGroupPopoverContextValues_unstable,
  type AvatarGroupPopoverState as FluentAvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import type * as React from 'react';
import { useAvatarGroupPopoverStyles_unstable } from '@fluentui/react-components';
import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import type { AvatarGroupPopoverProps } from '../../../../customStyleHooks/react-avatar';
import { useAvatarGroupPopoverStyles as useCAPAvatarGroupPopoverStyles } from '../../../../customStyleHooks/react-avatar';

export const AvatarGroupPopover: React.FC<AvatarGroupPopoverProps> = (
  props
) => {
  const state = useAvatarGroupPopover(props);
  const baseState = state as unknown as FluentAvatarGroupPopoverState;
  const contextValues = useAvatarGroupPopoverContextValues_unstable(baseState);

  useAvatarGroupPopoverStyles_unstable(baseState);
  useCAPAvatarGroupPopoverStyles(state);

  return renderAvatarGroupPopover_unstable(baseState, contextValues);
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';

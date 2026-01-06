import * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderAvatar } from './renderAvatar';
import type { AvatarProps } from '@fluentui/react-avatar';
import { useAvatarStyles } from './useAvatarStyles.styles';
import { useAvatar } from './useAvatar';

/**
 * An Avatar is a graphical representation of a user, team, or entity.
 * @alpha
 */
export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  const state = useAvatar(props, ref);
  useAvatarStyles(state);
  useCustomStyleHook_unstable('useAvatarStyles_unstable')(state);
  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';

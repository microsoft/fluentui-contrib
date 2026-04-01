import {
  renderAvatar_unstable,
  useAvatar_unstable,
  type AvatarProps,
} from '@fluentui/react-avatar';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAvatarStyles } from './useAvatarStyles.styles';

export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef(
  (props, ref) => {
    const state = useAvatar_unstable(props, ref);

    useAvatarStyles(state);
    useCustomStyleHook_unstable('useAvatarStyles_unstable')(state);

    return renderAvatar_unstable(state);
  }
);

Avatar.displayName = 'Avatar';

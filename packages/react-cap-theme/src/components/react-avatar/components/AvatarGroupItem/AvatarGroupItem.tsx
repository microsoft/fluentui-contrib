import { renderAvatarGroupItem_unstable } from '@fluentui/react-avatar';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import { useAvatarGroupItem } from './useAvatarGroupItem';
import { useAvatarGroupItemStyles } from './useAvatarGroupItemStyles.styles';

export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> =
  React.forwardRef((props, ref) => {
    const state = useAvatarGroupItem(props, ref);

    useAvatarGroupItemStyles(state);
    useCustomStyleHook_unstable('useAvatarGroupItemStyles_unstable')(state);

    return renderAvatarGroupItem_unstable(state);
  });

AvatarGroupItem.displayName = 'AvatarGroupItem';

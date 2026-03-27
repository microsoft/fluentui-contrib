import {
  type MenuItemProps,
  renderMenuItem_unstable,
  useMenuItem_unstable,
} from '@fluentui/react-menu';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useMenuItemStyles } from './useMenuItemStyles.styles';

export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef(
  (props, ref) => {
    const state = useMenuItem_unstable(props, ref);

    useMenuItemStyles(state);
    useCustomStyleHook_unstable('useMenuItemStyles_unstable')(state);

    return renderMenuItem_unstable(state);
  }
);

MenuItem.displayName = 'MenuItem';

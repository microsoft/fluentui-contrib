import {
  renderMenuItemCheckbox_unstable,
  useMenuItemCheckbox_unstable,
  type MenuItemCheckboxProps,
} from '@fluentui/react-menu';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useMenuItemCheckboxStyles } from './useMenuItemCheckboxStyles.styles';

export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> =
  React.forwardRef((props, ref) => {
    const state = useMenuItemCheckbox_unstable(props, ref);

    useMenuItemCheckboxStyles(state);
    useCustomStyleHook_unstable('useMenuItemCheckboxStyles_unstable')(state);

    return renderMenuItemCheckbox_unstable(state);
  });

MenuItemCheckbox.displayName = 'MenuItemCheckbox';

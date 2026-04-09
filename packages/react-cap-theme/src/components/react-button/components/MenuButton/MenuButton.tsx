import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { MenuButtonProps } from './MenuButton.types';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles.styles';

export const MenuButton: ForwardRefComponent<MenuButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useMenuButton(props, ref);
    useMenuButtonStyles(state);
    useCustomStyleHook_unstable('useMenuButtonStyles_unstable')(state);
    return renderMenuButton(state);
  }) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';

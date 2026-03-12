import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ButtonState } from '../Button/Button.types';
import { toBaseState } from '../Button/Button.utils';
import type { MenuButtonProps } from './MenuButton.types';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles.styles';

export const MenuButton: ForwardRefComponent<MenuButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useMenuButton(props, ref);
    useButtonStyles_unstable(toBaseState(state as ButtonState));
    useMenuButtonStyles(state);
    return renderMenuButton(state);
  }) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';

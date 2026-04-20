import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles_unstable } from '@fluentui/react-components';
import { useMenuButtonStyles as useCAPMenuButtonStyles } from '../../../../customStyleHooks/react-button';
import type { MenuButtonProps } from '../../../../customStyleHooks/react-button';
import { toBaseState } from '../../utils/toBaseState';

export const MenuButton: ForwardRefComponent<MenuButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useMenuButton(props, ref);
    useMenuButtonStyles_unstable(toBaseState(state));
    useCAPMenuButtonStyles(state);
    return renderMenuButton(state);
  }) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';

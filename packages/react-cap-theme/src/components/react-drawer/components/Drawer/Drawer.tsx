import type { DrawerProps } from '@fluentui/react-drawer';
import {
  renderDrawer_unstable,
  useDrawerContextValue,
  useDrawerStyles_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawer } from './useDrawer';

export const Drawer: ForwardRefComponent<DrawerProps> = forwardRef(
  (props, ref) => {
    const state = useDrawer(props, ref);
    const contextValue = useDrawerContextValue();

    useDrawerStyles_unstable(state);
    useCustomStyleHook_unstable('useDrawerStyles_unstable')(state);

    return renderDrawer_unstable(state, contextValue);
  }
);

Drawer.displayName = 'Drawer';

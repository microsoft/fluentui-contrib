import type { DrawerHeaderNavigationProps } from '@fluentui/react-drawer';
import {
  renderDrawerHeaderNavigation_unstable,
  useDrawerHeaderNavigation_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawerHeaderNavigationStyles } from './useDrawerHeaderNavigationStyles.styles';

export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> =
  forwardRef((props, ref) => {
    const state = useDrawerHeaderNavigation_unstable(props, ref);

    useDrawerHeaderNavigationStyles(state);
    useCustomStyleHook_unstable('useDrawerHeaderNavigationStyles_unstable')(
      state
    );

    return renderDrawerHeaderNavigation_unstable(state);
  });

DrawerHeaderNavigation.displayName = 'DrawerHeaderNavigation';

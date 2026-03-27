import type { DrawerHeaderProps } from '@fluentui/react-drawer';
import {
  renderDrawerHeader_unstable,
  useDrawerHeader_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawerHeaderStyles } from './useDrawerHeaderStyles.styles';

export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = forwardRef(
  (props, ref) => {
    const state = useDrawerHeader_unstable(props, ref);

    useDrawerHeaderStyles(state);
    useCustomStyleHook_unstable('useDrawerHeaderStyles_unstable')(state);

    return renderDrawerHeader_unstable(state);
  }
);

DrawerHeader.displayName = 'DrawerHeader';

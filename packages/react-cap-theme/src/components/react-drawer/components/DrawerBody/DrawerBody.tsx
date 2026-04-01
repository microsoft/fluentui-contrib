import type { DrawerBodyProps } from '@fluentui/react-drawer';
import {
  renderDrawerBody_unstable,
  useDrawerBody_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawerBodyStyles } from './useDrawerBodyStyles.styles';

export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = forwardRef(
  (props, ref) => {
    const state = useDrawerBody_unstable(props, ref);

    useDrawerBodyStyles(state);
    useCustomStyleHook_unstable('useDrawerBodyStyles_unstable')(state);

    return renderDrawerBody_unstable(state);
  }
);

DrawerBody.displayName = 'DrawerBody';

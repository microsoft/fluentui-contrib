import type { DrawerHeaderTitleProps } from '@fluentui/react-drawer';
import {
  renderDrawerHeaderTitle_unstable,
  useDrawerHeaderTitle_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawerHeaderTitleStyles } from './useDrawerHeaderTitleStyles.styles';

export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> =
  forwardRef((props, ref) => {
    const state = useDrawerHeaderTitle_unstable(props, ref);

    useDrawerHeaderTitleStyles(state);
    useCustomStyleHook_unstable('useDrawerHeaderTitleStyles_unstable')(state);

    return renderDrawerHeaderTitle_unstable(state);
  });

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';

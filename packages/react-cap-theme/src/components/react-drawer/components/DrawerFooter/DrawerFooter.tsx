import type { DrawerFooterProps } from '@fluentui/react-drawer';
import {
  renderDrawerFooter_unstable,
  useDrawerFooter_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDrawerFooterStyles } from './useDrawerFooterStyles.styles';

export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = forwardRef(
  (props, ref) => {
    const state = useDrawerFooter_unstable(props, ref);

    useDrawerFooterStyles(state);
    useCustomStyleHook_unstable('useDrawerFooterStyles_unstable')(state);

    return renderDrawerFooter_unstable(state);
  }
);

DrawerFooter.displayName = 'DrawerFooter';

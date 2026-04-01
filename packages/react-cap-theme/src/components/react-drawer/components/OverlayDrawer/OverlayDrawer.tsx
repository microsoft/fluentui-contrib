import type { OverlayDrawerProps } from '@fluentui/react-drawer';
import {
  renderOverlayDrawer_unstable,
  useDrawerContextValue,
  useOverlayDrawer_unstable,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useOverlayDrawerStyles } from './useOverlayDrawerStyles.styles';

export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> =
  forwardRef((props, ref) => {
    const state = useOverlayDrawer_unstable(props, ref);
    const contextValue = useDrawerContextValue();

    useOverlayDrawerStyles(state);
    useCustomStyleHook_unstable('useOverlayDrawerStyles_unstable')(state);

    return renderOverlayDrawer_unstable(state, contextValue);
  });

OverlayDrawer.displayName = 'OverlayDrawer';

import {
  renderInlineDrawer_unstable,
  useDrawerContextValue,
} from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useInlineDrawer } from './useInlineDrawer';
import type { InlineDrawerProps } from '../../../../customStyleHooks/react-drawer';
import { useInlineDrawerStyles } from '../../../../customStyleHooks/react-drawer';

export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = forwardRef(
  (props, ref) => {
    const state = useInlineDrawer(props, ref);
    const contextValue = useDrawerContextValue();

    useInlineDrawerStyles(state);
    useCustomStyleHook_unstable('useInlineDrawerStyles_unstable')(state);

    return renderInlineDrawer_unstable(state, contextValue);
  }
);

InlineDrawer.displayName = 'InlineDrawer';

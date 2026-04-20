import {
  renderInlineDrawer_unstable,
  useDrawerContextValue,
  useInlineDrawerStyles_unstable,
} from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useInlineDrawer } from './useInlineDrawer';
import type { InlineDrawerProps } from '../../../../customStyleHooks/react-drawer';
import { useInlineDrawerStyles as useCAPInlineDrawerStyles } from '../../../../customStyleHooks/react-drawer';

export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = forwardRef(
  (props, ref) => {
    const state = useInlineDrawer(props, ref);
    const contextValue = useDrawerContextValue();

    useInlineDrawerStyles_unstable(state);
    useCAPInlineDrawerStyles(state);

    return renderInlineDrawer_unstable(state, contextValue);
  }
);

InlineDrawer.displayName = 'InlineDrawer';

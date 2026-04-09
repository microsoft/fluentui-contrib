import { useInlineDrawer_unstable } from '@fluentui/react-drawer';
import type * as React from 'react';
import type {
  InlineDrawerProps,
  InlineDrawerState,
} from './InlineDrawer.types';

export const useInlineDrawer = (
  props: InlineDrawerProps,
  ref: React.Ref<HTMLElement>
): InlineDrawerState => {
  const { appearance = 'solid' } = props;
  const state = useInlineDrawer_unstable(props, ref);
  return { ...state, appearance };
};

/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots, JSXElement } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollViewDynamic_unstable = (
  state: VirtualizerScrollViewDynamicState
): JSXElement => {
  assertSlots<VirtualizerScrollViewDynamicSlots>(state);
  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

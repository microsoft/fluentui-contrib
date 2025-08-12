import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollViewDynamic_unstable = (
  state: VirtualizerScrollViewDynamicState
) => {
  assertSlots<VirtualizerScrollViewDynamicSlots>(state);
  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

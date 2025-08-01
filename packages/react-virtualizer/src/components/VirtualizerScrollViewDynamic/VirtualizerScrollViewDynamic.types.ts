import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type {
  VirtualizerConfigProps,
  VirtualizerConfigState,
  VirtualizerChildRenderFunction,
} from '../Virtualizer/Virtualizer.types';

import type { VirtualizerScrollViewSlots } from '../VirtualizerScrollView/VirtualizerScrollView.types';
import type {
  DynamicVirtualizerContextProps,
  ScrollToInterface,
} from '../../Utilities';

export type VirtualizerScrollViewDynamicSlots = VirtualizerScrollViewSlots;

export type VirtualizerScrollViewDynamicProps = ComponentProps<
  Partial<VirtualizerScrollViewDynamicSlots>
> &
  Partial<
    Omit<
      VirtualizerConfigProps,
      | 'itemSize'
      | 'numItems'
      | 'getItemSize'
      | 'children'
      | 'flagIndex'
      | 'virtualizerContext'
    >
  > & {
    /**
     * Set as the minimum item size.
     * Axis: 'vertical' = Height
     * Axis: 'horizontal' = Width
     */
    itemSize: number;
    /**
     * Callback for acquiring size of individual items
     * @param index - the index of the requested size's child
     * If undefined, Virtualizer will auto-measure by default (performance tradeoff)
     */
    getItemSize?: (index: number) => number;
    /**
     * The total number of items to be virtualized.
     */
    numItems: number;
    /**
     * Child render function.
     * Iteratively called to return current virtualizer DOM children.
     * Will act as a row or column indexer depending on Virtualizer settings.
     */
    children: VirtualizerChildRenderFunction;
    /**
     * Imperative ref contains our scrollTo index functionality for user control.
     */
    imperativeRef?: React.RefObject<ScrollToInterface>;
    /**
     * Imperative ref contains our scrollTo index functionality for user control.
     */
    enablePagination?: boolean;
    /**
     * Enables override of dynamic virtualizer context if required.
     */
    virtualizerContext?: DynamicVirtualizerContextProps;
  };

export type VirtualizerScrollViewDynamicState =
  ComponentState<VirtualizerScrollViewDynamicSlots> & VirtualizerConfigState;

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
     * WARNING: These tools are not intended for items that shift in size during render
     * For more complex functionality, applications will need to handle their own scroll
     */
    imperativeRef?: React.RefObject<ScrollToInterface | null>;
    /**
     * Enable pagination will auto scroll to the top of the closest item
     * WARNING: These tools are not intended for items that shift in size during render
     * For more complex functionality, applications will need to handle their own scroll
     */
    enablePagination?: boolean;
    /**
     * Enables override of dynamic virtualizer context if required.
     */
    virtualizerContext?: DynamicVirtualizerContextProps;
    /**
     * WARNING: Experimental - browser scroll anchoring works well in most cases.
     * Enables custom scroll anchor behavior
     */
    enableScrollAnchor?: boolean;
    /**
     * Enables improved scrollTo behavior with iterative corrections for dynamic content.
     * When disabled (default), uses the legacy `scrollToItemDynamic` implementation.
     * When enabled, uses `useScrollToItemDynamic` hook which provides:
     * - Smooth scrolling with automatic position correction after animation completes
     * - Iterative corrections to handle dynamically sized items that resize during render
     * - Temporarily disables useMeasureList scroll compensation during scrollTo operations
     *   to prevent conflicting scroll adjustments
     * @default false
     */
    enableScrollToCorrections?: boolean;
  };

export type VirtualizerScrollViewDynamicState =
  ComponentState<VirtualizerScrollViewDynamicSlots> &
    VirtualizerConfigState &
    Pick<VirtualizerScrollViewDynamicProps, 'enableScrollAnchor'>;

import {
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import * as React from 'react';
import { VirtualizerMeasureDynamicProps } from './hooks.types';
import { useResizeObserverRef_unstable } from './useResizeObserverRef';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * React hook that measures virtualized space dynamically to ensure optimized virtualization length.
 */
export const useDynamicVirtualizerMeasure = <TElement extends HTMLElement>(
  virtualizerProps: VirtualizerMeasureDynamicProps
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: TElement | null) => void;
  containerSizeRef: React.RefObject<number>;
  updateScrollPosition: (scrollPosition: number) => void;
} => {
  const {
    defaultItemSize,
    direction = 'vertical',
    numItems,
    getItemSize,
    bufferItems,
    bufferSize,
    virtualizerContext,
  } = virtualizerProps;

  const [virtualizerLength, setVirtualizerLength] = React.useState(0);
  const [virtualizerBufferItems, setVirtualizerBufferItems] = React.useState(0);
  const [virtualizerBufferSize, setVirtualizerBufferSize] = React.useState(0);

  const scrollPositionRef = React.useRef(0);
  const numItemsRef = React.useRef<number>(numItems);
  const containerSizeRef = React.useRef<number>(0);

  const { targetDocument } = useFluent();
  const container = React.useRef<HTMLElement | null>(null);

  const handleScrollResize = React.useCallback(
    (scrollRef: React.MutableRefObject<HTMLElement | null>) => {
      const hasReachedEnd =
        virtualizerContext.contextIndex + virtualizerLength >= numItems;
      if (!scrollRef?.current || hasReachedEnd) {
        // Error? ignore?
        return;
      }

      if (scrollRef.current !== targetDocument?.body) {
        // We have a local scroll container
        containerSizeRef.current =
          direction === 'vertical'
            ? scrollRef?.current.getBoundingClientRect().height
            : scrollRef?.current.getBoundingClientRect().width;
      } else if (targetDocument?.defaultView) {
        // If our scroll ref is the document body, we should check window height
        containerSizeRef.current =
          direction === 'vertical'
            ? targetDocument?.defaultView?.innerHeight
            : targetDocument?.defaultView?.innerWidth;
      }

      let indexSizer = 0;
      let i = 0;
      let length = 0;

      const actualScrollPos =
        direction === 'vertical'
          ? scrollRef.current.scrollTop
          : scrollRef.current.scrollLeft;

      // Our scrollable window may have increased in size due to dynamic content
      // We don't want to over-optimize here, just ensure vLength is long enough to cover
      // If we return to these items, index change will optimize
      // (Safer to have slightly more rows rendered than to complicate/rerender index changes)
      const scrollPosDiff = Math.max(
        0,
        actualScrollPos - scrollPositionRef.current
      );
      const sizeToBeat =
        containerSizeRef.current + scrollPosDiff + virtualizerBufferSize * 2;
      const startIndex = virtualizerContext.contextIndex;
      numItemsRef.current = numItems;

      while (indexSizer <= sizeToBeat && i + startIndex < numItems) {
        const iItemSize = getItemSize(startIndex + i);
        const currentItemPos =
          virtualizerContext.childProgressiveSizes.current[startIndex + i] -
          iItemSize;

        if (scrollPositionRef.current > currentItemPos + iItemSize) {
          // The item isn't in view, ignore for now.
          i++;
          continue;
        } else if (scrollPositionRef.current > currentItemPos) {
          // The item is partially out of view, ignore the out of bounds portion
          const variance =
            currentItemPos + iItemSize - scrollPositionRef.current;
          indexSizer += variance;
        } else {
          // Item is in view
          indexSizer += iItemSize;
        }
        // Increment
        i++;
        length++;
      }

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       * Minimum: 2 - we give slightly more buffer for dynamic version.
       */
      const newBufferItems = bufferItems ?? Math.max(Math.ceil(length / 3), 1);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const newBufferSize = bufferSize ?? Math.max(defaultItemSize / 2, 1);
      const totalLength = length + newBufferItems * 2;

      setVirtualizerLength(totalLength);
      setVirtualizerBufferItems(newBufferItems);
      setVirtualizerBufferSize(newBufferSize);
    },
    [
      bufferItems,
      bufferSize,
      defaultItemSize,
      direction,
      numItems,
      targetDocument?.body,
      targetDocument?.defaultView,
      virtualizerBufferSize,
      virtualizerContext.childProgressiveSizes,
      virtualizerContext.contextIndex,
      virtualizerLength,
    ]
  );

  const resizeCallback = React.useCallback(
    (
      _entries: ResizeObserverEntry[],
      // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
      // eslint-disable-next-line no-restricted-globals
      _observer: ResizeObserver,
      scrollRef?: React.MutableRefObject<HTMLElement | null>
    ) => {
      if (scrollRef) {
        handleScrollResize(scrollRef);
      }
    },
    [handleScrollResize]
  );

  React.useEffect(() => {
    // Track numItems changes (consumed in handleScrollResize)
    numItemsRef.current = numItems;
  }, [numItems]);

  const scrollRef = useMergedRefs(
    container,
    useResizeObserverRef_unstable(resizeCallback)
  );

  useIsomorphicLayoutEffect(() => {
    if (virtualizerContext.contextIndex + virtualizerLength < numItems) {
      // Avoid re-rendering/re-calculating when the end index has already been reached
      handleScrollResize(container);
    }
  }, [
    handleScrollResize,
    numItems,
    virtualizerContext.contextIndex,
    virtualizerLength,
  ]);

  const updateScrollPosition = React.useCallback(
    (_scrollPosition: number) => {
      // Check if our vLength's need recalculating
      scrollPositionRef.current = _scrollPosition;
      handleScrollResize(scrollRef);
    },
    [handleScrollResize, scrollRef]
  );

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
    containerSizeRef,
    updateScrollPosition,
  };
};

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
    gap = 0,
  } = virtualizerProps;

  const [virtualizerLength, setVirtualizerLength] = React.useState(0);
  const [virtualizerBufferItems, setVirtualizerBufferItems] = React.useState(0);
  const [virtualizerBufferSize, setVirtualizerBufferSize] = React.useState(0);

  const numItemsRef = React.useRef<number>(numItems);
  const containerSizeRef = React.useRef<number>(0);
  const scrollPosition = React.useRef<number>(0);

  const { targetDocument } = useFluent();
  const container = React.useRef<HTMLElement | null>(null);

  const getIndexFromScrollPos = React.useCallback(
    (scrollPos: number): number => {
      /* This is used on numItems change
       * It checks via current render sizes what the current index should be
       */
      let sizeTracker =
        virtualizerContext.childProgressiveSizes.current[
          virtualizerContext.contextIndex
        ] || 0;

      let sizeDiff = 0;
      console.log('Calculate index from scroll position:', scrollPos);
      for (let i = virtualizerContext.contextIndex; i < numItems; i++) {
        sizeTracker += getItemSize(i) + gap;
        sizeDiff =
          sizeTracker - virtualizerContext.childProgressiveSizes.current[i];
        console.log('Size diff:', sizeDiff, ' for index:', i);
        if (sizeTracker >= scrollPos + sizeDiff) {
          console.log('Calculated new index from scroll position:', i);
          return i;
        }
      }

      return -1;
    },
    [getItemSize, numItems]
  );

  const handleScrollResize = React.useCallback(
    (scrollRef: React.MutableRefObject<HTMLElement | null>) => {
      const hasReachedEnd =
        virtualizerContext.contextIndex + virtualizerLength >= numItems;
      console.log('Handle scroll resize');
      if (!scrollRef?.current || hasReachedEnd) {
        console.log('Has reached end');
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

      const sizeToBeat = containerSizeRef.current + virtualizerBufferSize * 2;
      let startIndex = virtualizerContext.contextIndex;
      console.log(
        'Check this out - numItems changed?',
        numItemsRef.current,
        numItems
      );
      if (numItemsRef.current !== numItems) {
        // Our item count has changed, ensure we have an accurate start index
        const newIndex =
          getIndexFromScrollPos(scrollPosition.current) -
          virtualizerBufferItems;
        if (newIndex >= 0) {
          // Only update if index was found
          console.log('Setting new index from parent container:', newIndex);
          startIndex = newIndex;
        }
      }
      numItemsRef.current = numItems;

      while (indexSizer <= sizeToBeat && i + startIndex < numItems) {
        const iItemSize = getItemSize(startIndex + i);
        const currentItemPos =
          virtualizerContext.childProgressiveSizes.current[startIndex + i] -
          iItemSize;

        if (scrollPosition.current > currentItemPos + iItemSize) {
          // The item isn't in view, ignore for now.
          i++;
          continue;
        } else if (scrollPosition.current > currentItemPos) {
          // The item is partially out of view, ignore the out of bounds portion
          const variance = currentItemPos + iItemSize - scrollPosition.current;
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

      console.log('Current calculated startIndex:', startIndex);
      // This will only trigger if dynamic resize causes nessecary changes
      if (virtualizerContext.contextIndex !== startIndex) {
        console.log('Setting context index:', startIndex);
        virtualizerContext.setContextIndex(startIndex);
      }

      console.log(
        'New totalLength:',
        totalLength,
        'vs previous:',
        virtualizerLength
      );
      setVirtualizerLength(totalLength);
      setVirtualizerBufferItems(newBufferItems);
      setVirtualizerBufferSize(newBufferSize);
    },
    [
      bufferItems,
      bufferSize,
      defaultItemSize,
      direction,
      getItemSize,
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
    // Initial measure
    console.log('Num items changed: ', numItems, 'from', numItemsRef.current);
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
      scrollPosition.current = _scrollPosition;
      // Check if our vLength's need recalculating
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

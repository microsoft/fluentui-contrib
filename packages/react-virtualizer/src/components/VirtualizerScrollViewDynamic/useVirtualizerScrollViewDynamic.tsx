import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type {
  VirtualizerScrollViewDynamicProps,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useDynamicVirtualizerMeasure } from '../../Hooks';
import {
  useVirtualizerContextState_unstable,
  scrollToItemDynamic,
} from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';
import { useMeasureList } from '../../hooks/useMeasureList';
import type { IndexedResizeCallbackElement } from '../../hooks/useMeasureList';
import { useDynamicVirtualizerPagination } from '../../hooks/useDynamicPagination';
import { useScrollToItemDynamic } from '../../hooks/useScrollToItemDynamic';

export function useVirtualizerScrollViewDynamic_unstable(
  props: VirtualizerScrollViewDynamicProps
): VirtualizerScrollViewDynamicState {
  'use no memo';

  const contextState = useVirtualizerContextState_unstable(
    props.virtualizerContext
  );
  const {
    imperativeRef,
    axis = 'vertical',
    reversed,
    imperativeVirtualizerRef,
    enablePagination = false,
    bufferItems: _bufferItems,
    bufferSize: _bufferSize,
    enableScrollAnchor,
    enableScrollToCorrections = false,
    gap = 0,
  } = props;

  const sizeTrackingArray = React.useRef<number[]>(
    new Array(props.numItems).fill(props.itemSize)
  );

  const getChildSizeAuto = (index: number) => {
    if (
      sizeTrackingArray.current.length <= index ||
      sizeTrackingArray.current[index] <= 0
    ) {
      // Default size for initial state or untracked
      return props.itemSize;
    }
    /* Required to be defined prior to our measure function
     * we use a sizing array ref that we will update post-render
     */
    return sizeTrackingArray.current[index];
  };

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
    updateScrollPosition,
  } = useDynamicVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
    getItemSize: props.getItemSize ?? getChildSizeAuto,
    virtualizerContext: contextState,
    numItems: props.numItems,
    bufferItems: _bufferItems,
    bufferSize: _bufferSize,
    gap,
  });

  const _imperativeVirtualizerRef = useMergedRefs(
    React.useRef<VirtualizerDataRef>(null),
    imperativeVirtualizerRef
  );

  const paginationRef = useDynamicVirtualizerPagination(
    {
      axis,
      progressiveItemSizes: _imperativeVirtualizerRef.current?.progressiveSizes,
      actualNodeSizes: sizeTrackingArray,
      virtualizerLength,
      currentIndex: contextState?.contextIndex ?? 0,
    },
    enablePagination
  );

  // Store the virtualizer length as a ref for imperative ref access
  const virtualizerLengthRef = React.useRef<number>(virtualizerLength);
  if (virtualizerLengthRef.current !== virtualizerLength) {
    virtualizerLengthRef.current = virtualizerLength;
  }
  const localScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollViewRef = useMergedRefs(
    props.scrollViewRef,
    scrollRef,
    paginationRef,
    localScrollRef
  );
  const scrollCallbackRef = React.useRef<null | ((index: number) => void)>(
    null
  );
  const handleMeasuredCallbackRef = React.useRef<
    ((index: number, size: number, delta: number) => void) | null
  >(null);
  const handleRenderedCallbackRef = React.useRef<
    ((index: number) => boolean) | null
  >(null);
  const measuredIndexSetRef = React.useRef<Set<number>>(new Set());

  const handleItemMeasured = React.useCallback(
    (index: number, size: number, delta: number) => {
      measuredIndexSetRef.current.add(index);
      handleMeasuredCallbackRef.current?.(index, size, delta);
    },
    []
  );

  const resolveScrollCallback = React.useCallback((index: number) => {
    const callback = scrollCallbackRef.current;
    if (callback) {
      scrollCallbackRef.current = null;
      callback(index);
    }
  }, []);

  const handleRenderedIndex = React.useCallback(
    (index: number) => {
      const handled = handleRenderedCallbackRef.current?.(index) ?? false;
      if (!handled) {
        resolveScrollCallback(index);
      }
    },
    [resolveScrollCallback]
  );

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    getItemSize: props.getItemSize ?? getChildSizeAuto,
    virtualizerLength,
    bufferItems,
    bufferSize,
    virtualizerContext: contextState,
    imperativeVirtualizerRef: _imperativeVirtualizerRef,
    onRenderedFlaggedIndex: handleRenderedIndex,
    containerSizeRef,
    scrollViewRef,
    updateScrollPosition,
  });

  // Track whether a scrollTo operation is active to disable scroll compensation
  // Only used when enableScrollToCorrections is true
  const isScrollToActiveRef = React.useRef(false);

  const requestScrollBy = React.useCallback(
    (sizeChange: number) => {
      // Skip scroll compensation when using enableScrollToCorrections and scrollTo is active
      // The new scroll controller handles its own compensation
      if (enableScrollToCorrections && isScrollToActiveRef.current) {
        return;
      }

      // Handle any size changes so that scroll view doesn't jump around
      if (enableScrollAnchor) {
        localScrollRef.current?.scrollBy({
          top: axis === 'vertical' ? sizeChange : 0,
          left: axis === 'vertical' ? 0 : sizeChange,
          behavior: 'instant',
        });
      }
    },
    [enableScrollAnchor, enableScrollToCorrections, axis, localScrollRef]
  );

  const measureObject = useMeasureList({
    currentIndex: Math.max(virtualizerState.virtualizerStartIndex, 0),
    totalLength: props.numItems,
    defaultItemSize: props.itemSize,
    sizeTrackingArray,
    axis,
    virtualizerLength,
    requestScrollBy,
    onItemMeasured: handleItemMeasured,
  });

  React.useEffect(() => {
    const measuredSet = measuredIndexSetRef.current;
    measuredSet.forEach((value) => {
      if (value >= props.numItems) {
        measuredSet.delete(value);
      }
    });
  }, [props.numItems]);

  const setFlaggedIndex = React.useCallback(
    (flaggedIndex: number | null) => {
      _imperativeVirtualizerRef.current?.setFlaggedIndex(flaggedIndex);
    },
    [_imperativeVirtualizerRef]
  );

  const getTotalSize = React.useCallback(() => {
    const progressiveSizes =
      _imperativeVirtualizerRef.current?.progressiveSizes.current;
    if (progressiveSizes && progressiveSizes.length > 0) {
      return progressiveSizes[Math.max(progressiveSizes.length - 1, 0)];
    }
    return 0;
  }, [_imperativeVirtualizerRef]);

  const getOffsetForIndex = React.useCallback(
    (index: number) => {
      if (index <= 0) {
        return 0;
      }

      const progressiveSizes =
        _imperativeVirtualizerRef.current?.progressiveSizes.current;

      if (
        progressiveSizes &&
        progressiveSizes.length > 0 &&
        index - 1 < progressiveSizes.length
      ) {
        const value = progressiveSizes[index - 1];
        if (Number.isFinite(value)) {
          return value;
        }
      }

      let total = 0;
      const limit = Math.min(index, sizeTrackingArray.current.length);
      for (let i = 0; i < limit; i++) {
        const size =
          sizeTrackingArray.current[i] > 0
            ? sizeTrackingArray.current[i]
            : props.itemSize;
        total += size;
        if (gap && i < index - 1) {
          total += gap;
        }
      }
      return total;
    },
    [_imperativeVirtualizerRef, gap, props.itemSize, sizeTrackingArray]
  );

  const getScrollItemSize = React.useCallback(
    (index: number) => {
      if (measuredIndexSetRef.current.has(index)) {
        return sizeTrackingArray.current[index] ?? props.itemSize;
      }

      if (props.getItemSize) {
        return props.getItemSize(index);
      }

      return getChildSizeAuto(index);
    },
    [props.getItemSize, props.itemSize, getChildSizeAuto]
  );

  // ----- New scroll-to corrections implementation (opt-in via enableScrollToCorrections) -----
  const handleOperationComplete = React.useCallback(
    (index: number) => {
      // Re-enable useMeasureList scroll compensation now that the operation is complete
      isScrollToActiveRef.current = false;
      resolveScrollCallback(index);
    },
    [resolveScrollCallback]
  );

  const handleOperationCancel = React.useCallback(
    (_index: number, _reason: 'user' | 'cancelled') => {
      void _index;
      void _reason;
      isScrollToActiveRef.current = false;
      scrollCallbackRef.current = null;
    },
    []
  );

  const {
    start: startScrollToWithCorrections,
    handleItemMeasured: controllerHandleItemMeasured,
    handleRendered: controllerHandleRendered,
    cancel: cancelScrollToOperation,
  } = useScrollToItemDynamic({
    axis,
    reversed,
    gap,
    scrollViewRef: localScrollRef,
    getItemSize: getScrollItemSize,
    getTotalSize,
    getOffsetForIndex,
    measureRefObject: measureObject.refObject,
    setFlaggedIndex,
    onOperationComplete: handleOperationComplete,
    onOperationCancel: handleOperationCancel,
  });

  // Only wire up the controller callbacks when using the new implementation
  React.useEffect(() => {
    if (enableScrollToCorrections) {
      handleMeasuredCallbackRef.current = controllerHandleItemMeasured;
      handleRenderedCallbackRef.current = controllerHandleRendered;
      return () => {
        if (
          handleMeasuredCallbackRef.current === controllerHandleItemMeasured
        ) {
          handleMeasuredCallbackRef.current = null;
        }
        if (handleRenderedCallbackRef.current === controllerHandleRendered) {
          handleRenderedCallbackRef.current = null;
        }
      };
    }
    return undefined;
  }, [
    enableScrollToCorrections,
    controllerHandleItemMeasured,
    controllerHandleRendered,
  ]);

  // ----- Legacy scroll-to implementation (default) -----
  const legacyScrollTo = React.useCallback(
    (
      index: number,
      behavior: ScrollBehavior = 'auto',
      callback?: (index: number) => void
    ) => {
      if (callback) {
        scrollCallbackRef.current = callback;
      }
      setFlaggedIndex(index);
      scrollToItemDynamic({
        index,
        scrollViewRef: localScrollRef,
        axis,
        reversed,
        behavior,
        getItemSize: getScrollItemSize,
        totalSize: getTotalSize(),
        gap,
      });
    },
    [
      axis,
      reversed,
      gap,
      getScrollItemSize,
      getTotalSize,
      setFlaggedIndex,
      localScrollRef,
    ]
  );

  React.useImperativeHandle(
    imperativeRef,
    () => ({
      scrollToPosition(
        position: number,
        behavior: ScrollBehavior = 'auto',
        index?: number,
        callback?: (index: number) => void
      ) {
        if (callback) {
          scrollCallbackRef.current = callback ?? null;
        }

        if (enableScrollToCorrections) {
          cancelScrollToOperation();
        }

        if (_imperativeVirtualizerRef.current) {
          if (index !== undefined) {
            setFlaggedIndex(index);
          }
          const positionOptions =
            axis === 'vertical' ? { top: position } : { left: position };
          scrollViewRef.current?.scrollTo({
            behavior,
            ...positionOptions,
          });
        }
      },
      scrollTo(
        index: number,
        behavior: ScrollBehavior = 'auto',
        callback?: (index: number) => void
      ) {
        if (enableScrollToCorrections) {
          // Use new implementation with iterative corrections
          scrollCallbackRef.current = callback ?? null;
          isScrollToActiveRef.current = true;
          startScrollToWithCorrections(index, behavior, callback);
        } else {
          // Use legacy implementation
          legacyScrollTo(index, behavior, callback);
        }
      },
      currentIndex: _imperativeVirtualizerRef.current?.currentIndex,
      virtualizerLength: virtualizerLengthRef,
      sizeTrackingArray,
    }),
    [
      axis,
      scrollViewRef,
      _imperativeVirtualizerRef,
      startScrollToWithCorrections,
      cancelScrollToOperation,
      setFlaggedIndex,
      reversed,
      enableScrollToCorrections,
      legacyScrollTo,
    ]
  );

  // Enables auto-measuring and tracking post render sizes externally
  React.Children.map(virtualizerState.virtualizedChildren, (child, index) => {
    if (React.isValidElement(child)) {
      virtualizerState.virtualizedChildren[index] = (
        <child.type
          {...child.props}
          key={child.key}
          ref={(element: HTMLElement & IndexedResizeCallbackElement) => {
            if (Object.prototype.hasOwnProperty.call(child, 'ref')) {
              // We must access this from the child directly, not props (forward ref).
              // eslint-disable-next-line  @typescript-eslint/no-explicit-any
              const localRef = (child as any)?.ref;

              if (typeof localRef === 'function') {
                localRef(element);
              } else if (localRef) {
                localRef.current = element;
              }
            }

            // Call the auto-measure ref attachment.
            measureObject.createIndexedRef(index)(element);
          }}
        />
      );
    }
  });

  return {
    ...virtualizerState,
    enableScrollAnchor,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: slot.always(props.container, {
      defaultProps: {
        ref: scrollViewRef,
      },
      elementType: 'div',
    }),
  };
}

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export interface IndexedResizeCallbackElement {
  handleResize: () => void;
}
/**
 * Provides a way of automating size in the virtualizer
 * Returns
 * `width` - element width ref (0 by default),
 * `height` - element height ref (0 by default),
 * `measureElementRef` - a ref function to be passed as `ref` to the element you want to measure
 */
export function useMeasureList<
  TElement extends HTMLElement & IndexedResizeCallbackElement = HTMLElement &
    IndexedResizeCallbackElement
>(measureParams: {
  currentIndex: number;
  totalLength: number;
  defaultItemSize: number;
  sizeTrackingArray: React.MutableRefObject<number[]>;
  axis: 'horizontal' | 'vertical';
  requestScrollBy?: (sizeChange: number) => void;
}): {
  createIndexedRef: (index: number) => (el: TElement) => void;
  refArray: React.MutableRefObject<(TElement | null | undefined)[]>;
} {
  const {
    currentIndex,
    totalLength,
    defaultItemSize,
    sizeTrackingArray,
    axis,
    requestScrollBy,
  } = measureParams;

  const refArray = React.useRef<Array<TElement | undefined | null>>([]);
  const { targetDocument } = useFluent();

  // the handler for resize observer
  const handleIndexUpdate = React.useCallback(
    (index: number) => {
      const boundClientRect = refArray.current[index]?.getBoundingClientRect();

      if (!boundClientRect) {
        return;
      }

      const containerSize =
        (axis === 'vertical'
          ? boundClientRect?.height
          : boundClientRect?.width) ?? defaultItemSize;

      const sizeDifference =
        containerSize - sizeTrackingArray.current[currentIndex + index];

      // Todo: Handle reverse setup
      // This requests a scrollBy to offset the new change
      if (axis === 'vertical' && boundClientRect.bottom < sizeDifference) {
        requestScrollBy?.(-sizeDifference);
      } else if (
        axis === 'horizontal' &&
        boundClientRect.right < sizeDifference
      ) {
        requestScrollBy?.(-sizeDifference);
      }

      if (sizeDifference !== 0) {
        // Size tracking array gets exposed if teams need it
        sizeTrackingArray.current[currentIndex + index] = containerSize;
      }
    },
    [currentIndex, defaultItemSize]
  );

  const handleElementResizeCallback = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const target = entry.target as TElement;
      // Call the elements own resize handler (indexed)
      target.handleResize();
    }
  };

  React.useEffect(() => {
    const newLength = totalLength - sizeTrackingArray.current.length;
    /* Ensure we grow or truncate arrays with prior properties,
    keeping the existing values is important for whitespace assumptions.
    Even if items in the 'middle' are deleted, we will recalc the whitespace as it is explored.*/
    if (newLength > 0) {
      sizeTrackingArray.current = sizeTrackingArray.current.concat(
        new Array(newLength).fill(defaultItemSize)
      );
    } else if (newLength < 0) {
      sizeTrackingArray.current = sizeTrackingArray.current.slice(
        0,
        totalLength
      );
    }
  }, [defaultItemSize, totalLength]);

  // Keep the reference of ResizeObserver as a ref, as it should live through renders
  const resizeObserver = React.useRef(
    createResizeObserverFromDocument(
      targetDocument,
      handleElementResizeCallback
    )
  );

  /* createIndexedRef provides a dynamic function to create an undefined number of refs at render time
   * these refs then provide an indexed callback via attaching 'handleResize' to the element itself
   * this function is then called on resize by handleElementResize and relies on indexing
   * to track continuous sizes throughout renders while releasing all virtualized element refs each render cycle.
   */
  const createIndexedRef = React.useCallback(
    (index: number) => {
      const measureElementRef = (el: TElement) => {
        if (!targetDocument || !resizeObserver.current) {
          return;
        }

        if (el) {
          el.handleResize = () => {
            handleIndexUpdate(index);
          };
        }

        // cleanup previous container
        const prevEl = refArray.current[index];
        if (prevEl) {
          resizeObserver.current.unobserve(prevEl);
        }

        refArray.current[index] = undefined;
        if (el) {
          refArray.current[index] = el;
          resizeObserver.current.observe(el);
          handleIndexUpdate(index);
        }
      };

      return measureElementRef;
    },
    [handleIndexUpdate, resizeObserver, targetDocument]
  );

  React.useEffect(() => {
    const _resizeObserver = resizeObserver;
    return () => _resizeObserver.current?.disconnect();
  }, [resizeObserver]);

  return {
    createIndexedRef,
    refArray,
  };
}

/**
 * FIXME - TS 3.8/3.9 don't have ResizeObserver types by default, move this to a shared utility once we bump the minbar
 * A utility method that creates a ResizeObserver from a target document
 * @param targetDocument - document to use to create the ResizeObserver
 * @param callback  - https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver#callback
 * @returns a ResizeObserver instance or null if the global does not exist on the document
 */
export function createResizeObserverFromDocument(
  targetDocument: Document | null | undefined,
  callback: ResizeObserverCallback
  // eslint-disable-next-line no-restricted-globals
): ResizeObserver | null {
  if (!targetDocument?.defaultView?.ResizeObserver) {
    return null;
  }

  return new targetDocument.defaultView.ResizeObserver(callback);
}

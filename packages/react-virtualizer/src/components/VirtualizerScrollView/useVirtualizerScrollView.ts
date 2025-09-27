import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type {
  VirtualizerScrollViewProps,
  VirtualizerScrollViewState,
} from './VirtualizerScrollView.types';
import { useStaticVirtualizerMeasure } from '../../Hooks';
import { scrollToItemStatic } from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';
import { useStaticVirtualizerPagination } from '../../hooks/useStaticPagination';

export function useVirtualizerScrollView_unstable(
  props: VirtualizerScrollViewProps
): VirtualizerScrollViewState {
  const {
    imperativeRef,
    itemSize,
    numItems,
    axis = 'vertical',
    reversed,
    enablePagination = false,
    gap,
  } = props;

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
  } = useStaticVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
  });

  // Store the virtualizer length as a ref for imperative ref access
  const virtualizerLengthRef = React.useRef<number>(virtualizerLength);
  if (virtualizerLengthRef.current !== virtualizerLength) {
    virtualizerLengthRef.current = virtualizerLength;
  }

  const paginationRef = useStaticVirtualizerPagination(
    { axis, itemSize },
    enablePagination
  );
  const scrollViewRef = useMergedRefs(
    props.scrollViewRef,
    scrollRef,
    paginationRef
  ) as React.RefObject<HTMLDivElement>;
  const imperativeVirtualizerRef = React.useRef<VirtualizerDataRef | null>(
    null
  );
  const scrollCallbackRef = React.useRef<null | ((index: number) => void)>(
    null
  );

  React.useImperativeHandle(
    imperativeRef,
    () => {
      return {
        scrollTo(
          index: number,
          behavior = 'auto',
          callback: ((index: number) => void) | undefined
        ) {
          scrollCallbackRef.current = callback ?? null;
          imperativeVirtualizerRef.current?.setFlaggedIndex(index);
          scrollToItemStatic({
            index,
            itemSize,
            totalItems: numItems,
            scrollViewRef,
            axis,
            reversed,
            behavior,
            gap,
          });
        },
        scrollToPosition(
          position: number,
          behavior: ScrollBehavior = 'auto',
          index?: number, // So we can callback when index rendered
          callback?: (index: number) => void
        ) {
          if (callback) {
            scrollCallbackRef.current = callback ?? null;
          }

          if (imperativeVirtualizerRef.current) {
            if (index !== undefined) {
              imperativeVirtualizerRef.current.setFlaggedIndex(index);
            }
            const positionOptions =
              axis == 'vertical' ? { top: position } : { left: position };
            scrollViewRef.current?.scrollTo({
              behavior,
              ...positionOptions,
            });
          }
        },
        currentIndex: imperativeVirtualizerRef.current?.currentIndex,
        virtualizerLength: virtualizerLengthRef,
      };
    },
    [axis, scrollViewRef, itemSize, numItems, reversed]
  );

  const handleRenderedIndex = (index: number) => {
    if (scrollCallbackRef.current) {
      scrollCallbackRef.current(index);
    }
  };

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    virtualizerLength,
    bufferItems,
    bufferSize,
    onRenderedFlaggedIndex: handleRenderedIndex,
    imperativeVirtualizerRef,
    containerSizeRef,
    gap,
  });

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: slot.always(props.container, {
      defaultProps: {
        ref: scrollViewRef as React.RefObject<HTMLDivElement>,
      },
      elementType: 'div',
    }),
  };
}

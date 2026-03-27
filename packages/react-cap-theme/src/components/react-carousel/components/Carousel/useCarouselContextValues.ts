import * as React from 'react';
import type { CarouselContextValues, CarouselState } from './Carousel.types';

export function useCarouselContextValues(
  state: CarouselState
): CarouselContextValues {
  const {
    activeIndex,
    circular,
    containerRef,
    layout,
    viewportRef,
    enableAutoplay,
    resetAutoplay,
    selectPageByElement,
    selectPageByDirection,
    selectPageByIndex,
    subscribeForValues,
  } = state;

  const carousel = React.useMemo(
    () => ({
      activeIndex,
      circular,
      containerRef,
      viewportRef,
      enableAutoplay,
      resetAutoplay,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
    }),
    [
      activeIndex,
      circular,
      containerRef,
      viewportRef,
      enableAutoplay,
      resetAutoplay,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
    ]
  );

  return { carousel, layout };
}

import { useCarousel_unstable } from '@fluentui/react-carousel';
import type * as React from 'react';
import type { CarouselProps, CarouselState } from './Carousel.types';

export const useCarousel = (
  props: CarouselProps,
  ref: React.Ref<HTMLDivElement>
): CarouselState => {
  const { layout = 'inline', ...fluentProps } = props;
  const baseState = useCarousel_unstable(fluentProps, ref);

  return { ...baseState, layout };
};

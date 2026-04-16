/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import {
  type CarouselSlots,
  renderCarousel_unstable,
} from '@fluentui/react-carousel';
import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import type { CarouselContextValues, CarouselState } from './Carousel.types';
import { CarouselProvider } from './CarouselContext';

export const renderCarousel = (
  state: CarouselState,
  contextValues: CarouselContextValues
): JSXElement => {
  const { layout, ...fluentState } = state;
  void layout;

  assertSlots<CarouselSlots>(state);

  return (
    <CarouselProvider value={contextValues}>
      {renderCarousel_unstable(fluentState, contextValues)}
    </CarouselProvider>
  );
};

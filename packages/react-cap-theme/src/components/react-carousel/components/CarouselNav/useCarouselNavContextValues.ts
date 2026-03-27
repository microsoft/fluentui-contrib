import * as React from 'react';
import type {
  CarouselNavContextValues,
  CarouselNavState,
} from './CarouselNav.types';

export const useCarouselNavContextValues = (
  state: CarouselNavState
): CarouselNavContextValues => {
  const { appearance } = state;
  const carouselNav = React.useMemo(() => ({ appearance }), [appearance]);

  return { carouselNav };
};

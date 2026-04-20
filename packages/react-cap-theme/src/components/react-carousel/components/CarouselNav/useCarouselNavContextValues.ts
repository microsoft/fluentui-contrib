import * as React from 'react';
import type {
  CarouselNavContextValues,
  CarouselNavState,
} from '../../../../customStyleHooks/react-carousel';

export const useCarouselNavContextValues = (
  state: CarouselNavState
): CarouselNavContextValues => {
  const { appearance } = state;
  const carouselNav = React.useMemo(() => ({ appearance }), [appearance]);

  return { carouselNav };
};

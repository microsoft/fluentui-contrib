import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderCarousel } from './renderCarousel';
import { useCarousel } from './useCarousel';
import { useCarouselContextValues } from './useCarouselContextValues';
import { useCarouselStyles } from '../../../../customStyleHooks/react-carousel';
import type { CarouselProps } from '../../../../customStyleHooks/react-carousel';

export const Carousel: ForwardRefComponent<CarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useCarousel(props, ref);
    const contextValues = useCarouselContextValues(state);

    useCarouselStyles(state);
    useCustomStyleHook_unstable('useCarouselStyles_unstable')(state);

    return renderCarousel(state, contextValues);
  }
);

Carousel.displayName = 'Carousel';

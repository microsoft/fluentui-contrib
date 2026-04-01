import { renderCarouselNav_unstable } from '@fluentui/react-carousel';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { CarouselNavProps } from './CarouselNav.types';
import { useCarouselNav } from './useCarouselNav';
import { useCarouselNavContextValues } from './useCarouselNavContextValues';
import { useCarouselNavStyles } from './useCarouselNavStyles.styles';

export const CarouselNav: ForwardRefComponent<CarouselNavProps> =
  React.forwardRef((props, ref) => {
    const state = useCarouselNav(props, ref);
    const contextValues = useCarouselNavContextValues(state);

    useCarouselNavStyles(state);
    useCustomStyleHook_unstable('useCarouselNavStyles_unstable')(state);

    return renderCarouselNav_unstable(state, contextValues);
  });

CarouselNav.displayName = 'CarouselNav';

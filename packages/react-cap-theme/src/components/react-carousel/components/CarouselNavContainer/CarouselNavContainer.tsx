import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { CarouselNavContainerProps } from './CarouselNavContainer.types';
import { renderCarouselNavContainer } from './renderCarouselNavContainer';
import { useCarouselNavContainer } from './useCarouselNavContainer';
import { useCarouselNavContainerStyles } from './useCarouselNavContainerStyles.styles';

export const CarouselNavContainer: ForwardRefComponent<CarouselNavContainerProps> =
  React.forwardRef((props, ref) => {
    const state = useCarouselNavContainer(props, ref);
    useCarouselNavContainerStyles(state);
    useCustomStyleHook_unstable('useCarouselNavContainerStyles_unstable')(
      state
    );
    return renderCarouselNavContainer(state);
  });

CarouselNavContainer.displayName = 'CarouselNavContainer';

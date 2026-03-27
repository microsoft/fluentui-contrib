import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import type { CarouselButtonProps } from './CarouselButton.types';
import { renderCarouselButton } from './renderCarouselButton';
import { useCarouselButton } from './useCarouselButton';
import { useCarouselButtonStyles } from './useCarouselButtonStyles.styles';

export const CarouselButton: ForwardRefComponent<CarouselButtonProps> =
  forwardRef((props, ref) => {
    const state = useCarouselButton(props, ref);

    useCarouselButtonStyles(state);
    useCustomStyleHook_unstable('useCarouselButtonStyles_unstable')(state);

    return renderCarouselButton(state);
  });

CarouselButton.displayName = 'CarouselButton';

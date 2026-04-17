import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { renderCarouselButton } from './renderCarouselButton';
import { useCarouselButton } from './useCarouselButton';
import type { CarouselButtonProps } from '../../../../customStyleHooks/react-carousel';
import { useCarouselButtonStyles } from '../../../../customStyleHooks/react-carousel';

export const CarouselButton: ForwardRefComponent<CarouselButtonProps> =
  forwardRef((props, ref) => {
    const state = useCarouselButton(props, ref);

    useCarouselButtonStyles(state);
    useCustomStyleHook_unstable('useCarouselButtonStyles_unstable')(state);

    return renderCarouselButton(state);
  });

CarouselButton.displayName = 'CarouselButton';

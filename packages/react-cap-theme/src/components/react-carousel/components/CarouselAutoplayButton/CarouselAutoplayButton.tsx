import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { renderCarouselAutoplayButton } from './renderCarouselAutoplayButton';
import { useCarouselAutoplayButton } from './useCarouselAutoplayButton';
import type { CarouselAutoplayButtonProps } from '../../../../customStyleHooks/react-carousel';
import { useCarouselAutoplayButtonStyles } from '../../../../customStyleHooks/react-carousel';

export const CarouselAutoplayButton: ForwardRefComponent<CarouselAutoplayButtonProps> =
  forwardRef((props, ref) => {
    const state = useCarouselAutoplayButton(props, ref);

    useCarouselAutoplayButtonStyles(state);
    useCustomStyleHook_unstable('useCarouselAutoplayButtonStyles_unstable')(
      state
    );

    return renderCarouselAutoplayButton(state);
  });

CarouselAutoplayButton.displayName = 'CarouselAutoplayButton';

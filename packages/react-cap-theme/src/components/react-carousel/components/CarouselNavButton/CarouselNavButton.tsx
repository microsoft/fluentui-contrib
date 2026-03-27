import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { CarouselNavButtonProps } from '@fluentui/react-carousel';
import {
  renderCarouselNavButton_unstable,
  useCarouselNavButton_unstable,
} from '@fluentui/react-carousel';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useCarouselNavButtonStyles } from './useCarouselNavButtonStyles.styles';

export const CarouselNavButton: ForwardRefComponent<CarouselNavButtonProps> =
  React.forwardRef<ARIAButtonElement, CarouselNavButtonProps>((props, ref) => {
    const state = useCarouselNavButton_unstable(props, ref);
    useCarouselNavButtonStyles(state);
    useCustomStyleHook_unstable('useCarouselNavButtonStyles_unstable')(state);
    return renderCarouselNavButton_unstable(state);
  });

CarouselNavButton.displayName = 'CarouselNavButton';

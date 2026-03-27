import type { CarouselNavImageButtonProps } from '@fluentui/react-carousel';
import {
  renderCarouselNavImageButton_unstable,
  useCarouselNavImageButton_unstable,
} from '@fluentui/react-carousel';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type {
  ForwardRefComponent,
  JSXElement,
} from '@fluentui/react-utilities';
import * as React from 'react';
import { useCarouselNavImageButtonStyles } from './useCarouselNavImageButtonStyles.styles';

export const CarouselNavImageButton: ForwardRefComponent<CarouselNavImageButtonProps> =
  React.forwardRef((props, ref): JSXElement => {
    const state = useCarouselNavImageButton_unstable(props, ref);
    useCarouselNavImageButtonStyles(state);
    useCustomStyleHook_unstable('useCarouselNavImageButtonStyles_unstable')(
      state
    );
    return renderCarouselNavImageButton_unstable(state);
  });

CarouselNavImageButton.displayName = 'CarouselNavImageButton';

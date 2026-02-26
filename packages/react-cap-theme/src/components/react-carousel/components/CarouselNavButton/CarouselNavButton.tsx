import {
  type CarouselNavButtonProps,
  useCarouselNavButton_unstable,
  renderCarouselNavButton_unstable,
} from '@fluentui/react-carousel';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useCarouselNavButtonStyles } from './useCarouselNavButtonStyles.styles';

/**
 * Enhanced CarouselNavButton component that provides CAP-specific styling.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CarouselNavButton />
 * ```
 *
 * @param props - The carousel navigation button configuration
 * @returns The rendered carousel navigation button component
 * @alpha
 */
export const CarouselNavButton: ForwardRefComponent<CarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useCarouselNavButton_unstable(props, ref);
    useCarouselNavButtonStyles(state);
    return renderCarouselNavButton_unstable(state);
  });

CarouselNavButton.displayName = 'CarouselNavButton';

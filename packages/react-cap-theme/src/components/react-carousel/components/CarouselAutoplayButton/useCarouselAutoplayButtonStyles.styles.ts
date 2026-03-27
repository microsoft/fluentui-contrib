import { useCarouselAutoplayButtonStyles_unstable } from '@fluentui/react-carousel';
import { useToggleButtonStyles } from '../../../react-button';
import type {
  CarouselAutoplayButtonState,
  FluentCarouselAutoplayButtonState,
} from './CarouselAutoplayButton.types';

export const useCarouselAutoplayButtonStyles = (
  state: CarouselAutoplayButtonState
): CarouselAutoplayButtonState => {
  useToggleButtonStyles(state);
  useCarouselAutoplayButtonStyles_unstable(
    state as FluentCarouselAutoplayButtonState
  );
  return state;
};

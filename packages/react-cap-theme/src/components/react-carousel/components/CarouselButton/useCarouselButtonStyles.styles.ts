import { useCarouselButtonStyles_unstable } from '@fluentui/react-carousel';
import { useButtonStyles } from '../../../react-button';
import type {
  CarouselButtonState,
  FluentCarouselButtonState,
} from './CarouselButton.types';

export const useCarouselButtonStyles = (
  state: CarouselButtonState
): CarouselButtonState => {
  useButtonStyles(state);
  useCarouselButtonStyles_unstable(state as FluentCarouselButtonState);
  return state;
};

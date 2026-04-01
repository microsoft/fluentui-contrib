import type { JSXElement } from '@fluentui/react-utilities';
import { assertSlots } from '@fluentui/react-utilities';
import { renderButton } from '../../../react-button';
import type {
  CarouselAutoplayButtonSlots,
  CarouselAutoplayButtonState,
} from './CarouselAutoplayButton.types';

export const renderCarouselAutoplayButton = (
  state: CarouselAutoplayButtonState
): JSXElement => {
  assertSlots<CarouselAutoplayButtonSlots>(state);
  return renderButton(state);
};

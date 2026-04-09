import type { JSXElement } from '@fluentui/react-utilities';
import { assertSlots } from '@fluentui/react-utilities';
import { renderButton } from '../../../react-button';
import type {
  CarouselButtonSlots,
  CarouselButtonState,
} from './CarouselButton.types';

export const renderCarouselButton = (
  state: CarouselButtonState
): JSXElement => {
  assertSlots<CarouselButtonSlots>(state);
  return renderButton(state);
};

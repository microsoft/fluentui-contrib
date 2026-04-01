import type {
  CarouselButtonProps as FluentCarouselButtonProps,
  CarouselButtonSlots as FluentCarouselButtonSlots,
  CarouselButtonState as FluentCarouselButtonState,
} from '@fluentui/react-carousel';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type {
  ButtonProps,
  ButtonSlots,
  ButtonState,
} from '../../../react-button';

export type CarouselButtonSlots = ButtonSlots &
  Pick<FluentCarouselButtonSlots, 'root'>;

export type CarouselButtonProps = Partial<ButtonProps> &
  ComponentProps<CarouselButtonSlots> &
  Pick<FluentCarouselButtonProps, 'navType'>;

export type CarouselButtonState = ButtonState &
  ComponentState<CarouselButtonSlots> &
  Pick<FluentCarouselButtonState, 'navType'>;

export type {
  CarouselButtonProps as FluentCarouselButtonProps,
  CarouselButtonState as FluentCarouselButtonState,
} from '@fluentui/react-carousel';

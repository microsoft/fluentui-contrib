import type {
  CarouselButtonProps as FluentCarouselButtonProps,
  CarouselButtonSlots as FluentCarouselButtonSlots,
  CarouselButtonState as FluentCarouselButtonState,
} from '@fluentui/react-carousel';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ButtonSlots } from '@fluentui/react-button';
import type { ButtonProps, ButtonState } from '../../../react-button';

export type CarouselButtonSlots = ButtonSlots & FluentCarouselButtonSlots;

export type CarouselButtonProps = Partial<ButtonProps> &
  ComponentProps<CarouselButtonSlots> &
  Omit<FluentCarouselButtonProps, 'appearance'>;

export type CarouselButtonState = ButtonState &
  ComponentState<CarouselButtonSlots> &
  Omit<FluentCarouselButtonState, 'appearance'>;

export type {
  CarouselButtonProps as FluentCarouselButtonProps,
  CarouselButtonState as FluentCarouselButtonState,
} from '@fluentui/react-carousel';

import type {
  CarouselAutoplayButtonProps as FluentCarouselAutoplayButtonProps,
  CarouselAutoplayButtonSlots as FluentCarouselAutoplayButtonSlots,
} from '@fluentui/react-carousel';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type {
  ButtonSlots,
  ToggleButtonProps,
  ToggleButtonState,
} from '../../../react-button';

export type CarouselAutoplayButtonSlots = ButtonSlots &
  Pick<FluentCarouselAutoplayButtonSlots, 'root'>;

export type CarouselAutoplayButtonProps = ToggleButtonProps &
  ComponentProps<CarouselAutoplayButtonSlots> &
  Pick<FluentCarouselAutoplayButtonProps, 'onCheckedChange'>;

export type CarouselAutoplayButtonState = ToggleButtonState &
  ComponentState<CarouselAutoplayButtonSlots>;

export type {
  CarouselAutoplayButtonProps as FluentCarouselAutoplayButtonProps,
  CarouselAutoplayButtonState as FluentCarouselAutoplayButtonState,
} from '@fluentui/react-carousel';

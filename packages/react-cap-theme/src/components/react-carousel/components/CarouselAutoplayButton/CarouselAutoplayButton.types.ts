import type {
  CarouselAutoplayButtonProps as FluentCarouselAutoplayButtonProps,
  CarouselAutoplayButtonSlots as FluentCarouselAutoplayButtonSlots,
} from '@fluentui/react-carousel';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ButtonSlots } from '@fluentui/react-button';
import type {
  ToggleButtonProps,
  ToggleButtonState,
} from '../../../react-button/components/ToggleButton/ToggleButton.types';

export type CarouselAutoplayButtonSlots = ButtonSlots &
  FluentCarouselAutoplayButtonSlots;

export type CarouselAutoplayButtonProps = ToggleButtonProps &
  ComponentProps<CarouselAutoplayButtonSlots> &
  Omit<FluentCarouselAutoplayButtonProps, 'appearance'>;

export type CarouselAutoplayButtonState = ToggleButtonState &
  ComponentState<CarouselAutoplayButtonSlots>;

export type {
  CarouselAutoplayButtonProps as FluentCarouselAutoplayButtonProps,
  CarouselAutoplayButtonState as FluentCarouselAutoplayButtonState,
} from '@fluentui/react-carousel';

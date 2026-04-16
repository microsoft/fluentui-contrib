import type {
  CarouselNavContainerProps as FluentCarouselNavContainerProps,
  CarouselNavContainerSlots as FluentCarouselNavContainerSlots,
  CarouselNavContainerState as FluentCarouselNavContainerState,
} from '@fluentui/react-carousel';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { TooltipProps } from '../../../react-tooltip';
import type { CarouselState } from '../Carousel/Carousel.types';

export type CarouselNavContainerSlots = Omit<
  FluentCarouselNavContainerSlots,
  'nextTooltip' | 'prevTooltip' | 'autoplayTooltip'
> & {
  nextTooltip?: Slot<TooltipProps>;
  prevTooltip?: Slot<TooltipProps>;
  autoplayTooltip?: Slot<TooltipProps>;
};

export type CarouselNavContainerProps =
  ComponentProps<CarouselNavContainerSlots> &
    Pick<FluentCarouselNavContainerProps, 'layout'>;

export type CarouselNavContainerState =
  ComponentState<CarouselNavContainerSlots> &
    Pick<CarouselState, 'layout'> & {
      baseLayout: FluentCarouselNavContainerState['layout'];
    };

export type { CarouselNavContainerState as FluentCarouselNavContainerState } from '@fluentui/react-carousel';

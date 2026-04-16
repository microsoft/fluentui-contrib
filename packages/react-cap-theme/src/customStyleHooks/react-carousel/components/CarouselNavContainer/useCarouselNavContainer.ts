import type { CarouselNavContainerProps as FluentCarouselNavContainerProps } from '@fluentui/react-carousel';
import { useCarouselNavContainer_unstable } from '@fluentui/react-carousel';
import { Tooltip } from '@fluentui/react-tooltip';
import { slot } from '@fluentui/react-utilities';
import { useCarouselContext } from '../Carousel/CarouselContext';
import type {
  CarouselNavContainerProps,
  CarouselNavContainerState,
} from './CarouselNavContainer.types';

export const useCarouselNavContainer = (
  props: CarouselNavContainerProps,
  ref: React.Ref<HTMLDivElement>
): CarouselNavContainerState => {
  const layout = useCarouselContext((ctx) => props.layout ?? ctx.layout);
  const baseLayout = layout === 'inline-expanded' ? 'overlay-expanded' : layout;
  const baseState = useCarouselNavContainer_unstable(
    { ...props, layout: baseLayout } as FluentCarouselNavContainerProps,
    ref
  );

  baseState.components.nextTooltip = Tooltip;
  baseState.components.prevTooltip = Tooltip;
  baseState.components.autoplayTooltip = Tooltip;
  const nextTooltip = slot.optional(props.nextTooltip, {
    defaultProps: {},
    elementType: Tooltip as any,
    renderByDefault: false,
  });
  const prevTooltip = slot.optional(props.prevTooltip, {
    defaultProps: {},
    elementType: Tooltip as any,
    renderByDefault: false,
  });
  const autoplayTooltip = slot.optional(props.autoplayTooltip, {
    defaultProps: {},
    elementType: Tooltip as any,
    renderByDefault: false,
  });

  return {
    ...baseState,
    autoplayTooltip,
    baseLayout,
    layout,
    nextTooltip,
    prevTooltip,
  };
};

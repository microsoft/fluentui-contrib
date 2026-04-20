import type { CarouselNavContainerProps as FluentCarouselNavContainerProps } from '@fluentui/react-carousel';
import { useCarouselNavContainer_unstable } from '@fluentui/react-carousel';
import { slot } from '@fluentui/react-utilities';
import { CAPTooltip } from '../../../react-tooltip';
import { useCarouselContext } from '../Carousel/CarouselContext';
import type {
  CarouselNavContainerProps,
  CarouselNavContainerState,
} from '../../../../customStyleHooks/react-carousel';

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

  baseState.components.nextTooltip = CAPTooltip;
  baseState.components.prevTooltip = CAPTooltip;
  baseState.components.autoplayTooltip = CAPTooltip;
  const nextTooltip = slot.optional(props.nextTooltip, {
    defaultProps: {},
    elementType: CAPTooltip,
    renderByDefault: false,
  });
  const prevTooltip = slot.optional(props.prevTooltip, {
    defaultProps: {},
    elementType: CAPTooltip,
    renderByDefault: false,
  });
  const autoplayTooltip = slot.optional(props.autoplayTooltip, {
    defaultProps: {},
    elementType: CAPTooltip,
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

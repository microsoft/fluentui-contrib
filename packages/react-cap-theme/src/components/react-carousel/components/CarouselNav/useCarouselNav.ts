import { useCarouselNav_unstable } from '@fluentui/react-carousel';
import type {
  CarouselNavProps,
  CarouselNavState,
} from '../../../../customStyleHooks/react-carousel';

export const useCarouselNav = (
  props: CarouselNavProps,
  ref: React.Ref<HTMLDivElement>
): CarouselNavState => {
  const { density = 'compact' } = props;
  const baseState = useCarouselNav_unstable(props, ref);

  return { ...baseState, density };
};

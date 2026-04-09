import type {
  CarouselContextValues as FluentCarouselContextValues,
  CarouselProps as FluentCarouselProps,
  CarouselState as FluentCarouselState,
} from '@fluentui/react-carousel';

export type CarouselLayout =
  | 'inline'
  | 'inline-expanded'
  | 'inline-wide'
  | 'overlay'
  | 'overlay-expanded'
  | 'overlay-wide';

export type CarouselProps = FluentCarouselProps & {
  layout?: CarouselLayout;
};

export type CarouselState = FluentCarouselState &
  Required<Pick<CarouselProps, 'layout'>>;

export type CarouselContextValues = FluentCarouselContextValues &
  Pick<CarouselState, 'layout'>;

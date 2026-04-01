import type {
  CarouselNavProps as FluentCarouselNavProps,
  CarouselNavState as FluentCarouselNavState,
} from '@fluentui/react-carousel';

export type CarouselNavDensity = 'compact' | 'comfortable';

export type CarouselNavProps = FluentCarouselNavProps & {
  density?: CarouselNavDensity;
};

export type CarouselNavState = FluentCarouselNavState &
  Required<Pick<CarouselNavProps, 'density'>>;

export type CarouselNavContextValue = Pick<CarouselNavState, 'appearance'>;

export type CarouselNavContextValues = {
  carouselNav: CarouselNavContextValue;
};

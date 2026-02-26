import type {
	CarouselProps as FluentCarouselProps,
	CarouselState as FluentCarouselState,
	CarouselContextValues as FluentCarouselContextValues,
} from "@fluentui/react-carousel";

/**
 * Layout options for the Carousel component
 * @alpha
 */
export type CarouselLayout =
	| "inline"
	| "inline-expanded"
	| "inline-wide"
	| "overlay"
	| "overlay-expanded"
	| "overlay-wide";

/**
 * Enhanced Carousel component props with CAP-specific layout options
 * @alpha
 */
export type CarouselProps = FluentCarouselProps & {
	/**
	 * Layout variant for the carousel that affects spacing, positioning, and overall appearance
	 * @default 'inline'
	 */
	layout?: CarouselLayout;
};

/**
 * State used by the Carousel component
 * @alpha
 */
export type CarouselState = FluentCarouselState &
	Required<Pick<CarouselProps, "layout">>;

/**
 * Context values for the Carousel component
 * @alpha
 */
export type CarouselContextValues = FluentCarouselContextValues &
	Pick<CarouselState, "layout">;

import type {
	CarouselNavProps as FluentCarouselNavProps,
	CarouselNavState as FluentCarouselNavState,
} from "@fluentui/react-carousel";

/**
 * Density options for the CarouselNav component
 * @alpha
 */
export type CarouselNavDensity = "compact" | "comfortable";

/**
 * Enhanced CarouselNav component props with CAP-specific options
 * @alpha
 */
export type CarouselNavProps = FluentCarouselNavProps & {
	/**
	 * Density of the navigation component affecting spacing between nav items
	 * @default 'compact'
	 */
	density?: CarouselNavDensity;
};

/**
 * State used by the CarouselNav component
 * @alpha
 */
export type CarouselNavState = FluentCarouselNavState &
	Required<Pick<CarouselNavProps, "density">>;

/**
 * Context value for the CarouselNav component
 * @alpha
 */
export type CarouselNavContextValue = Pick<CarouselNavState, "appearance">;

import { useCarousel_unstable as useFluentCarousel } from "@fluentui/react-carousel";
import type * as React from "react";

import type { CarouselProps, CarouselState } from "./Carousel.types";

/**
 * Create the state required to render Carousel.
 *
 * The returned state can be modified with hooks such as useCarouselStyles,
 * before being passed to renderCarousel.
 *
 * @param props - props from this instance of Carousel
 * @param ref - reference to root HTMLDivElement of Carousel
 * @returns The carousel state object
 * @alpha
 */
export const useCarousel = (
	props: CarouselProps,
	ref: React.Ref<HTMLDivElement>,
): CarouselState => {
	const { layout = "inline", ...fluentProps } = props;

	// Get the base state from Fluent UI
	const baseState = useFluentCarousel(fluentProps, ref);

	return {
		...baseState,
		layout,
	} as CarouselState;
};

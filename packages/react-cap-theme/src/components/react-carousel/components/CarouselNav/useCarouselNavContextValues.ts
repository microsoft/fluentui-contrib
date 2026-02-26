import React from "react";

import type {
	CarouselNavContextValue,
	CarouselNavState,
} from "./CarouselNav.types";

/**
 * Context values for CarouselNav
 * @internal
 */
export type CarouselNavContextValues = {
	carouselNav: CarouselNavContextValue;
};

/**
 * Create context values for CarouselNav components
 * @param state - The carousel nav state object
 * @returns The carousel nav context values
 * @internal
 */
export const useCarouselNavContextValues = (
	state: CarouselNavState,
): CarouselNavContextValues => {
	const { appearance } = state;
	const carouselNav = React.useMemo(() => ({ appearance }), [appearance]);

	return { carouselNav };
};

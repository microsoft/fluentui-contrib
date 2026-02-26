/** @jsx createElement */
/** @jsxRuntime classic */

import {
	type CarouselSlots,
	renderCarousel_unstable,
} from "@fluentui/react-carousel";
import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type { ReactElement } from "react";

import type { CarouselContextValues, CarouselState } from "./Carousel.types";
import { CarouselProvider } from "./CarouselContext";

/**
 * Render the final JSX of Carousel
 * @param state - The carousel state object
 * @param contextValues - The carousel context values
 * @returns The rendered carousel component
 * @alpha
 */
export const renderCarousel = (
	state: CarouselState,
	contextValues: CarouselContextValues,
): ReactElement => {
	const { layout, ...fluentState } = state;
	void layout;

	assertSlots<CarouselSlots>(state);

	return (
		<CarouselProvider value={contextValues}>
			{renderCarousel_unstable(fluentState, contextValues)}
		</CarouselProvider>
	);
};

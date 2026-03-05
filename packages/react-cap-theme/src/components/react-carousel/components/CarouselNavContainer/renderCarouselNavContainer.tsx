import { renderCarouselNavContainer_unstable } from "@fluentui/react-carousel";
import type { ReactElement } from "react";

import type { CarouselNavContainerState } from "./CarouselNavContainer.types";

/**
 * Render the final JSX of CarouselNavContainer
 * @param state - The carousel nav container state object
 * @returns The rendered carousel nav container component
 * @alpha
 */
export const renderCarouselNavContainer = (
	state: CarouselNavContainerState,
): ReactElement => {
	const { baseLayout, layout } = state;
	void layout;
	return renderCarouselNavContainer_unstable({
		...state,
		layout: baseLayout,
	});
};

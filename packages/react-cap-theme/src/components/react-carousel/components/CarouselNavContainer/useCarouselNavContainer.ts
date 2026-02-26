import {
	type CarouselNavContainerProps,
	useCarouselNavContainer_unstable,
} from "@fluentui/react-carousel";

import { useCarouselContext } from "../Carousel/CarouselContext";
import type { CarouselNavContainerState } from "./CarouselNavContainer.types";

/**
 * Create the state required to render CarouselNavContainer
 * @param props - props from this instance of CarouselNavContainer
 * @param ref - reference to root HTMLDivElement of CarouselNavContainer
 * @returns The carousel nav container state object
 * @alpha
 */
export const useCarouselNavContainer = (
	props: CarouselNavContainerProps,
	ref: React.Ref<HTMLDivElement>,
): CarouselNavContainerState => {
	const layout = useCarouselContext((ctx) => props.layout ?? ctx.layout);
	const baseLayout =
		layout === "inline-expanded" ? "overlay-expanded" : layout;
	const baseState = useCarouselNavContainer_unstable(
		{ ...props, layout: baseLayout },
		ref,
	);

	return { ...baseState, baseLayout, layout };
};

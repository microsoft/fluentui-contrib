import { useCarouselNav_unstable } from "@fluentui/react-carousel";

import type { CarouselNavProps, CarouselNavState } from "./CarouselNav.types";

/**
 * Create the state required to render CarouselNav
 * @param props - props from this instance of CarouselNav
 * @param ref - reference to root HTMLDivElement of CarouselNav
 * @returns The carousel nav state object
 * @alpha
 */
export const useCarouselNav = (
	props: CarouselNavProps,
	ref: React.Ref<HTMLDivElement>,
): CarouselNavState => {
	const { density = "compact" } = props;
	const baseState = useCarouselNav_unstable(props, ref);

	return { ...baseState, density };
};

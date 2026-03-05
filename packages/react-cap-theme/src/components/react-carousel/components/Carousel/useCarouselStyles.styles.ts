import {
	carouselCardClassNames,
	carouselSliderClassNames,
	type CarouselSlots,
	useCarouselStyles_unstable,
	carouselButtonClassNames,
	carouselViewportClassNames,
} from "@fluentui/react-carousel";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { CarouselState } from "./Carousel.types";

/**
 * CSS class names for Carousel slots
 * @alpha
 */
export const carouselClassNames: SlotClassNames<CarouselSlots> = {
	root: "fui-Carousel",
};

const NAV_HEIGHT = 28;

const useStyles = makeStyles({
	root: {
		overflow: "hidden",
		[`& .${carouselSliderClassNames.root}`]: {
			borderRadius: tokens.borderRadiusLarge,
		},
	},

	"inline-expanded": {
		[`& .${carouselViewportClassNames.root}`]: {
			marginBottom: `calc(${tokens.spacingHorizontalM} + ${NAV_HEIGHT}px)`,
		},
		[`& .${carouselCardClassNames.root}`]: {
			boxSizing: "border-box",
			padding: `0 calc(${tokens.spacingHorizontalM} * 2 + ${NAV_HEIGHT}px)`,
		},
		[`& .${carouselButtonClassNames.root}`]: {
			top: `calc(50% - ${NAV_HEIGHT / 2}px)`,
		},
	},
});

/**
 * Apply styling to the Carousel slots based on the state
 * @param state - The carousel state object
 * @returns The styled carousel state
 * @alpha
 */
export const useCarouselStyles = (state: CarouselState): CarouselState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		carouselClassNames.root,
		styles.root,
		state.layout === "inline-expanded" && styles["inline-expanded"],
		state.root.className,
	);

	return useCarouselStyles_unstable(state) as CarouselState;
};

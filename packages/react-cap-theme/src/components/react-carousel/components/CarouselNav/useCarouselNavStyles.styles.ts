import {
	type CarouselNavSlots,
	useCarouselNavStyles_unstable,
} from "@fluentui/react-carousel";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { CarouselNavState } from "./CarouselNav.types";

/**
 * CSS class names for CarouselNav slots
 * @alpha
 */
export const carouselNavClassNames: SlotClassNames<CarouselNavSlots> = {
	root: "fui-CarouselNav",
};

/**
 * Styles for the CarouselNav component
 */
const useStyles = makeStyles({
	root: {
		margin: `auto ${tokens.spacingHorizontalM}`,
		maxHeight: "fit-content",
	},

	// Density styles
	compact: {},
	comfortable: {
		gap: tokens.spacingHorizontalM,
	},
});

/**
 * Apply styling to the CarouselNav component
 * @param state - The carousel nav state object
 * @returns The styled carousel nav state
 * @alpha
 */
export const useCarouselNavStyles = (
	state: CarouselNavState,
): CarouselNavState => {
	const { density } = state;
	const classes = useStyles();

	state.root.className = mergeClasses(
		carouselNavClassNames.root,
		classes.root,
		classes[density],
		state.root.className,
	);

	return useCarouselNavStyles_unstable(state) as CarouselNavState;
};

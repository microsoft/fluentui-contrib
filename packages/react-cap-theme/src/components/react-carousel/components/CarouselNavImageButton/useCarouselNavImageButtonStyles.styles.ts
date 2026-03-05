import {
	useCarouselNavImageButtonStyles_unstable,
	type CarouselNavImageButtonSlots,
	type CarouselNavImageButtonState,
} from "@fluentui/react-carousel";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for CarouselNavImageButton slots
 * @alpha
 */
export const carouselNavImageButtonClassNames: SlotClassNames<CarouselNavImageButtonSlots> =
	{
		root: "fui-CarouselNavImageButton",
		image: "fui-CarouselNavImageButton__image",
	};

const useStyles = makeStyles({
	root: {
		borderRadius: tokens.borderRadiusXLarge,
		margin: 0,
	},
});

/**
 * Apply styling to the CarouselNavImageButton component
 * @param state - The carousel nav image button state object
 * @returns The styled carousel nav image button state
 * @alpha
 */
export const useCarouselNavImageButtonStyles = (
	state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
	const classes = useStyles();

	state.root.className = mergeClasses(
		carouselNavImageButtonClassNames.root,
		classes.root,
		state.root.className,
	);

	return useCarouselNavImageButtonStyles_unstable(state);
};

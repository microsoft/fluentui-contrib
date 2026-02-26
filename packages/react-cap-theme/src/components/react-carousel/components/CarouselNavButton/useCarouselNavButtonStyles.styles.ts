import {
	type CarouselNavButtonState,
	useCarouselNavButtonStyles_unstable,
} from "@fluentui/react-carousel";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Styles for the CarouselNavButton component
 */
const useStyles = makeStyles({
	brand: {
		"::after": {
			backgroundColor: tokens.colorBrandForeground1,
		},
	},
});

/**
 * Apply styling to the CarouselNavButton slots based on the state
 * @param state - The carousel nav button state object
 * @returns The styled carousel nav button state
 * @alpha
 */
export const useCarouselNavButtonStyles = (
	state: CarouselNavButtonState,
): CarouselNavButtonState => {
	const classes = useStyles();

	state.root.className = mergeClasses(
		state.appearance === "brand" && classes.brand,
		state.root.className,
	);

	return useCarouselNavButtonStyles_unstable(state);
};

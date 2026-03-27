import type { CarouselNavImageButtonState } from "@fluentui/react-carousel";
import { useCarouselNavImageButtonStyles_unstable } from "@fluentui/react-carousel";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

const useStyles = makeStyles({
	root: { borderRadius: tokens.borderRadiusXLarge, margin: 0 },
});

export const useCarouselNavImageButtonStyles = (
	state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
	const classes = useStyles();

	state.root.className = mergeClasses(classes.root, state.root.className);
	return useCarouselNavImageButtonStyles_unstable(state);
};

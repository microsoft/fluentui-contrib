import {
	useCarouselNavContainerStyles_unstable,
	type CarouselNavContainerSlots,
} from "@fluentui/react-carousel";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { CarouselNavContainerState } from "./CarouselNavContainer.types";

/**
 * CSS class names for CarouselNavContainer slots
 * @alpha
 */
export const carouselNavContainerClassNames: SlotClassNames<CarouselNavContainerSlots> =
	{
		root: "fui-CarouselNavContainer",
		autoplay: "fui-CarouselNavContainer__autoplay",
		prev: "fui-CarouselNavContainer__prev",
		next: "fui-CarouselNavContainer__next",
		autoplayTooltip: "fui-CarouselNavContainer__autoplayTooltip",
		prevTooltip: "fui-CarouselNavContainer__prevTooltip",
		nextTooltip: "fui-CarouselNavContainer__nextTooltip",
	};

/**
 * Styles for the navigation container based on layout
 */
const useStyles = makeStyles({
	inline: {},
	"inline-expanded": {},
	"inline-wide": {},
	overlay: {},
	"overlay-expanded": {
		bottom: tokens.spacingVerticalM,
	},
	"overlay-wide": {
		padding: `0 ${tokens.spacingHorizontalM}`,
	},
	expanded: {
		height: "auto", // Ensure bottom spacing doesn't increase height
		top: 0,
		"> div": {
			bottom: tokens.spacingVerticalXXS, // Vertically center with autoplay button
		},
	},
});

const useButtonStyles = makeStyles({
	base: {
		borderRadius: tokens.borderRadiusXLarge,
		maxHeight: "28px",
		maxWidth: "28px",
		minHeight: "28px",
		minWidth: "28px",
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
	},
	autoplay: {
		marginRight: tokens.spacingHorizontalS,
	},
	inline: {},
	"inline-expanded": {},
	"inline-wide": {},
	overlay: {
		backgroundColor: tokens.colorNeutralBackgroundAlpha,
	},
	"overlay-expanded": {
		backgroundColor: tokens.colorNeutralBackgroundAlpha,
	},
	"overlay-wide": {
		backgroundColor: tokens.colorNeutralBackgroundAlpha,
	},
	autoPlayExpanded: {
		marginBottom: 0,
	},
	autoplayOverlayWide: {
		marginLeft: 0,
	},
	prevOverlayWide: {
		marginLeft: 0,
	},
	nextOverlayWide: {
		marginRight: 0,
	},
});

/**
 * Apply styling to the CarouselNavContainer component
 * @param state - The carousel nav container state object
 * @returns The styled carousel nav container state
 * @alpha
 */
export const useCarouselNavContainerStyles = (
	state: CarouselNavContainerState,
): CarouselNavContainerState => {
	const { baseLayout, layout } = state;
	const isExpanded =
		layout === "inline-expanded" || layout === "overlay-expanded";
	const classes = useStyles();
	const buttonClasses = useButtonStyles();

	state.root.className = mergeClasses(
		carouselNavContainerClassNames.root,
		classes[layout],
		isExpanded && classes.expanded,
		state.root.className,
	);

	if (state.autoplay) {
		state.autoplay.className = mergeClasses(
			carouselNavContainerClassNames.autoplay,
			buttonClasses.base,
			buttonClasses.autoplay,
			buttonClasses[layout],
			isExpanded && buttonClasses.autoPlayExpanded,
			layout === "overlay-wide" && buttonClasses.autoplayOverlayWide,
			state.autoplay.className,
		);
	}
	if (state.prev) {
		state.prev.className = mergeClasses(
			carouselNavContainerClassNames.prev,
			buttonClasses.base,
			buttonClasses[layout],
			layout === "overlay-wide" && buttonClasses.prevOverlayWide,
			state.prev.className,
		);
	}
	if (state.next) {
		state.next.className = mergeClasses(
			carouselNavContainerClassNames.next,
			buttonClasses.base,
			buttonClasses[layout],
			layout === "overlay-wide" && buttonClasses.nextOverlayWide,
			state.next.className,
		);
	}

	return {
		...useCarouselNavContainerStyles_unstable({
			...state,
			layout: baseLayout,
		}),
		baseLayout,
		layout,
	};
};

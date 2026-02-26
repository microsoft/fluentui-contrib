import { useCardHeaderStyles_unstable } from "@fluentui/react-card";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { typographyStyles } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { CardHeaderSlots, CardHeaderState } from "./CardHeader.types";

export { cardHeaderCSSVars } from "@fluentui/react-card";

/**
 * Class names for CardHeader component slots
 * @alpha
 */
export const cardHeaderClassNames: SlotClassNames<CardHeaderSlots> = {
	root: "fui-CardHeader",
	header: "fui-CardHeader__header",
	description: "fui-CardHeader__description",
	action: "fui-CardHeader__action",
	image: "fui-CardHeader__image",
};

const truncateText = {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
};

const useHeaderStyles = makeStyles({
	base: {
		...truncateText,
		...typographyStyles.body1Strong,
		"& *": truncateText,
	},
});
const useDescriptionStyles = makeStyles({
	base: {
		...truncateText,
		...typographyStyles.caption1,
		alignSelf: "start",
		"& *": truncateText,
	},
});
const useActionStyles = makeStyles({
	base: {
		display: "flex",
	},
});
const useGridStyles = makeStyles({
	action: {
		alignSelf: "flex-start",
	},
	header: {
		alignSelf: "end",
	},
});
const useFlexStyles = makeStyles({
	action: {
		alignSelf: "center",
	},
	header: {
		alignSelf: "center",
	},
});

/**
 * Applies styling to the CardHeader component based on its state.
 * @param state - The state object for the CardHeader component
 * @returns The updated state object with applied styling
 * @alpha
 */
export const useCardHeaderStyles = (
	state: CardHeaderState,
): CardHeaderState => {
	const headerStyles = useHeaderStyles();
	const descriptionStyles = useDescriptionStyles();
	const actionStyles = useActionStyles();
	const gridStyles = useGridStyles();
	const flexStyles = useFlexStyles();

	const boxModelStyles = state.description ? gridStyles : flexStyles;

	state.root.className = mergeClasses(
		cardHeaderClassNames.root,
		state.root.className,
	);
	if (state.header) {
		state.header.className = mergeClasses(
			cardHeaderClassNames.header,
			headerStyles.base,
			boxModelStyles.header,
			state.header.className,
		);
	}
	if (state.description) {
		state.description.className = mergeClasses(
			cardHeaderClassNames.description,
			descriptionStyles.base,
			state.description.className,
		);
	}
	if (state.action) {
		state.action.className = mergeClasses(
			cardHeaderClassNames.action,
			actionStyles.base,
			boxModelStyles.action,
			state.action.className,
		);
	}
	if (state.image) {
		state.image.className = mergeClasses(
			cardHeaderClassNames.image,
			state.image.className,
		);
	}

	useCardHeaderStyles_unstable(state);

	return state;
};

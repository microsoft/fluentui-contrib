import { useCardFooterStyles_unstable } from "@fluentui/react-card";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

import type { CardFooterSlots, CardFooterState } from "./CardFooter.types";

/**
 * Class names for CardFooter component slots
 * @alpha
 */
export const cardFooterClassNames: SlotClassNames<CardFooterSlots> = {
	root: "fui-CardFooter",
	action: "fui-CardFooter__action",
};

/**
 * Applies styling to the CardFooter component based on its state.
 * @param state - The state object for the CardFooter component
 * @returns The updated state object with applied styling
 * @alpha
 */
export const useCardFooterStyles = (
	state: CardFooterState,
): CardFooterState => {
	state.root.className = mergeClasses(
		cardFooterClassNames.root,
		state.root.className,
	);

	if (state.action) {
		state.action.className = mergeClasses(
			cardFooterClassNames.action,
			state.action.className,
		);
	}

	useCardFooterStyles_unstable(state);

	return state;
};

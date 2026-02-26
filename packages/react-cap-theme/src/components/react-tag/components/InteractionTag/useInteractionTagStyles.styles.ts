import { useInteractionTagStyles_unstable } from "@fluentui/react-tags";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type {
	InteractionTagSlots,
	InteractionTagState,
} from "./InteractionTag.types";

/**
 * CSS class names for the CAP InteractionTag component slots.
 * @alpha
 */
export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
	root: "fui-InteractionTag",
};

const useRootStyles = makeStyles({
	medium: {
		height: "36px",
		borderRadius: tokens.borderRadiusXLarge,
	},
	small: {
		borderRadius: tokens.borderRadiusXLarge,
	},
	"extra-small": {
		borderRadius: tokens.borderRadiusLarge,
	},
});

/**
 * Apply styling to the CAP InteractionTag component.
 *
 * @example
 * ```tsx
 * const styledState = useInteractionTagStyles(state);
 * ```
 *
 * @param state - The InteractionTag state object
 * @returns The styled InteractionTag state
 * @alpha
 */
export const useInteractionTagStyles = (
	state: InteractionTagState,
): InteractionTagState => {
	const rootStyles = useRootStyles();

	state.root.className = mergeClasses(
		interactionTagClassNames.root,
		rootStyles[state.size],
		state.root.className,
	);

	useInteractionTagStyles_unstable(state);
	return state;
};

import { useTextareaStyles_unstable } from "@fluentui/react-textarea";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { TextareaState } from "./Textarea.types";

/**
 * Pending design specs (current tokens are placeholders)
 */
const useNeutralStyles = makeStyles({
	interactive: {
		// This is all for the bottom focus border.
		// It's supposed to be 2px flat all the way across and match the radius of the field's corners.
		"::after": {
			// Flat 2px border:
			// By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
			// (This could be done without trimming using `background: linear-gradient(...)`, but using
			// borderBottom makes it easier for people to override the color if needed.)
			borderBottomColor: tokens.colorNeutralStroke1,
		},
		":focus-within:active::after": {
			// This is if the user clicks the field again while it's already focused
			borderBottomColor: tokens.colorNeutralStroke1Pressed,
		},
	},
	outlineInteractive: {
		":focus-within": {
			borderBottomColor: tokens.colorNeutralStroke1,
		},
	},
});

/**
 * Apply styling to the Textarea based on the state.
 * @param state - The current Textarea state
 * @returns The updated Textarea state with applied styles
 * @alpha
 */
export const useTextareaStyles = (state: TextareaState): TextareaState => {
	const neutralStyles = useNeutralStyles();
	const isNeutralInteractive =
		state.color === "neutral" && !state.textarea.disabled;

	state.root.className = mergeClasses(
		isNeutralInteractive && neutralStyles.interactive,
		isNeutralInteractive &&
			state.appearance === "outline" &&
			neutralStyles.outlineInteractive,
		state.root.className,
	);

	const { color, ...baseState } = state;
	useTextareaStyles_unstable(baseState);
	return state;
};

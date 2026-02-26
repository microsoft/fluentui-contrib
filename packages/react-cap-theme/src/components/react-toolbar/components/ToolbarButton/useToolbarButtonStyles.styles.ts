import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	type ButtonSlots,
	useButtonStyles,
} from "@fluentui-contrib/react-cap-theme/react-button";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { ToolbarButtonState } from "./ToolbarButton.types";

/**
 * Class names for the ToolbarButton component.
 * @alpha
 */
export const toolbarButtonClassNames: Partial<SlotClassNames<ButtonSlots>> = {
	root: "fui-ToolbarButton",
};

const useStyles = makeStyles({
	root: { maxWidth: "fit-content", minWidth: "fit-content" },
});

/**
 * Apply styles to the ToolbarButton component.
 * Combines Fluent UI styles with CAP-specific styling including optimized padding and sizing.
 * @param state - The button state to apply styles to
 * @returns The updated ToolbarButtonState object
 * @alpha
 */
export const useToolbarButtonStyles = (
	state: ToolbarButtonState,
): ToolbarButtonState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarButtonClassNames.root,
		styles.root,
		state.root.className,
	);

	useButtonStyles(state);

	return state;
};

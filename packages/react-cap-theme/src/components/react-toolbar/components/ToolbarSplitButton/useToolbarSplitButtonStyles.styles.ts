import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	type SplitButtonSlots,
	useSplitButtonStyles,
} from "@fluentui-contrib/react-cap-theme/react-button";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { ToolbarSplitButtonState } from "./ToolbarSplitButton.types";

/**
 * Class names for the ToolbarSplitButton component.
 * @alpha
 */
export const toolbarSplitButtonClassNames: Partial<
	SlotClassNames<SplitButtonSlots>
> = {
	root: "fui-ToolbarSplitButton",
};

const useStyles = makeStyles({
	root: { maxWidth: "fit-content", minWidth: "fit-content" },
});

/**
 * Apply styles to the ToolbarSplitButton component.
 * Combines Fluent UI styles with CAP-specific styling including optimized padding and sizing.
 * @param state - The split button state to apply styles to
 * @returns The updated ToolbarSplitButtonState object
 * @alpha
 */
export const useToolbarSplitButtonStyles = (
	state: ToolbarSplitButtonState,
): ToolbarSplitButtonState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarSplitButtonClassNames.root,
		styles.root,
		state.root.className,
	);

	useSplitButtonStyles(state);

	return state;
};

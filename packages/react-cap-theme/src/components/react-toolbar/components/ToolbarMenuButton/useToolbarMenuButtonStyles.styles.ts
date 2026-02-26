import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	type MenuButtonSlots,
	useMenuButtonStyles,
} from "@fluentui-contrib/react-cap-theme/react-button";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { ToolbarMenuButtonState } from "./ToolbarMenuButton.types";

/**
 * Class names for the ToolbarMenuButton component.
 * @alpha
 */
export const toolbarMenuButtonClassNames: Partial<
	SlotClassNames<MenuButtonSlots>
> = {
	root: "fui-ToolbarMenuButton",
};

const useStyles = makeStyles({
	root: { maxWidth: "fit-content", minWidth: "fit-content" },
});

/**
 * Apply styles to the ToolbarMenuButton component.
 * @param state - The menu button state to apply styles to
 * @returns The updated ToolbarMenuButtonState object
 * @alpha
 */
export const useToolbarMenuButtonStyles = (
	state: ToolbarMenuButtonState,
): ToolbarMenuButtonState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarMenuButtonClassNames.root,
		styles.root,
		state.root.className,
	);

	useMenuButtonStyles(state);

	return state;
};

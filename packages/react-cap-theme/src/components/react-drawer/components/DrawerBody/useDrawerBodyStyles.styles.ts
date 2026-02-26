import { useDrawerBodyStyles_unstable } from "@fluentui/react-drawer";
import type { DrawerBodyState, DrawerBodySlots } from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for DrawerBody component slots.
 * @alpha
 */
export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
	root: "fui-DrawerBody",
};

const useStyles = makeStyles({
	root: { padding: `0 ${tokens.spacingHorizontalXL}` },
});

/**
 * Apply styling to the DrawerBody based on the state.
 * @param state - The current DrawerBody state
 * @returns The updated DrawerBody state with applied styles
 * @alpha
 */
export const useDrawerBodyStyles = (
	state: DrawerBodyState,
): DrawerBodyState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		drawerBodyClassNames.root,
		styles.root,
		state.root.className,
	);

	useDrawerBodyStyles_unstable(state);

	return state;
};

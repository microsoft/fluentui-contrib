import { useDrawerHeaderStyles_unstable } from "@fluentui/react-drawer";
import type {
	DrawerHeaderState,
	DrawerHeaderSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for DrawerHeader component slots.
 * @alpha
 */
export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
	root: "fui-DrawerHeader",
};

const useStyles = makeStyles({
	root: {
		padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalM}`,
		gap: tokens.spacingVerticalMNudge,
	},
});

/**
 * Apply styling to the DrawerHeader based on the state.
 * @param state - The current DrawerHeader state
 * @returns The updated DrawerHeader state with applied styles
 * @alpha
 */
export const useDrawerHeaderStyles = (
	state: DrawerHeaderState,
): DrawerHeaderState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		drawerHeaderClassNames.root,
		styles.root,
		state.root.className,
	);

	useDrawerHeaderStyles_unstable(state);

	return state;
};

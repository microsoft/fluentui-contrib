import { useDrawerHeaderNavigationStyles_unstable } from "@fluentui/react-drawer";
import type {
	DrawerHeaderNavigationState,
	DrawerHeaderNavigationSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for DrawerHeaderNavigation component slots.
 * @alpha
 */
export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> =
	{
		root: "fui-DrawerHeaderNavigation",
	};

const useStyles = makeStyles({
	root: { margin: `0 calc(${tokens.spacingHorizontalMNudge} * -1)` },
});

/**
 * Apply styling to the DrawerHeaderNavigation based on the state.
 * @param state - The current DrawerHeaderNavigation state
 * @returns The updated DrawerHeaderNavigation state with applied styles
 * @alpha
 */
export const useDrawerHeaderNavigationStyles = (
	state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		drawerHeaderNavigationClassNames.root,
		styles.root,
		state.root.className,
	);

	useDrawerHeaderNavigationStyles_unstable(state);

	return state;
};

import type { DrawerHeaderNavigationState } from "@fluentui/react-drawer";
import { useDrawerHeaderNavigationStyles_unstable } from "@fluentui/react-drawer";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

const useStyles = makeStyles({
	root: { margin: `0 ${tokens.spacingHorizontalS}` },
});

export const useDrawerHeaderNavigationStyles = (
	state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
	const styles = useStyles();

	state.root.className = mergeClasses(styles.root, state.root.className);
	return useDrawerHeaderNavigationStyles_unstable(state);
};

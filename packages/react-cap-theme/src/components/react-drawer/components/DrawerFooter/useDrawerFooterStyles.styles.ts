import { useDrawerFooterStyles_unstable } from "@fluentui/react-drawer";
import type {
	DrawerFooterState,
	DrawerFooterSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for DrawerFooter component slots.
 * @alpha
 */
export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
	root: "fui-DrawerFooter",
};

const useStyles = makeStyles({
	root: {
		justifyContent: "flex-end",
		padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXL}`,
	},
});

/**
 * Apply styling to the DrawerFooter based on the state.
 * @param state - The current DrawerFooter state
 * @returns The updated DrawerFooter state with applied styles
 * @alpha
 */
export const useDrawerFooterStyles = (
	state: DrawerFooterState,
): DrawerFooterState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		drawerFooterClassNames.root,
		styles.root,
		state.root.className,
	);

	useDrawerFooterStyles_unstable(state);

	return state;
};

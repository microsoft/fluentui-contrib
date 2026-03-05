import type { DrawerSlots, DrawerState } from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

/**
 * CSS class names for Drawer component slots.
 * @alpha
 */
export const drawerClassNames: SlotClassNames<DrawerSlots> = {
	root: "fui-Drawer",
};

/**
 * Apply styling to the Drawer based on the state.
 * @param state - The current Drawer state
 * @returns The updated Drawer state with applied styles
 * @alpha
 */
export const useDrawerStyles = (state: DrawerState): DrawerState => {
	state.root.className = mergeClasses(
		drawerClassNames.root,
		state.root.className,
	);

	return state;
};

import {
	useMenuDividerStyles_unstable,
	type MenuDividerSlots,
	type MenuDividerState,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for MenuDivider component slots.
 * @alpha
 */
export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
	root: "fui-MenuDivider",
};

const useStyles = makeStyles({
	root: {
		borderBottomColor: tokens.colorNeutralStroke3,
		margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
	},
});

/**
 * Applies CAP-specific styling to MenuDivider component.
 * @param state - The MenuDivider state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuDividerStyles = (
	state: MenuDividerState,
): MenuDividerState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		menuDividerClassNames.root,
		styles.root,
		state.root.className,
	);
	useMenuDividerStyles_unstable(state);
	return state;
};

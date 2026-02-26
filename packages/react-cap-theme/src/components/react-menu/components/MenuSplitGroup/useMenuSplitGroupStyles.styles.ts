import {
	menuItemClassNames,
	useMenuSplitGroupStyles_unstable,
	type MenuSplitGroupSlots,
	type MenuSplitGroupState,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for MenuSplitGroup component slots.
 * @alpha
 */
export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
	root: "fui-MenuSplitGroup",
};

const useStyles = makeStyles({
	root: {
		[`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
			borderBottomRightRadius: 0,
			borderTopRightRadius: 0,
		},
		[`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
			paddingBottom: tokens.spacingVerticalSNudge,
			paddingRight: tokens.spacingHorizontalSNudge,
			paddingTop: tokens.spacingVerticalSNudge,
		},
		[`& > .${menuItemClassNames.root}:nth-of-type(2)::before`]: {
			alignSelf: "center",
			height: "100%",
			marginTop: tokens.spacingVerticalS,
			marginBottom: tokens.spacingVerticalS,
		},
		[`& .${menuItemClassNames.submenuIndicator}`]: {
			marginLeft: tokens.spacingHorizontalSNudge,
		},
	},
});

/**
 * Applies CAP-specific styling to MenuSplitGroup component.
 * @param state - The MenuSplitGroup state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuSplitGroupStyles = (
	state: MenuSplitGroupState,
): MenuSplitGroupState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		menuSplitGroupClassNames.root,
		styles.root,
		state.root.className,
	);
	useMenuSplitGroupStyles_unstable(state);
	return state;
};

import {
	useMenuGroupHeaderStyles_unstable,
	type MenuGroupHeaderSlots,
	type MenuGroupHeaderState,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for MenuGroupHeader component slots.
 * @alpha
 */
export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
	root: "fui-MenuGroupHeader",
};

const useStyles = makeStyles({
	root: {
		...typographyStyles.caption1Strong,
		height: "auto",
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalS}`,
	},
});

/**
 * Applies CAP-specific styling to MenuGroupHeader component.
 * @param state - The MenuGroupHeader state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuGroupHeaderStyles = (
	state: MenuGroupHeaderState,
): MenuGroupHeaderState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		menuGroupHeaderClassNames.root,
		styles.root,
		state.root.className,
	);
	useMenuGroupHeaderStyles_unstable(state);
	return state;
};

import {
	useMenuGroupHeaderStyles_unstable,
	type MenuGroupHeaderSlots,
	type MenuGroupHeaderState,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

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

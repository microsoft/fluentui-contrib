import {
	useMenuPopoverStyles_unstable,
	type MenuPopoverSlots,
	type MenuPopoverState,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

export const menuPopoverClassNames: Partial<SlotClassNames<MenuPopoverSlots>> =
	{
		root: "fui-MenuPopover",
	};

const useStyles = makeStyles({
	root: {
		border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha}`,
		borderRadius: tokens.borderRadiusXLarge,
		boxShadow: tokens.shadow4,
		padding: `calc(${tokens.spacingVerticalSNudge} - 1px) calc(${tokens.spacingHorizontalSNudge} - 1px)`,
		width: "248px",
	},
});

export const useMenuPopoverStyles = (
	state: MenuPopoverState,
): MenuPopoverState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		menuPopoverClassNames.root,
		styles.root,
		state.root.className,
	);
	useMenuPopoverStyles_unstable(state);

	return state;
};

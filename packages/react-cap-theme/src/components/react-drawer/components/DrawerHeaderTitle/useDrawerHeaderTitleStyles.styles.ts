import { useDrawerHeaderTitleStyles_unstable } from "@fluentui/react-drawer";
import type {
	DrawerHeaderTitleState,
	DrawerHeaderTitleSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for DrawerHeaderTitle component slots.
 * @alpha
 */
export const drawerHeaderTitleClassNames: SlotClassNames<DrawerHeaderTitleSlots> =
	{
		root: "fui-DrawerHeaderTitle",
		heading: "fui-DrawerHeaderTitle__heading",
		action: "fui-DrawerHeaderTitle__action",
	};

const useStyles = makeStyles({
	root: {
		paddingTop: tokens.spacingVerticalXXS,
		paddingBottom: tokens.spacingVerticalXS,
	},

	action: {
		marginRight: `calc(${tokens.spacingHorizontalMNudge} * -1)`,
		paddingLeft: tokens.spacingHorizontalS,
	},
});

/**
 * Apply styling to the DrawerHeaderTitle based on the state.
 * @param state - The current DrawerHeaderTitle state
 * @returns The updated DrawerHeaderTitle state with applied styles
 * @alpha
 */
export const useDrawerHeaderTitleStyles = (
	state: DrawerHeaderTitleState,
): DrawerHeaderTitleState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		drawerHeaderTitleClassNames.root,
		styles.root,
		state.root.className,
	);

	if (state.heading) {
		state.heading.className = mergeClasses(
			drawerHeaderTitleClassNames.heading,
			state.heading.className,
		);
	}

	if (state.action) {
		state.action.className = mergeClasses(
			drawerHeaderTitleClassNames.action,
			styles.action,
			state.action.className,
		);
	}

	useDrawerHeaderTitleStyles_unstable(state);

	return state;
};

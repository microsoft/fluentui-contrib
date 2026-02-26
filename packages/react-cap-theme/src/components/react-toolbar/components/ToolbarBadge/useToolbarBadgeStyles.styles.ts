import type { SlotClassNames } from "@fluentui/react-utilities";
import type {
	BadgeSlots,
	BadgeState,
} from "@fluentui-contrib/react-cap-theme/react-badge";
import { useBadgeStyles } from "@fluentui-contrib/react-cap-theme/react-badge";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Class names for the ToolbarBadge component.
 * @alpha
 */
export const toolbarBadgeClassNames: Partial<SlotClassNames<BadgeSlots>> = {
	root: "fui-ToolbarBadge",
};

const useStyles = makeStyles({
	root: { minWidth: "fit-content", whiteSpace: "nowrap" },
});

/**
 * Update the given state with styles for the toolbar badge component.
 * @param state - The badge state to apply styles to
 * @returns Badge state with toolbar-specific styles applied
 * @alpha
 */
export const useToolbarBadgeStyles = (state: BadgeState): BadgeState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarBadgeClassNames.root,
		styles.root,
		state.root.className,
	);

	return useBadgeStyles(state);
};

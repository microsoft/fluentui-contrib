import { useBreadcrumbDividerStyles_unstable } from "@fluentui/react-breadcrumb";
import type {
	BreadcrumbDividerSlots,
	BreadcrumbDividerState,
} from "@fluentui/react-breadcrumb";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for the BreadcrumbDivider component slots.
 * @alpha
 */
export const breadcrumbDividerClassNames: SlotClassNames<BreadcrumbDividerSlots> =
	{
		root: "fui-BreadcrumbDivider",
	};

const useStyles = makeStyles({
	root: { color: tokens.colorNeutralForeground3 },
});

/**
 * Apply styling to the BreadcrumbDivider based on the state.
 * @param state - The BreadcrumbDivider state object
 * @returns The styled BreadcrumbDivider state
 * @alpha
 */
export const useBreadcrumbDividerStyles = (
	state: BreadcrumbDividerState,
): BreadcrumbDividerState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		breadcrumbDividerClassNames.root,
		styles.root,
		state.root.className,
	);

	useBreadcrumbDividerStyles_unstable(state);

	return state;
};

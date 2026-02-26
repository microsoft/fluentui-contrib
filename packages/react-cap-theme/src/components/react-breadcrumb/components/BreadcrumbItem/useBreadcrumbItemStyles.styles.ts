import { useBreadcrumbItemStyles_unstable } from "@fluentui/react-breadcrumb";
import type {
	BreadcrumbItemSlots,
	BreadcrumbItemState,
} from "@fluentui/react-breadcrumb";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for the BreadcrumbItem component slots.
 * @alpha
 */
export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
	root: "fui-BreadcrumbItem",
};

const useStyles = makeStyles({
	root: {
		color: tokens.colorNeutralForeground3,
		paddingTop: tokens.spacingVerticalXXS,
		paddingBottom: tokens.spacingVerticalXXS,
	},
});

/**
 * Apply styling to the BreadcrumbItem based on the state.
 * @param state - The BreadcrumbItem state object
 * @returns The styled BreadcrumbItem state
 * @alpha
 */
export const useBreadcrumbItemStyles = (
	state: BreadcrumbItemState,
): BreadcrumbItemState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		breadcrumbItemClassNames.root,
		styles.root,
		state.root.className,
	);

	useBreadcrumbItemStyles_unstable(state);

	return state;
};

import type { InfoLabelState } from "@fluentui/react-infolabel";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CAP InfoLabel Style Customizations:
 *
 * 1. Disabled styling: Fluent's InfoLabel doesn't have built-in disabled styling
 *    for the label text - CAP adds visual disabled state.
 *
 * 2. Large weight: Fluent defaults large size to semibold, CAP's design spec
 *    requires regular font weight for large.
 *
 * 3. InfoButton popover arrow: Fluent's Popover has withArrow=false by default,
 *    but InfoLabel's internal Popover sets withArrow=true. Arrow styling is
 *    handled in PopoverSurface styles. CAP may need to update arrow positioning styles to fix alignment issues.
 */
const useStyles = makeStyles({
	root: {
		display: "inline-flex",
		alignItems: "center",
	},
});

export const useInfoLabelStyles = (state: InfoLabelState): InfoLabelState => {
	const styles = useStyles();

	state.root.className = mergeClasses(state.root.className, styles.root);

	return state;
};

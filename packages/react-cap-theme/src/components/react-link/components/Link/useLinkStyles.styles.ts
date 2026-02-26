import { useLinkStyles_unstable } from "@fluentui/react-link";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { LinkSlots, LinkState } from "./Link.types";

/**
 * CSS class names for Link component slots.
 *
 * Provides consistent class naming for styling and testing the Link component
 * within the CAP Design System.
 *
 * @alpha
 */
export const linkClassNames: SlotClassNames<LinkSlots> = {
	root: "fui-Link",
};

const useStyles = makeStyles({
	bold: {
		fontWeight: tokens.fontWeightSemibold,
	},
});

/**
 * Hook that applies styles to the CAP Link component.
 *
 * @param state - The Link component state object
 * @returns The updated state object with applied styles
 * @alpha
 */
export const useLinkStyles = (state: LinkState): LinkState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		linkClassNames.root,
		state.bold && styles.bold,
		state.root.className,
	);

	useLinkStyles_unstable(state);
	return state;
};

import { useInlineDrawerStyles_unstable } from "@fluentui/react-drawer";
import type {
	InlineDrawerState,
	InlineDrawerSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

import { useDrawerBaseClassNames } from "../../shared/useDrawerBaseStyles.styles";

/**
 * CSS class names for InlineDrawer component slots.
 * @alpha
 */
export const inlineDrawerClassNames: SlotClassNames<
	Omit<InlineDrawerSlots, "surfaceMotion">
> = {
	root: "fui-InlineDrawer",
};

const useDrawerStyles = makeStyles({
	root: { backgroundColor: tokens.colorTransparentBackground },
});

/**
 * Apply styling to the InlineDrawer based on the state.
 * @param state - The current InlineDrawer state
 * @returns The updated InlineDrawer state with applied styles
 * @alpha
 */
export const useInlineDrawerStyles = (
	state: InlineDrawerState,
): InlineDrawerState => {
	const baseClassNames = useDrawerBaseClassNames(state);
	const styles = useDrawerStyles();

	state.root.className = mergeClasses(
		inlineDrawerClassNames.root,
		baseClassNames,
		styles.root,
		state.root.className,
	);

	useInlineDrawerStyles_unstable(state);

	return state;
};

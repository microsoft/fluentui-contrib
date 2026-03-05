import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type {
	HeaderSubTextSlots,
	HeaderSubTextState,
} from "./HeaderSubText.types";

/**
 * CSS class names for HeaderSubText component slots.
 * @alpha
 */
export const headerSubTextClassNames: SlotClassNames<HeaderSubTextSlots> = {
	root: "fui-HeaderSubText",
	collapseMotion: "fui-HeaderSubText__collapseMotion",
};

const useStyles = makeStyles({
	root: {
		...typographyStyles.body1,
		display: "block",
		gridColumn: "1",
		gridRow: "2",
		maxWidth: "500px",
		paddingTop: tokens.spacingVerticalM,
	},
});

/**
 * Apply styling to HeaderSubText component state.
 * @param state - HeaderSubText state to apply styles to
 * @returns Modified state with applied styles
 * @alpha
 */
export const useHeaderSubTextStyles = (
	state: HeaderSubTextState,
): HeaderSubTextState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		headerSubTextClassNames.root,
		styles.root,
		state.root.className,
	);

	return state;
};

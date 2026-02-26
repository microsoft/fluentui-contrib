import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { HeaderTitleSlots, HeaderTitleState } from "./HeaderTitle.types";

/**
 * CSS class names for HeaderTitle component slots.
 * @alpha
 */
export const headerTitleClassNames: SlotClassNames<HeaderTitleSlots> = {
	root: "fui-HeaderTitle",
};

const useStyles = makeStyles({
	root: { display: "block", gridColumn: "1", gridRow: "1", margin: 0 },
	xlarge: { ...typographyStyles.title1 },
	large: { ...typographyStyles.title2 },
	medium: {
		...typographyStyles.title3,
		margin: `${tokens.spacingVerticalXXS} 0 0`,
	},
	small: {
		...typographyStyles.subtitle1,
		margin: `${tokens.spacingVerticalXS} 0 0`,
	},
});

/**
 * Apply styling to HeaderTitle component state.
 * @param state - HeaderTitle state to apply styles to
 * @returns Modified state with applied styles
 * @alpha
 */
export const useHeaderTitleStyles = (
	state: HeaderTitleState,
): HeaderTitleState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		headerTitleClassNames.root,
		styles.root,
		styles[state.size],
		state.root.className,
	);

	return state;
};

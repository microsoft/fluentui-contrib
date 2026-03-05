import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { HeaderSlots, HeaderState } from "./Header.types";

/**
 * CSS class names for Header component slots.
 * @alpha
 */
export const headerClassNames: SlotClassNames<HeaderSlots> = {
	root: "fui-Header",
	content: "fui-Header__content",
	actions: "fui-Header__actions",
	expandButton: "fui-Header__expandButton",
};

const MEDIA_QUERY = "@media (max-width: 640px)";

const useStyles = makeStyles({
	root: {
		display: "flex",
		alignItems: "flex-start",
		gap: tokens.spacingHorizontalS,
	},
	start: { flexDirection: "row" },
	end: { flexDirection: "row-reverse" },
});

const useActionsStyles = makeStyles({
	base: {
		display: "flex",
		gap: tokens.spacingHorizontalS,
		gridColumn: "2",
		height: "fit-content",
		[MEDIA_QUERY]: { gridColumn: "1" },
	},
	xlarge: {
		margin: `${tokens.spacingVerticalXS} 0 0`,
		[MEDIA_QUERY]: {
			gridColumn: "1",
			margin: `${tokens.spacingVerticalMNudge} 0 0`,
		},
	},
	large: {
		/* same as base */
	},
	medium: {
		/* same as base */
	},
	small: {
		/* same as base */
	},
});

const useContentStyles = makeStyles({
	base: { display: "flex", flexDirection: "column", flexGrow: 1 },
	actions: {
		display: "grid",
		gridTemplateColumns: "1fr auto",
		columnGap: tokens.spacingHorizontalM,
		[MEDIA_QUERY]: { gridTemplateColumns: "1fr" },
	},
	start: {
		/* same as base */
	},
	center: { alignItems: "center" },
});

const useExpandButtonStyles = makeStyles({
	base: {
		/* base styles for all sizes */
	},
	xlarge: { margin: `${tokens.spacingVerticalXS} 0 0` },
	large: {
		/* same as base */
	},
	medium: {
		/* same as base */
	},
	small: {
		/* same as base */
	},
});

/**
 * Apply styling to Header component state.
 * @param state - Header state to apply styles to
 * @returns Modified state with applied styles
 * @alpha
 */
export const useHeaderStyles = (state: HeaderState): HeaderState => {
	const styles = useStyles();
	const contentStyles = useContentStyles();
	const actionsStyles = useActionsStyles();
	const expandButtonStyles = useExpandButtonStyles();

	state.root.className = mergeClasses(
		headerClassNames.root,
		styles.root,
		styles[state.expandButtonPosition],
		state.root.className,
	);

	if (state.content) {
		state.content.className = mergeClasses(
			headerClassNames.content,
			contentStyles.base,
			contentStyles[state.alignment],
			state.actions && contentStyles.actions,
			state.content.className,
		);
	}
	if (state.actions) {
		state.actions.className = mergeClasses(
			headerClassNames.actions,
			actionsStyles.base,
			actionsStyles[state.size],
			state.actions.className,
		);
	}
	if (state.expandButton) {
		state.expandButton.className = mergeClasses(
			headerClassNames.expandButton,
			expandButtonStyles.base,
			expandButtonStyles[state.size],
			state.expandButton.className,
		);
	}

	return state;
};

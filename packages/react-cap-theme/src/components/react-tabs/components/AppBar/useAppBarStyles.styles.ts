import { useTabListStyles_unstable } from "@fluentui/react-tabs";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { AppBarSlots, AppBarState } from "./AppBar.types";

/**
 * CSS class names for AppBar component slots.
 * @alpha
 */
export const appBarClassNames: SlotClassNames<AppBarSlots> = {
	root: "fui-AppBar",
};

const useStyles = makeStyles({
	root: {
		backgroundColor: tokens.colorNeutralBackground2,
		boxSizing: "border-box",
		height: "auto",
		justifyContent: "flex-start",
		padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
		width: "80px",
	},
	comfortable: {
		gap: tokens.spacingVerticalS,
	},
	compact: {
		gap: tokens.spacingVerticalM,
	},
	horizontal: {
		height: "46px",
		justifyContent: "space-between",
		padding: `${tokens.spacingVerticalNone} 48px`,
		width: "100%",
		gap: "unset",
		"@media (min-width: 320px) and (max-width: 479px)": {
			padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
		},
	},
});

/**
 * Apply styling to the AppBar slots based on the state.
 * @param state - The current AppBar state
 * @returns The updated AppBar state with applied styles
 * @alpha
 */
export const useAppBarStyles = (state: AppBarState): AppBarState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		appBarClassNames.root,
		styles.root,
		styles[state.density],
		state.horizontal && styles.horizontal,
		state.root.className,
	);

	// Create a temporary state with vertical property for FluentUI TabList styles
	const fluentState = { ...state, vertical: !state.horizontal };
	useTabListStyles_unstable(fluentState);

	return state;
};

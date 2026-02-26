import {
	toolbarGroupClassNames,
	type ToolbarSlots,
	useToolbarStyles_unstable,
} from "@fluentui/react-toolbar";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { ToolbarState } from "./Toolbar.types";

/**
 * Class names for the Toolbar component.
 * @alpha
 */
export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
	root: "fui-Toolbar",
};

const useStyles = makeStyles({
	root: {
		...shorthands.border("1px", "solid", tokens.colorTransparentStroke),
		backgroundColor: tokens.colorNeutralBackground1,
		borderRadius: tokens.borderRadiusXLarge,
		gap: tokens.spacingHorizontalSNudge,
		whiteSpace: "nowrap",
		// Styles for subcomponents
		[`& .${toolbarGroupClassNames.root}`]: {
			gap: tokens.spacingHorizontalSNudge,
		},

		"@media (forced-colors: active)": shorthands.borderColor("Canvas"),
	},

	// Appearance styles
	contextual: { boxShadow: tokens.shadow8 },
	static: {
		// same as root
	},

	// Layout styles
	start: { justifyContent: "flex-start" },
	["space-between"]: { justifyContent: "space-between" },
	end: { justifyContent: "flex-end" },

	// Size styles
	small: {
		// same as root
	},
	medium: {
		// same as root
	},
	large: {
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXL}`,
	},

	// Width styles
	contained: { display: "inline-flex", width: "fit-content" },
	full: { boxSizing: "border-box", display: "flex", width: "100%" },
});

/**
 * Apply styles to the Toolbar component.
 * Combines Fluent UI styles with CAP-specific appearance styling including contextual shadows.
 * @param state - The toolbar state containing appearance and styling information
 * @returns The updated toolbar state with applied styles
 * @alpha
 */
export const useToolbarStyles = (state: ToolbarState): ToolbarState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarClassNames.root,
		styles.root,
		styles[state.appearance],
		styles[state.layout],
		styles[state.size],
		styles[state.width],
		state.root.className,
	);

	useToolbarStyles_unstable(state);

	return state;
};

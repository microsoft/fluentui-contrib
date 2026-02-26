import type { LabelState } from "@fluentui/react-label";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Styles for the Label component.
 *
 * NOTE: The CAP design spec shows a badge slot in Label. This is a structural
 * change that requires a wrapper component. For now, this is styling-only.
 * Badge support will be added in a future iteration after alignment with design.
 * See: https://www.figma.com/design/40dstXfCx3jpvlP4prbSBQ/Component-diff-spec?node-id=4806-44413
 */
const useStyles = makeStyles({
	root: {
		// Base styles - flex layout for future badge support
		alignItems: "center",
		display: "inline-flex",
		gap: tokens.spacingHorizontalXS,
	},
	large: {
		// CAP uses regular weight for large labels (Fluent uses semibold)
		fontWeight: tokens.fontWeightRegular,
	},
	required: {
		// CAP required indicator styling
		color: tokens.colorStatusDangerForeground3,
		paddingLeft: "0",
		paddingRight: "0",
	},
});

/**
 * Apply CAP styling to the Label slots based on the state.
 * @param state - The Label component state object
 * @returns The updated state object with applied styles
 * @alpha
 */
export const useLabelStyles = (state: LabelState): LabelState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		state.root.className, // Preserve existing Fluent UI classes FIRST
		styles.root,
		state.size === "large" && styles.large,
	);

	if (state.required) {
		state.required.className = mergeClasses(
			state.required.className,
			styles.required,
		);
	}

	return state;
};

import { type DialogSurfaceState } from "@fluentui/react-dialog";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

const dialogSurfaceShadow =
	"0 0 4px 0 rgba(0,0,0,0.06), 0 24px 96px 0 rgba(0,0,0,0.36)"; // Double checking with design if these values are correct, as no shadow token in Fluent has this value

const useStyles = makeStyles({
	root: {
		border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha}`,
		boxShadow: dialogSurfaceShadow,
		borderRadius: tokens.borderRadius4XLarge,
		padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL} 28px 28px`,
		maxWidth: "480px",
	},
});

/**
 * Apply CAP styling to the DialogSurface based on the state.
 * @param state - The current DialogSurface state
 * @returns The updated DialogSurface state with applied styles
 */
export const useDialogSurfaceStyles = (
	state: DialogSurfaceState,
): DialogSurfaceState => {
	const styles = useStyles();

	state.root.className = mergeClasses(state.root.className, styles.root);

	return state;
};

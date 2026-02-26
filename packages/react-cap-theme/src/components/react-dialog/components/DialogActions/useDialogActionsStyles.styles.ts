import { type DialogActionsState } from "@fluentui/react-dialog";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { mergeClasses, makeStyles } from "@griffel/react";

const useStyles = makeStyles({
	root: {
		// DialogBody has 16px gap, we need 28px total gap above actions
		// So we add 12px extra margin-top (28 - 16 = 12)
		marginTop: tokens.spacingVerticalM,
		marginRight: tokens.spacingVerticalM,
	},
});

/**
 * Apply CAP styling to the DialogActions based on the state.
 * @param state - The current DialogActions state
 * @returns The updated DialogActions state with applied styles
 */
export const useDialogActionsStyles = (
	state: DialogActionsState,
): DialogActionsState => {
	const styles = useStyles();

	state.root.className = mergeClasses(state.root.className, styles.root);

	return state;
};

import { type DialogBodyState } from "@fluentui/react-dialog";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { mergeClasses, makeStyles } from "@griffel/react";

const useStyles = makeStyles({
	root: { gap: `${tokens.spacingVerticalL}` },
});

/**
 * Apply CAP styling to the DialogBody based on the state.
 * @param state - The current DialogBody state
 * @returns The updated DialogBody state with applied styles
 */
export const useDialogBodyStyles = (
	state: DialogBodyState,
): DialogBodyState => {
	const styles = useStyles();

	state.root.className = mergeClasses(state.root.className, styles.root);

	return state;
};

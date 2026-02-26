import type { DialogTitleState } from "@fluentui/react-dialog";
import { tokens } from "@fluentui/react-theme";
import { makeResetStyles, mergeClasses } from "@griffel/react";

/**
 * CAP styles for the action slot
 */
const useActionResetStyles = makeResetStyles({
	color: tokens.colorNeutralForeground3,
});

/**
 * Apply CAP styling to the DialogTitle slots based on the state
 */
export const useDialogTitleStyles = (
	state: DialogTitleState,
): DialogTitleState => {
	"use no memo";

	const actionResetStyles = useActionResetStyles();

	if (state.action) {
		state.action.className = mergeClasses(
			state.action.className,
			actionResetStyles,
		);
	}
	return state;
};

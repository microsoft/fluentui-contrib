import {
	type DialogTitleState,
	useDialogTitleStyles_unstable,
} from "@fluentui/react-dialog";
import { makeStyles, mergeClasses } from "@griffel/react";

const useStyles = makeStyles({
	action: {
		marginRight: "-8px",
	},
});

export const useDialogTitleStyles = (
	state: DialogTitleState,
): DialogTitleState => {
	const styles = useStyles();
	if (state.action)
		state.action.className = mergeClasses(
			styles.action,
			state.action.className,
		);
	return useDialogTitleStyles_unstable(state);
};

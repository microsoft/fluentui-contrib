import {
	type AccordionPanelState,
	useAccordionPanelStyles_unstable,
} from "@fluentui/react-accordion";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

const useStyles = makeStyles({
	root: {
		marginBottom: tokens.spacingVerticalM,
	},
});

export const useAccordionPanelStyles = (
	state: AccordionPanelState,
): AccordionPanelState => {
	const styles = useStyles();

	state.root.className = mergeClasses(styles.root, state.root.className);

	useAccordionPanelStyles_unstable(state);

	return state;
};

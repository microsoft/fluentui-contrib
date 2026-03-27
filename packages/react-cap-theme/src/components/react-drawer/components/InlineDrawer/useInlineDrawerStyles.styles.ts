import { useInlineDrawerStyles_unstable } from "@fluentui/react-drawer";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import { useDrawerBaseClassNames } from "../../shared/useDrawerBaseStyles.styles";
import type { InlineDrawerState } from "./InlineDrawer.types";

const useStyles = makeStyles({
	solid: { boxShadow: tokens.shadow2 },
	transparent: { backgroundColor: tokens.colorTransparentBackground },
});

export const useInlineDrawerStyles = (
	state: InlineDrawerState,
): InlineDrawerState => {
	const baseClassNames = useDrawerBaseClassNames(state);
	const styles = useStyles();

	state.root.className = mergeClasses(
		baseClassNames,
		styles[state.appearance],
		state.root.className,
	);

	useInlineDrawerStyles_unstable(state);
	return state;
};

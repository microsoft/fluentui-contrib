import { useTableStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { TableState, TableSlots } from "./Table.types";

/**
 * CSS class names for Table component slots.
 * @alpha
 */
export const tableClassNames: SlotClassNames<TableSlots> = {
	root: "fui-Table",
};

const useStyles = makeStyles({
	root: {
		...shorthands.padding(
			tokens.spacingVerticalS,
			tokens.spacingHorizontalS,
		),
		borderRadius: tokens.borderRadiusXLarge,
		boxShadow: tokens.shadow2,
		background: tokens.colorNeutralBackground1,
	},
});

/**
 * Applies CAP-specific styling to Table component state.
 * Provides card-like styling with padding, border radius, shadow, and background.
 *
 * @param state - The Table component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableStyles = (state: TableState): TableState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		tableClassNames.root,
		styles.root,
		state.root.className,
	);

	useTableStyles_unstable(state);

	return state;
};

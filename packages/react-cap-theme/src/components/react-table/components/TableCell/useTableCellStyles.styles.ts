import { useTableCellStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { TableCellState, TableCellSlots } from "./TableCell.types";

/**
 * CSS class names for TableCell component slots.
 * @alpha
 */
export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
	root: "fui-TableCell",
};

const useStyles = makeStyles({
	"extra-small": {
		height: "28px",
	},
	small: {
		height: "38px",
	},
	medium: {
		height: "48px",
	},
});

/**
 * Applies CAP-specific styling to TableCell component state with size-specific height adjustments.
 * Merges CAP Design System styles with base Fluent UI table cell styles.
 * @param state - The TableCell component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableCellStyles = (state: TableCellState): TableCellState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		tableCellClassNames.root,
		styles[state.size],
		state.root.className,
	);

	useTableCellStyles_unstable(state);
	return state;
};

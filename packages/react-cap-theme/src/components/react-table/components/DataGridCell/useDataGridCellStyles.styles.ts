import { useDataGridCellStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";
import { useTableCellStyles } from "../TableCell/useTableCellStyles.styles";
import type {
	DataGridCellSlots,
	DataGridCellState,
} from "./DataGridCell.types";

/**
 * CSS class names for DataGridCell component slots.
 *
 * @example
 * ```typescript
 * const className = dataGridCellClassNames.root; // 'fui-DataGridCell'
 * ```
 * @alpha
 */
export const dataGridCellClassNames: SlotClassNames<DataGridCellSlots> = {
	root: "fui-DataGridCell",
};

/**
 * Applies CAP Design System styles to DataGridCell component state.
 *
 * @example
 * ```typescript
 * const styledState = useDataGridCellStyles(state);
 * ```
 *
 * @param state - The DataGridCell state object to style
 * @returns The DataGridCell state with CAP styling applied
 * @alpha
 */
export const useDataGridCellStyles = (
	state: DataGridCellState,
): DataGridCellState => {
	useTableCellStyles(state);

	state.root.className = mergeClasses(
		dataGridCellClassNames.root,
		state.root.className,
	);

	useDataGridCellStyles_unstable(state);

	return state;
};

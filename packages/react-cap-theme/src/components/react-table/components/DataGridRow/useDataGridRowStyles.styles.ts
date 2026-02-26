import { useDataGridRowStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

import { useTableRowStyles } from "../TableRow/useTableRowStyles.styles";
import type { DataGridRowState, DataGridRowSlots } from "./DataGridRow.types";

/**
 * CSS class names for DataGridRow component slots.
 *
 * @example
 * ```typescript
 * const className = dataGridRowClassNames.root;
 * ```
 * @alpha
 */
export const dataGridRowClassNames: SlotClassNames<DataGridRowSlots> = {
	root: "fui-DataGridRow",
	selectionCell: "fui-DataGridRow__selectionCell",
};

/**
 * Applies CAP Design System styles to DataGridRow component state.
 *
 * @example
 * ```typescript
 * const styledState = useDataGridRowStyles(state);
 * ```
 *
 * @param state - The DataGridRow state object to style
 * @returns The DataGridRow state with CAP styling applied
 * @alpha
 */
export const useDataGridRowStyles = (
	state: DataGridRowState,
): DataGridRowState => {
	useTableRowStyles(state);

	state.root.className = mergeClasses(
		dataGridRowClassNames.root,
		state.root.className,
	);

	if (state.selectionCell) {
		state.selectionCell.className = mergeClasses(
			dataGridRowClassNames.selectionCell,
			state.selectionCell.className,
		);
	}

	useDataGridRowStyles_unstable(state);

	return state;
};

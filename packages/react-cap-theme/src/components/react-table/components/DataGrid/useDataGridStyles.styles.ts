import { useDataGridStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";
import { useTableStyles } from "../Table/useTableStyles.styles";
import type { DataGridSlots, DataGridState } from "./DataGrid.types";

/**
 * CSS class names for DataGrid component slots.
 * @alpha
 */
export const dataGridClassNames: SlotClassNames<DataGridSlots> = {
	root: "fui-DataGrid",
};

/**
 * Applies CAP Design System styles to DataGrid component state.
 * @param state - The DataGrid state object to style
 * @returns The DataGrid state with CAP styling applied
 * @alpha
 */
export const useDataGridStyles = (state: DataGridState): DataGridState => {
	useTableStyles(state);
	state.root.className = mergeClasses(
		dataGridClassNames.root,
		state.root.className,
	);

	useDataGridStyles_unstable(state);

	return state;
};

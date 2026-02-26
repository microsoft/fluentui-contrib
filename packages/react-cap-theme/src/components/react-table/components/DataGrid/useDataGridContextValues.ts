import { useDataGridContextValues_unstable } from "@fluentui/react-table";
import type { DataGridContextValues, DataGridState } from "./DataGrid.types";

/**
 * Creates context values for DataGrid component including table and DataGrid-specific contexts.
 *
 * @example
 * ```typescript
 * const contextValues = useDataGridContextValues(state);
 * ```
 *
 * @param state - The DataGrid state object
 * @returns Context values for DataGrid and Table providers
 * @alpha
 */
export function useDataGridContextValues(
	state: DataGridState,
): DataGridContextValues {
	const baseContextValues = useDataGridContextValues_unstable(state);
	const values = {
		...baseContextValues,
		table: {
			...baseContextValues.table,
			hideDivider: state.hideDivider,
		},
	};
	return values;
}

import type { DataGridRowState as BaseDataGridRowState } from "@fluentui/react-table";
import type { TableRowState } from "../TableRow/TableRow.types";

export type { DataGridRowSlots, DataGridRowProps } from "@fluentui/react-table";

/**
 * State object for DataGridRow component extending base DataGrid row with CAP table features.
 *
 * @example
 * ```typescript
 * const state: DataGridRowState = {
 *   hideDivider: true,
 *   root: { className: 'fui-DataGridRow' }
 * };
 * ```
 * @alpha
 */
export type DataGridRowState = BaseDataGridRowState &
	Pick<TableRowState, "hideDivider">;

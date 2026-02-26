import type {
	DataGridProps as BaseDataGridProps,
	DataGridState as BaseDataGridState,
	DataGridContextValue,
} from "@fluentui/react-table";

import type {
	TableContextValue,
	TableContextValues,
} from "../Table/Table.types";

export type {
	DataGridSlots,
	DataGridFocusMode,
	DataGridContextValue,
} from "@fluentui/react-table";

/**
 * Context values for DataGrid component including table context.
 * @alpha
 */
export type DataGridContextValues = TableContextValues & {
	/** DataGrid-specific context value */
	dataGrid: DataGridContextValue;
};

/**
 * Properties for DataGrid component extending base DataGrid with CAP customizations.
 * @alpha
 */
export type DataGridProps = BaseDataGridProps &
	Pick<Partial<TableContextValue>, "hideDivider">;

/**
 * State object for DataGrid component containing all necessary data and configuration.
 * @alpha
 */
export type DataGridState = BaseDataGridState &
	Pick<TableContextValue, "hideDivider">;

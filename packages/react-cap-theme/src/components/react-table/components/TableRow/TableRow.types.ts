import type { TableRowState as BaseTableRowState } from "@fluentui/react-table";
import type { TableContextValue } from "../Table/Table.types";

export type { TableRowProps, TableRowSlots } from "@fluentui/react-table";

/**
 * State for CAP TableRow component.
 * @alpha
 */
export type TableRowState = BaseTableRowState &
	Pick<TableContextValue, "hideDivider">;

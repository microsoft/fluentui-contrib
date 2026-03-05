import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTableCell } from "./renderTableCell";
import type { TableCellProps } from "./TableCell.types";
import { useTableCell } from "./useTableCell";
import { useTableCellStyles } from "./useTableCellStyles.styles";

/**
 * TableCell component provides CAP-styled table cell functionality.
 * @example
 * ```tsx
 * <TableCell size="medium">Cell content</TableCell>
 * ```
 * @param props - TableCell configuration and content
 * @param ref - Reference to the TableCell root element
 * @returns The rendered TableCell component
 * @alpha
 */
export const TableCell: ForwardRefComponent<TableCellProps> = React.forwardRef(
	(props, ref) => {
		const state = useTableCell(props, ref);
		useTableCellStyles(state);
		useCustomStyleHook_unstable("useTableCellStyles_unstable")(state);
		return renderTableCell(state);
	},
);
TableCell.displayName = "TableCell";

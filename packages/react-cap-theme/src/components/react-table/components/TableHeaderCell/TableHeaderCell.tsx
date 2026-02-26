import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTableHeaderCell } from "./renderTableHeaderCell";
import type { TableHeaderCellProps } from "./TableHeaderCell.types";
import { useTableHeaderCell } from "./useTableHeaderCell";
import { useTableHeaderCellStyles } from "./useTableHeaderCellStyles.styles";

/**
 * TableHeaderCell component provides CAP-styled table header cell functionality.
 * @example
 * ```tsx
 * <TableHeaderCell>Name</TableHeaderCell>
 * ```
 * @param props - TableHeaderCell configuration and content
 * @param ref - Reference to the TableHeaderCell root element
 * @returns The rendered TableHeaderCell component
 * @alpha
 */
export const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps> =
	React.forwardRef((props, ref) => {
		const state = useTableHeaderCell(props, ref);
		useTableHeaderCellStyles(state);
		useCustomStyleHook_unstable("useTableHeaderCellStyles_unstable")(state);
		return renderTableHeaderCell(state);
	});
TableHeaderCell.displayName = "TableHeaderCell";

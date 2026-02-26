import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTableRow } from "./renderTableRow";
import type { TableRowProps } from "./TableRow.types";
import { useTableRow } from "./useTableRow";
import { useTableRowStyles } from "./useTableRowStyles.styles";

/**
 * TableRow component provides CAP-styled table row functionality.
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>Data 1</TableCell>
 *   <TableCell>Data 2</TableCell>
 * </TableRow>
 * ```
 * @param props - TableRow configuration and content
 * @param ref - Reference to the TableRow root element
 * @returns The rendered TableRow component
 * @alpha
 */
export const TableRow: ForwardRefComponent<TableRowProps> = React.forwardRef(
	(props, ref) => {
		const state = useTableRow(props, ref);
		useTableRowStyles(state);
		useCustomStyleHook_unstable("useTableRowStyles_unstable")(state);
		return renderTableRow(state);
	},
);
TableRow.displayName = "TableRow";

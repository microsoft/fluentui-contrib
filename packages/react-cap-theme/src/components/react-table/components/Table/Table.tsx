import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTable } from "./renderTable";
import type { TableProps } from "./Table.types";
import { useTable } from "./useTable";
import { useTableContextValues } from "./useTableContextValues";
import { useTableStyles } from "./useTableStyles.styles";

/**
 * CAP styled Table component that provides a structured container for tabular data.
 * Built on Fluent UI Table foundation with CAP Design System enhancements.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHeaderCell>Name</TableHeaderCell>
 *       <TableHeaderCell>Role</TableHeaderCell>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Juana Del Pueblo</TableCell>
 *       <TableCell>Developer</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 *
 * @param props - Table configuration and content
 * @param ref - Reference to the Table root element
 * @returns The rendered Table component
 * @alpha
 */
export const Table: ForwardRefComponent<TableProps> = React.forwardRef(
	(props, ref) => {
		const state = useTable(props, ref);
		useTableStyles(state);
		useCustomStyleHook_unstable("useTableStyles_unstable")(state);
		return renderTable(state, useTableContextValues(state));
	},
);
Table.displayName = "Table";

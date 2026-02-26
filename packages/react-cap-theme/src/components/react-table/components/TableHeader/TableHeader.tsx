import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTableHeader } from "./renderTableHeader";
import type { TableHeaderProps } from "./TableHeader.types";
import { useTableHeader } from "./useTableHeader";
import { useTableHeaderStyles } from "./useTableHeaderStyles.styles";

/**
 * TableHeader component provides CAP-styled table header functionality.
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableHeaderCell>Name</TableHeaderCell>
 *   <TableHeaderCell>Modified</TableHeaderCell>
 * </TableHeader>
 * ```
 * @param props - TableHeader configuration and content
 * @param ref - Reference to the TableHeader root element
 * @returns The rendered TableHeader component
 * @alpha
 */
export const TableHeader: ForwardRefComponent<TableHeaderProps> =
	React.forwardRef((props, ref) => {
		const state = useTableHeader(props, ref);
		useTableHeaderStyles(state);
		useCustomStyleHook_unstable("useTableHeaderStyles_unstable")(state);
		return renderTableHeader(state);
	});
TableHeader.displayName = "TableHeader";

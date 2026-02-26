import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTableSelectionCell } from "./renderTableSelectionCell";
import type { TableSelectionCellProps } from "./TableSelectionCell.types";
import { useTableSelectionCell } from "./useTableSelectionCell";
import { useTableSelectionCellStyles } from "./useTableSelectionCellStyles.styles";

/**
 * TableSelectionCell component provides CAP-styled table selection cell functionality.
 * @example
 * ```tsx
 * <TableSelectionCell />
 * ```
 * @param props - TableSelectionCell configuration and content
 * @param ref - Reference to the TableSelectionCell root element
 * @returns The rendered TableSelectionCell component
 * @alpha
 */
export const TableSelectionCell: ForwardRefComponent<TableSelectionCellProps> =
	React.forwardRef((props, ref) => {
		const state = useTableSelectionCell(props, ref);
		useTableSelectionCellStyles(state);
		useCustomStyleHook_unstable("useTableSelectionCellStyles_unstable")(
			state,
		);
		return renderTableSelectionCell(state);
	});
TableSelectionCell.displayName = "TableSelectionCell";

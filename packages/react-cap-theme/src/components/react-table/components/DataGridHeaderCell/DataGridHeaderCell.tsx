import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridHeaderCellProps } from "./DataGridHeaderCell.types";
import { renderDataGridHeaderCell } from "./renderDataGridHeaderCell";
import { useDataGridHeaderCell } from "./useDataGridHeaderCell";
import { useDataGridHeaderCellStyles } from "./useDataGridHeaderCellStyles.styles";

/**
 * CAP styled DataGridHeaderCell component for column headers within DataGrid.
 * Provides sortable column headers with CAP Design System styling and icons.
 *
 * @example
 * ```tsx
 * <DataGridHeaderCell>Name</DataGridHeaderCell>
 * ```
 *
 * @param props - DataGridHeaderCell configuration and content
 * @param ref - Reference to the DataGridHeaderCell root element
 * @returns The rendered DataGridHeaderCell component
 * @alpha
 */
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> =
	React.forwardRef((props, ref) => {
		const state = useDataGridHeaderCell(props, ref);
		useDataGridHeaderCellStyles(state);
		useCustomStyleHook_unstable("useDataGridHeaderCellStyles_unstable")(
			state,
		);
		return renderDataGridHeaderCell(state);
	});

DataGridHeaderCell.displayName = "DataGridHeaderCell";

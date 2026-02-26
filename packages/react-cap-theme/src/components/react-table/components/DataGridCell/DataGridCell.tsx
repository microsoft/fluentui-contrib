import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridCellProps } from "./DataGridCell.types";
import { renderDataGridCell } from "./renderDataGridCell";
import { useDataGridCell } from "./useDataGridCell";
import { useDataGridCellStyles } from "./useDataGridCellStyles.styles";

/**
 * CAP styled DataGridCell component that displays individual cell content within a DataGrid.
 * Provides structured data presentation with CAP Design System styling.
 *
 * @example
 * Basic DataGridCell usage:
 * ```tsx
 * <DataGridCell>John Doe</DataGridCell>
 * ```
 *
 * @example
 * DataGridCell with custom content:
 * ```tsx
 * <DataGridCell>
 *   <Avatar name="John Doe" />
 *   <Text>John Doe</Text>
 * </DataGridCell>
 * ```
 *
 * @param props - DataGridCell configuration and content
 * @param ref - Reference to the DataGridCell root element
 * @returns The rendered DataGridCell component
 * @alpha
 */
export const DataGridCell: ForwardRefComponent<DataGridCellProps> =
	React.forwardRef((props, ref) => {
		const state = useDataGridCell(props, ref);
		useDataGridCellStyles(state);
		useCustomStyleHook_unstable("useDataGridCellStyles_unstable")(state);
		return renderDataGridCell(state);
	});

DataGridCell.displayName = "DataGridCell";

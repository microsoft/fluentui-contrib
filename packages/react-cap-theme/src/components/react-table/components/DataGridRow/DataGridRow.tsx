import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridRowProps } from "./DataGridRow.types";
import { renderDataGridRow } from "./renderDataGridRow";
import { useDataGridRow } from "./useDataGridRow";
import { useDataGridRowStyles } from "./useDataGridRowStyles.styles";

/**
 * CAP styled DataGridRow component that represents a single row within a DataGrid.
 * Provides structured layout for data cells with CAP Design System styling.
 *
 * @example
 * ```tsx
 * <DataGridRow>
 *   <DataGridCell>John Doe</DataGridCell>
 *   <DataGridCell>Developer</DataGridCell>
 *   <DataGridCell>Engineering</DataGridCell>
 * </DataGridRow>
 * ```
 *
 * @param props - DataGridRow configuration and content
 * @param ref - Reference to the DataGridRow root element
 * @returns The rendered DataGridRow component
 * @alpha
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> =
	React.forwardRef((props, ref) => {
		const state = useDataGridRow(props, ref);
		useDataGridRowStyles(state);
		useCustomStyleHook_unstable("useDataGridRowStyles_unstable")(state);
		return renderDataGridRow(state);
	});

DataGridRow.displayName = "DataGridRow";

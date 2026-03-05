import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridProps } from "./DataGrid.types";
import { renderDataGrid } from "./renderDataGrid";
import { useDataGrid } from "./useDataGrid";
import { useDataGridContextValues } from "./useDataGridContextValues";
import { useDataGridStyles } from "./useDataGridStyles.styles";

/**
 * CAP styled DataGrid component built on Fluent UI DataGrid foundation.
 * Provides a structured table layout for displaying and managing complex data sets.
 *
 * @example
 * Basic DataGrid usage:
 * ```tsx
 * <DataGrid>
 *   <DataGridHeader>
 *     <DataGridRow>
 *       <DataGridHeaderCell>Name</DataGridHeaderCell>
 *       <DataGridHeaderCell>Role</DataGridHeaderCell>
 *     </DataGridRow>
 *   </DataGridHeader>
 *   <DataGridBody>
 *     <DataGridRow>
 *       <DataGridCell>John Doe</DataGridCell>
 *       <DataGridCell>Developer</DataGridCell>
 *     </DataGridRow>
 *   </DataGridBody>
 * </DataGrid>
 * ```
 *
 * @param props - DataGrid configuration and content
 * @param ref - Reference to the DataGrid root element
 * @returns The rendered DataGrid component
 * @alpha
 */
export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef(
	(props, ref) => {
		const state = useDataGrid(props, ref);
		useDataGridStyles(state);
		useCustomStyleHook_unstable("useDataGridStyles_unstable")(state);
		return renderDataGrid(state, useDataGridContextValues(state));
	},
);

DataGrid.displayName = "DataGrid";

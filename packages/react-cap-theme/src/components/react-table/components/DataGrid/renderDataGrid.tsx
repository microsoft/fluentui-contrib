import { DataGridContextProvider } from "@fluentui/react-table";
import type { ReactElement } from "react";
import * as React from "react";
import { renderTable } from "../Table/renderTable";
import type { DataGridContextValues, DataGridState } from "./DataGrid.types";

/**
 * Renders the final JSX for DataGrid component with proper context providers.
 *
 * @example
 * ```typescript
 * const element = renderDataGrid(state, contextValues);
 * ```
 *
 * @param state - The DataGrid state object containing all component data
 * @param contextValues - Context values for DataGrid and Table providers
 * @returns The rendered DataGrid JSX element
 * @alpha
 */
export const renderDataGrid = (
	state: DataGridState,
	contextValues: DataGridContextValues,
): ReactElement => {
	return (
		<DataGridContextProvider value={contextValues.dataGrid}>
			{renderTable(state, contextValues)}
		</DataGridContextProvider>
	);
};

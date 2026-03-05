import { useDataGrid_unstable as useBaseDataGrid } from "@fluentui/react-table";
import type * as React from "react";
import type { DataGridProps, DataGridState } from "./DataGrid.types";

/**
 * Creates the state required to render DataGrid component with CAP customizations.
 *
 * @example
 * ```typescript
 * const state = useDataGrid(props, ref);
 * ```
 *
 * @param props - DataGrid properties and configuration
 * @param ref - Reference to the DataGrid root element
 * @returns The complete DataGrid state object
 * @alpha
 */
export const useDataGrid = (
	props: DataGridProps,
	ref: React.Ref<HTMLElement>,
): DataGridState => {
	const { hideDivider = false, ...restProps } = props;

	const state = useBaseDataGrid(restProps, ref);

	return {
		...state,
		hideDivider,
	};
};

import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridHeaderProps } from "./DataGridHeader.types";
import { renderDataGridHeader } from "./renderDataGridHeader";
import { useDataGridHeader } from "./useDataGridHeader";
import { useDataGridHeaderStyles } from "./useDataGridHeaderStyles.styles";

/**
 * CAP styled DataGridHeader component that provides the header section for DataGrid.
 * Contains column headers and provides structure for sortable columns and header interactions.
 *
 * @example
 * ```tsx
 * <DataGridHeader>
 *   <DataGridRow>
 *     <DataGridHeaderCell>Name</DataGridHeaderCell>
 *     <DataGridHeaderCell>Role</DataGridHeaderCell>
 *     <DataGridHeaderCell>Department</DataGridHeaderCell>
 *   </DataGridRow>
 * </DataGridHeader>
 * ```
 *
 * @param props - DataGridHeader configuration and content
 * @param ref - Reference to the DataGridHeader root element
 * @returns The rendered DataGridHeader component
 * @alpha
 */
export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> =
	React.forwardRef((props, ref) => {
		const state = useDataGridHeader(props, ref);
		useDataGridHeaderStyles(state);
		useCustomStyleHook_unstable("useDataGridHeaderStyles_unstable")(state);
		return renderDataGridHeader(state);
	});

DataGridHeader.displayName = "DataGridHeader";

import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { DataGridSelectionCellProps } from "./DataGridSelectionCell.types";
import { renderDataGridSelectionCell } from "./renderDataGridSelectionCell";
import { useDataGridSelectionCell } from "./useDataGridSelectionCell";
import { useDataGridSelectionCellStyles } from "./useDataGridSelectionCellStyles.styles";

/**
 * CAP styled DataGridSelectionCell component for row selection within DataGrid.
 * Provides checkbox or radio button controls for single or multi-row selection.
 *
 * @example
 * ```tsx
 * <DataGridSelectionCell />
 * ```
 *
 * @param props - DataGridSelectionCell configuration and content
 * @param ref - Reference to the DataGridSelectionCell root element
 * @returns The rendered DataGridSelectionCell component
 * @alpha
 */
export const DataGridSelectionCell: ForwardRefComponent<DataGridSelectionCellProps> =
	React.forwardRef((props, ref) => {
		const state = useDataGridSelectionCell(props, ref);
		useDataGridSelectionCellStyles(state);
		useCustomStyleHook_unstable("useDataGridSelectionCellStyles_unstable")(
			state,
		);
		return renderDataGridSelectionCell(state);
	});

DataGridSelectionCell.displayName = "DataGridSelectionCell";

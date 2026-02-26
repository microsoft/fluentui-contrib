import { useDataGridRow_unstable as useBaseDataGridRow } from "@fluentui/react-table";
import { slot } from "@fluentui/react-utilities";
import type * as React from "react";
import { useTableContext } from "../../contexts/tableContext";
import { DataGridSelectionCell } from "../DataGridSelectionCell/DataGridSelectionCell";
import type { DataGridRowProps, DataGridRowState } from "./DataGridRow.types";

/**
 * Creates the state required to render DataGridRow component with CAP customizations.
 *
 * @example
 * ```typescript
 * const state = useDataGridRow(props, ref);
 * ```
 *
 * @param props - DataGridRow properties and configuration
 * @param ref - Reference to the DataGridRow root element
 * @returns The complete DataGridRow state object with CAP selection cell integration
 * @alpha
 */
export const useDataGridRow = (
	props: DataGridRowProps,
	ref: React.Ref<HTMLElement>,
): DataGridRowState => {
	const baseState = useBaseDataGridRow(props, ref);
	const { hideDivider } = useTableContext();
	const state = {
		...baseState,
		components: {
			...baseState.components,
			selectionCell: DataGridSelectionCell,
		},
		selectionCell: slot.optional(baseState.selectionCell, {
			elementType: DataGridSelectionCell,
		}),
		hideDivider,
	};

	return state;
};

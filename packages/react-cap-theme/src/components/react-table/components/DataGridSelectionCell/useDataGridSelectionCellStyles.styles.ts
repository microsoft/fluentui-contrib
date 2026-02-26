import { useDataGridSelectionCellStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

import { useTableSelectionCellStyles } from "../TableSelectionCell/useTableSelectionCellStyles.styles";
import type {
	DataGridSelectionCellState,
	DataGridSelectionCellSlots,
} from "./DataGridSelectionCell.types";

/**
 * CSS class names for DataGridSelectionCell component slots.
 *
 * @example
 * ```typescript
 * const className = dataGridSelectionCellClassNames.root;
 * ```
 * @alpha
 */
export const dataGridSelectionCellClassNames: SlotClassNames<DataGridSelectionCellSlots> =
	{
		root: "fui-DataGridSelectionCell",
		checkboxIndicator: "fui-DataGridSelectionCell__checkboxIndicator",
		radioIndicator: "fui-DataGridSelectionCell__radioIndicator",
	};

/**
 * Applies CAP Design System styles to DataGridSelectionCell component state.
 *
 * @example
 * ```typescript
 * const styledState = useDataGridSelectionCellStyles(state);
 * ```
 *
 * @param state - The DataGridSelectionCell state object to style
 * @returns The DataGridSelectionCell state with CAP styling applied
 * @alpha
 */
export const useDataGridSelectionCellStyles = (
	state: DataGridSelectionCellState,
): DataGridSelectionCellState => {
	useTableSelectionCellStyles(state);

	state.root.className = mergeClasses(
		dataGridSelectionCellClassNames.root,
		state.root.className,
	);

	if (state.checkboxIndicator) {
		state.checkboxIndicator.className = mergeClasses(
			dataGridSelectionCellClassNames.checkboxIndicator,
			state.checkboxIndicator.className,
		);
	}

	if (state.radioIndicator) {
		state.radioIndicator.className = mergeClasses(
			dataGridSelectionCellClassNames.radioIndicator,
			state.radioIndicator.className,
		);
	}

	useDataGridSelectionCellStyles_unstable(state);
	return state;
};

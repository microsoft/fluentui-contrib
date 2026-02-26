import { useDataGridHeaderCellStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

import { useTableHeaderCellStyles } from "../TableHeaderCell/useTableHeaderCellStyles.styles";
import type {
	DataGridHeaderCellState,
	DataGridHeaderCellSlots,
} from "./DataGridHeaderCell.types";

/**
 * CSS class names for DataGridHeaderCell component slots.
 *
 * @example
 * ```typescript
 * const className = dataGridHeaderCellClassNames.root;
 * ```
 * @alpha
 */
export const dataGridHeaderCellClassNames: SlotClassNames<DataGridHeaderCellSlots> =
	{
		root: "fui-DataGridHeaderCell",
		sortIcon: "fui-DataGridHeaderCell__sortIcon",
		button: "fui-DataGridHeaderCell__button",
		aside: "fui-DataGridHeaderCell__aside",
	};

/**
 * Applies CAP Design System styles to DataGridHeaderCell component state.
 *
 * @example
 * ```typescript
 * const styledState = useDataGridHeaderCellStyles(state);
 * ```
 *
 * @param state - The DataGridHeaderCell state object to style
 * @returns The DataGridHeaderCell state with CAP styling applied
 * @alpha
 */
export const useDataGridHeaderCellStyles = (
	state: DataGridHeaderCellState,
): DataGridHeaderCellState => {
	useTableHeaderCellStyles(state);

	state.root.className = mergeClasses(
		dataGridHeaderCellClassNames.root,
		state.root.className,
	);

	if (state.sortIcon) {
		state.sortIcon.className = mergeClasses(
			dataGridHeaderCellClassNames.sortIcon,
			state.sortIcon.className,
		);
	}

	if (state.button) {
		state.button.className = mergeClasses(
			dataGridHeaderCellClassNames.button,
			state.button.className,
		);
	}

	if (state.aside) {
		state.aside.className = mergeClasses(
			dataGridHeaderCellClassNames.aside,
			state.aside.className,
		);
	}

	useDataGridHeaderCellStyles_unstable(state);

	return state;
};

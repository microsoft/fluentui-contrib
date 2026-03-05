import { useDataGridHeaderStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";
import { useTableHeaderStyles } from "../TableHeader/useTableHeaderStyles.styles";
import type {
	DataGridHeaderState,
	DataGridHeaderSlots,
} from "./DataGridHeader.types";

/**
 * CSS class names for DataGridHeader component slots.
 *
 * @example
 * ```typescript
 * const className = dataGridHeaderClassNames.root;
 * ```
 * @alpha
 */
export const dataGridHeaderClassNames: SlotClassNames<DataGridHeaderSlots> = {
	root: "fui-DataGridHeader",
};

/**
 * Applies CAP Design System styles to DataGridHeader component state.
 *
 * @example
 * ```typescript
 * const styledState = useDataGridHeaderStyles(state);
 * ```
 *
 * @param state - The DataGridHeader state object to style
 * @returns The DataGridHeader state with CAP styling applied
 * @alpha
 */
export const useDataGridHeaderStyles = (
	state: DataGridHeaderState,
): DataGridHeaderState => {
	useTableHeaderStyles(state);

	state.root.className = mergeClasses(
		dataGridHeaderClassNames.root,
		state.root.className,
	);

	useDataGridHeaderStyles_unstable(state);
	return state;
};

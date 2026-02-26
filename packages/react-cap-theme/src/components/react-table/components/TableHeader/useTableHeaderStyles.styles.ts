import { useTableHeaderStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";
import type { TableHeaderState, TableHeaderSlots } from "./TableHeader.types";

/**
 * CSS class names for TableHeader component slots.
 * @alpha
 */
export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
	root: "fui-TableHeader",
};

/**
 * Applies CAP-specific styling to TableHeader component state.
 * @param state - The TableHeader component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableHeaderStyles = (
	state: TableHeaderState,
): TableHeaderState => {
	state.root.className = mergeClasses(
		tableHeaderClassNames.root,
		state.root.className,
	);

	useTableHeaderStyles_unstable(state);
	return state;
};

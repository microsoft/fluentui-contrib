import * as React from "react";
import type { TableState, TableContextValues } from "./Table.types";

/**
 * Provides context values for Table component including CAP-specific hideDivider functionality.
 * Creates memoized context values that are passed to Table descendant components.
 *
 * @param state - The Table component state
 * @returns Context values object containing table configuration
 * @alpha
 */
export const useTableContextValues = (
	state: TableState,
): TableContextValues => {
	const { size, noNativeElements, sortable, hideDivider } = state;

	const tableContext = React.useMemo(
		() => ({
			size,
			noNativeElements,
			sortable,
			hideDivider,
		}),
		[size, noNativeElements, sortable, hideDivider],
	);

	return {
		table: tableContext,
	};
};

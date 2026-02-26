import { useTableRow_unstable as useBaseTableRow } from "@fluentui/react-table";
import type * as React from "react";
import { useTableContext } from "../../contexts/tableContext";
import type { TableRowProps, TableRowState } from "./TableRow.types";

/**
 * Provides state for TableRow component with CAP-specific hideDivider functionality.
 * @param props - TableRow configuration properties
 * @param ref - Reference to the TableRow root element
 * @returns State object for TableRow component
 * @alpha
 */
export const useTableRow = (
	props: TableRowProps,
	ref: React.Ref<HTMLElement>,
): TableRowState => {
	const { hideDivider } = useTableContext();
	const baseState = useBaseTableRow(props, ref);

	return {
		...baseState,
		hideDivider,
	};
};

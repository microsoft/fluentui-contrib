import { useTable_unstable as useBaseTable } from "@fluentui/react-table";
import type * as React from "react";
import type { TableProps, TableState } from "./Table.types";

/**
 * Creates CAP Table component state with hideDivider functionality.
 * Extends Fluent UI's useTable_unstable with CAP-specific customizations.
 *
 * @param props - Table component props including hideDivider option
 * @param ref - Reference to the table root element
 * @returns Table state with CAP enhancements
 *
 * @alpha
 */
export const useTable = (
	props: TableProps,
	ref: React.Ref<HTMLElement>,
): TableState => {
	const { hideDivider, ...restProps } = props;

	const baseState = useBaseTable(restProps, ref);

	const state: TableState = {
		...baseState,
		hideDivider: hideDivider ?? false,
	};
	return state;
};

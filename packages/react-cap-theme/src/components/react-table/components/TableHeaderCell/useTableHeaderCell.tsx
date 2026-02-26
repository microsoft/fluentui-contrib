import { useTableHeaderCell_unstable as useBaseTableHeaderCell } from "@fluentui/react-table";
import { slot } from "@fluentui/react-utilities";
import {
	ArrowUpRegular,
	ArrowDownRegular,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";

import type {
	TableHeaderCellProps,
	TableHeaderCellState,
} from "./TableHeaderCell.types";

// TODO: fully support customing sort icons in the future
// For now, it's hard to customize the sort icons with correct direction
const sortIcons = {
	ascending: <ArrowUpRegular fontSize={16} />,
	descending: <ArrowDownRegular fontSize={16} />,
};

/**
 * Provides state for TableHeaderCell component with CAP-specific sort icons.
 * Extends base Fluent UI TableHeaderCell state with custom sort icon handling.
 * @param props - TableHeaderCell configuration properties
 * @param ref - Reference to the TableHeaderCell root element
 * @returns State object for TableHeaderCell component
 * @alpha
 */
export const useTableHeaderCell = (
	props: TableHeaderCellProps,
	ref: React.Ref<HTMLElement>,
): TableHeaderCellState => {
	const baseState = useBaseTableHeaderCell(props, ref);

	const state: TableHeaderCellState = {
		...baseState,
		sortIcon: slot.optional(props.sortIcon, {
			renderByDefault: !!props.sortDirection,
			elementType: "span",
			defaultProps: {
				children: props.sortDirection
					? sortIcons[props.sortDirection]
					: undefined,
			},
		}),
	};

	return state;
};

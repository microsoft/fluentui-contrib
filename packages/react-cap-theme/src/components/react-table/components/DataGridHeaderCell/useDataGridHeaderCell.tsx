import {
	useDataGridHeaderCell_unstable as useBaseDataGridHeaderCell,
	useDataGridContext_unstable,
	useColumnIdContext,
} from "@fluentui/react-table";
import { slot } from "@fluentui/react-utilities";
import {
	ArrowUpRegular,
	ArrowDownRegular,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";
import type {
	DataGridHeaderCellProps,
	DataGridHeaderCellState,
} from "./DataGridHeaderCell.types";

const sortIcons = {
	ascending: <ArrowUpRegular fontSize={16} />,
	descending: <ArrowDownRegular fontSize={16} />,
};

/**
 * Creates the state required to render DataGridHeaderCell component with CAP sort icons.
 *
 * @example
 * ```typescript
 * const state = useDataGridHeaderCell(props, ref);
 * ```
 *
 * @param props - DataGridHeaderCell properties and configuration
 * @param ref - Reference to the DataGridHeaderCell root element
 * @returns The complete DataGridHeaderCell state object with CAP sort icons
 * @alpha
 */
export const useDataGridHeaderCell = (
	props: DataGridHeaderCellProps,
	ref: React.Ref<HTMLElement>,
): DataGridHeaderCellState => {
	const baseState = useBaseDataGridHeaderCell(props, ref);
	const columnId = useColumnIdContext();
	const sortDirection = useDataGridContext_unstable((ctx) =>
		baseState.sortable ? ctx.sort.getSortDirection(columnId) : undefined,
	);

	const state: DataGridHeaderCellState = {
		...baseState,
		sortIcon: slot.optional(props.sortIcon, {
			renderByDefault: !!sortDirection,
			elementType: "span",
			defaultProps: {
				children: sortDirection ? sortIcons[sortDirection] : undefined,
			},
		}),
	};

	return state;
};

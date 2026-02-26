import {
	useTableHeaderCellStyles_unstable,
	tableResizeHandleClassNames,
} from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type {
	TableHeaderCellState,
	TableHeaderCellSlots,
} from "./TableHeaderCell.types";

/**
 * CSS class names for TableHeaderCell component slots.
 * @alpha
 */
export const tableHeaderCellClassNames: SlotClassNames<TableHeaderCellSlots> = {
	root: "fui-TableHeaderCell",
	sortIcon: "fui-TableHeaderCell__sortIcon",
	button: "fui-TableHeaderCell__button",
	aside: "fui-TableHeaderCell__aside",
};

const useStyles = makeStyles({
	root: {
		paddingTop: tokens.spacingVerticalXXS,
		paddingBottom: tokens.spacingVerticalXXS,
		borderRadius: tokens.borderRadiusXLarge,
		fontWeight: tokens.fontWeightSemibold,
	},
	button: {
		gap: tokens.spacingHorizontalS,
	},
	aside: {
		[`& .${tableResizeHandleClassNames.root}`]: {
			top: tokens.spacingVerticalS,
			bottom: tokens.spacingVerticalS,
		},
	},
});

/**
 * Applies CAP-specific styling to TableHeaderCell component state.
 * @param state - The TableHeaderCell component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableHeaderCellStyles = (
	state: TableHeaderCellState,
): TableHeaderCellState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		tableHeaderCellClassNames.root,
		styles.root,
		state.root.className,
	);

	state.button.className = mergeClasses(
		tableHeaderCellClassNames.button,
		styles.button,
		state.button.className,
	);

	if (state.sortIcon) {
		state.sortIcon.className = mergeClasses(
			tableHeaderCellClassNames.sortIcon,
			state.sortIcon.className,
		);
	}

	if (state.aside) {
		state.aside.className = mergeClasses(
			tableHeaderCellClassNames.aside,
			styles.aside,
			state.aside.className,
		);
	}

	useTableHeaderCellStyles_unstable(state);
	return state;
};

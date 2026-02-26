import { useTableSelectionCellStyles_unstable } from "@fluentui/react-table";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type {
	TableSelectionCellState,
	TableSelectionCellSlots,
} from "./TableSelectionCell.types";

/**
 * CSS class names for TableSelectionCell component slots.
 * @alpha
 */
export const tableSelectionCellClassNames: SlotClassNames<TableSelectionCellSlots> =
	{
		root: "fui-TableSelectionCell",
		checkboxIndicator: "fui-TableSelectionCell__checkboxIndicator",
		radioIndicator: "fui-TableSelectionCell__radioIndicator",
	};

const useStyles = makeStyles({
	checked: {
		"& + *": {
			// Adjust font weight for primary cell when selected
			fontWeight: tokens.fontWeightSemibold,
		},
	},
	checkboxIndicator: {
		...shorthands.padding(
			tokens.spacingVerticalXXS,
			tokens.spacingHorizontalXXS,
		),
		borderRadius: tokens.borderRadiusXLarge,
	},
});

/**
 * Applies CAP-specific styling to TableSelectionCell component state.
 * @param state - The TableSelectionCell component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableSelectionCellStyles = (
	state: TableSelectionCellState,
): TableSelectionCellState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		tableSelectionCellClassNames.root,
		state.checked && styles.checked,
		state.root.className,
	);

	if (state.checkboxIndicator) {
		state.checkboxIndicator.className = mergeClasses(
			tableSelectionCellClassNames.checkboxIndicator,
			styles.checkboxIndicator,
			state.checkboxIndicator.className,
		);
	}

	if (state.radioIndicator) {
		state.radioIndicator.className = mergeClasses(
			tableSelectionCellClassNames.radioIndicator,
			state.radioIndicator.className,
		);
	}

	useTableSelectionCellStyles_unstable(state);
	return state;
};

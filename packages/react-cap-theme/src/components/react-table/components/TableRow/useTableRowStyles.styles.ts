import { useTableRowStyles_unstable } from "@fluentui/react-table";
import { createCustomFocusIndicatorStyle } from "@fluentui/react-tabster";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { TableRowState, TableRowSlots } from "./TableRow.types";

/**
 * CSS class names for TableRow component slots.
 * @alpha
 */
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
	root: "fui-TableRow",
};

const borderRadius = tokens.borderRadiusXLarge;

const useStyles = makeStyles({
	root: {
		borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
	},
	headerRow: { padding: `${tokens.spacingVerticalSNudge} 0` },
	tableRow: {
		marginBottom: tokens.spacingVerticalNone,
		...createCustomFocusIndicatorStyle({ borderRadius: borderRadius }),
	},
	hideDivider: {
		borderBottomColor: tokens.colorTransparentStroke,
	},
	brand: {
		borderRadius: borderRadius,
		border: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
		":hover": {
			backgroundColor: tokens.colorBrandBackground2Hover,
			...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
		},
	},
	neutral: {
		borderRadius: borderRadius,
		border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStrokeAccessible}`,
		":hover": {
			...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
		},
	},
	none: {},
	unSelected: {
		":hover": {
			borderRadius: borderRadius,
			borderBottomColor: tokens.colorTransparentStroke,
		},
		":last-child": { borderBottomColor: tokens.colorTransparentStroke },
		":has(+ :hover)": { borderBottomColor: tokens.colorTransparentStroke }, // If next row is hovered
		":has(+ :focus)": { borderBottomColor: tokens.colorTransparentStroke }, // If next row is focused
		':has(+ [aria-selected="true"])': {
			borderBottomColor: tokens.colorTransparentStroke,
		}, // If next row is selected

		"@media (forced-colors: active)": {
			":hover": { borderRadius: tokens.borderRadiusNone },
		},
	},
});

/**
 * Applies CAP-specific styling to TableRow component state.
 * @param state - The TableRow component state
 * @returns Modified state with applied CAP styles
 * @alpha
 */
export const useTableRowStyles = (state: TableRowState): TableRowState => {
	const styles = useStyles();
	const isSelected =
		state.root["aria-selected"] === true ||
		state.root["aria-selected"] === "true";

	state.root.className = mergeClasses(
		tableRowClassNames.root,
		styles.root,
		state.isHeaderRow ? styles.headerRow : styles.tableRow,
		!state.isHeaderRow && !isSelected && styles.unSelected,
		state.hideDivider && styles.hideDivider,
		styles[state.appearance],
		state.root.className,
	);

	useTableRowStyles_unstable(state);
	return state;
};

import type {
	TableProps as BaseTableProps,
	TableState as BaseTableState,
	TableContextValue as BaseTableContextValue,
} from "@fluentui/react-table";

/**
 * Extended table context value with CAP-specific customizations.
 * @alpha
 */
export type TableContextValue = BaseTableContextValue & {
	/**
	 * Whether to hide row dividers
	 * @default false
	 */
	hideDivider: boolean;
};

/**
 * Context values provided to Table descendant components.
 * @alpha
 */
export type TableContextValues = {
	table: TableContextValue;
};

/**
 * Props for CAP Table component.
 * @alpha
 */
export type TableProps = BaseTableProps &
	Pick<Partial<TableContextValue>, "hideDivider">;

/**
 * State for CAP Table component.
 * @alpha
 */
export type TableState = BaseTableState &
	Pick<TableContextValue, "hideDivider">;

export type { TableSlots } from "@fluentui/react-table";

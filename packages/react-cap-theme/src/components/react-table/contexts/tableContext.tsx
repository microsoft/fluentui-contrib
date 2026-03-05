import {
	TableContextProvider as BaseTableContextProvider,
	useTableContext as useBaseTableContext,
	type TableContextValue as BaseTableContextValue,
} from "@fluentui/react-table";
import type { ReactElement } from "react";
import * as React from "react";
import type { TableContextValue } from "../components/Table/Table.types";

type ExtendedTableContextValue = Omit<
	TableContextValue,
	keyof BaseTableContextValue
>;
const extendedTableContext = React.createContext<
	ExtendedTableContextValue | undefined
>(undefined);

/**
 * Default values for extended table context properties.
 * @alpha
 */
export const extendedTableContextDefaultValue: ExtendedTableContextValue = {
	hideDivider: false,
};

type TableContextProviderProps = {
	value: TableContextValue;
	children: React.ReactNode;
};

/**
 * Extended TableContextProvider that wraps Fluent's provider and adds custom properties.
 * This ensures that:
 * 1. Fluent UI components receive the base context through their original provider
 * 2. Custom components receive the extended context through our extended hook
 * 3. Both contexts are synchronized and available
 * @param props - Provider configuration with value and children
 * @returns JSX element wrapping children with dual context providers
 * @alpha
 */
export const TableContextProvider = (
	props: TableContextProviderProps,
): ReactElement => {
	const { children, value } = props;
	const { hideDivider, ...baseValue } = value;

	const extendedValue = {
		hideDivider,
	};

	return (
		<BaseTableContextProvider value={baseValue}>
			<extendedTableContext.Provider value={extendedValue}>
				{children}
			</extendedTableContext.Provider>
		</BaseTableContextProvider>
	);
};

/**
 * Extended useTableContext hook that combines Fluent's base context with our custom properties.
 * This hook returns the complete extended context including both base and custom properties.
 * @returns Complete table context with both base and extended properties
 * @alpha
 */
export const useTableContext = (): TableContextValue => {
	const baseContext = useBaseTableContext();

	const extendedContext =
		React.useContext(extendedTableContext) ??
		extendedTableContextDefaultValue;

	const combinedContext: TableContextValue = {
		...baseContext,
		...extendedContext,
	};

	return combinedContext;
};

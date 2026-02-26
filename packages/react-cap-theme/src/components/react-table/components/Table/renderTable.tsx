/** @jsx createElement */
/** @jsxFrag */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime";
import { assertSlots } from "@fluentui/react-utilities";
import type * as React from "react";
import { TableContextProvider } from "../../contexts/tableContext";
import type { TableState, TableContextValues, TableSlots } from "./Table.types";

/**
 * Renders the Table component with CAP context provider.
 * Wraps the table root element with TableContextProvider to provide CAP-specific context values.
 *
 * @param state - The Table component state
 * @param contextValues - Context values to provide to descendant components
 * @returns The rendered Table React element
 * @alpha
 */
export const renderTable = (
	state: TableState,
	contextValues: TableContextValues,
): React.ReactElement => {
	assertSlots<TableSlots>(state);

	return (
		<TableContextProvider value={contextValues.table}>
			<state.root />
		</TableContextProvider>
	);
};

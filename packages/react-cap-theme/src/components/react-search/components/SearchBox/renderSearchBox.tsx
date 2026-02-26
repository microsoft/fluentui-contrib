/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime";
import { assertSlots } from "@fluentui/react-utilities";
import type React from "react";

import type { SearchBoxState, SearchBoxSlots } from "./SearchBox.types";

/**
 * Render the final JSX of SearchBox component.
 * @param state - The current SearchBox state
 * @returns The rendered SearchBox JSX element
 * @alpha
 */
export const renderSearchBox: React.FC<SearchBoxState> = (state) => {
	assertSlots<SearchBoxSlots>(state);

	return (
		<state.root>
			{state.contentBefore && <state.contentBefore />}
			<state.input />
			{state.separator && <state.separator />}
			{state.contentAfter && (
				<state.contentAfter>
					{state.dismiss && <state.dismiss />}
					{state.contentAfter.children}
				</state.contentAfter>
			)}
		</state.root>
	);
};

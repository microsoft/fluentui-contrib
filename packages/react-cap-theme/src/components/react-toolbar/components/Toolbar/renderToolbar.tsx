/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import {
	type ToolbarSlots,
	renderToolbar_unstable,
} from "@fluentui/react-toolbar";
import { assertSlots } from "@fluentui/react-utilities";

import type { ToolbarContextValues, ToolbarState } from "./Toolbar.types";
import { ToolbarProvider } from "./ToolbarContext";

/**
 * Render the final JSX of Toolbar
 * @param state - The toolbar state containing component configuration
 * @param contextValues - Context values to provide to toolbar children
 * @returns JSX.Element representing the rendered toolbar with context
 * @alpha
 */
export const renderToolbar = (
	state: ToolbarState,
	contextValues: ToolbarContextValues,
): JSX.Element => {
	assertSlots<ToolbarSlots>(state);

	return (
		<ToolbarProvider value={contextValues}>
			{renderToolbar_unstable(state, contextValues)}
		</ToolbarProvider>
	);
};

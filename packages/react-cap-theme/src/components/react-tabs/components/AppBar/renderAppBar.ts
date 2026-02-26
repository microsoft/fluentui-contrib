import { renderTabList_unstable } from "@fluentui/react-tabs";
import type { AppBarState } from "./AppBar.types";

/**
 * Render the final JSX of AppBar component.
 * @param state - The current AppBar state
 * @param contextValues - Context values for the AppBar
 * @returns The rendered AppBar JSX element
 * @alpha
 */
export const renderAppBar = (
	state: AppBarState,
	contextValues: any,
): JSX.Element => {
	// Create a temporary state with vertical property for FluentUI TabList render
	const fluentState = { ...state, vertical: !state.horizontal };
	return renderTabList_unstable(fluentState, contextValues);
};

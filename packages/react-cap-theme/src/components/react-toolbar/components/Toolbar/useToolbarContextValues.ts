import type { ToolbarContextValue } from "@fluentui/react-toolbar";
import type { ToolbarContextValues, ToolbarState } from "./Toolbar.types";

/**
 * Creates context values for the Toolbar component.
 * @param state - The toolbar state containing size, handlers, and configuration
 * @returns Context values for toolbar components including size and event handlers
 * @alpha
 */
export function useToolbarContextValues(
	state: ToolbarState,
): ToolbarContextValues {
	const {
		appearance,
		size,
		checkedValues,
		vertical,
		handleRadio,
		handleToggleButton,
	} = state;
	const toolbar: ToolbarContextValue = {
		checkedValues,
		size,
		vertical,
		handleRadio,
		handleToggleButton,
	};

	return { toolbar, appearance };
}

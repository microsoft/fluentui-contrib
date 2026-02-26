import { useTabListContextValues_unstable } from "@fluentui/react-tabs";
import type { AppBarContextValues } from "../../AppBar";
import type { AppBarState } from "./AppBar.types";

/**
 * Creates context values for the AppBar component.
 * @param state - The current AppBar state
 * @returns Context values for the AppBar component
 * @alpha
 */
export const useAppBarContextValues = (
	state: AppBarState,
): AppBarContextValues => {
	// Create a temporary state with vertical property for FluentUI TabList context
	const fluentState = { ...state, vertical: !state.horizontal };
	return useTabListContextValues_unstable(fluentState);
};

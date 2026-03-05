import {
	type ContextSelector,
	createContext,
	useContextSelector,
} from "@fluentui/react-context-selector";
import type { ToolbarContextValue } from "@fluentui/react-toolbar";
import type { ToolbarContextValues } from "./Toolbar.types";

const toolbar: ToolbarContextValue = {
	size: "medium",
	handleToggleButton: () => null,
	handleRadio: () => null,
	vertical: false,
	checkedValues: {},
};

/**
 * Default context values for Toolbar
 * @alpha
 */
export const toolbarContextDefaultValue: ToolbarContextValues = {
	toolbar,
	appearance: "contextual",
};

const ToolbarContext = createContext<ToolbarContextValues | undefined>(
	undefined,
);

/**
 * Context provider for Toolbar components
 * @alpha
 */
export const ToolbarProvider = ToolbarContext.Provider;

/**
 * Hook to access Toolbar context values
 * @param selector - Function to select specific values from the toolbar context
 * @returns The selected value from the toolbar context
 * @alpha
 */
export const useToolbarContext = <T>(
	selector: ContextSelector<ToolbarContextValues, T>,
): T =>
	useContextSelector(ToolbarContext, (ctx = toolbarContextDefaultValue) =>
		selector(ctx),
	);

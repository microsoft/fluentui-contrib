import * as React from "react";
import type { HeaderContextValues, HeaderState } from "./Header.types";

const HeaderContext = React.createContext<HeaderContextValues | undefined>(
	undefined,
) as React.Context<HeaderContextValues>;

const headerContextDefaultValue: HeaderContextValues = {
	alignment: "start",
	collapsible: false,
	open: true,
	size: "xlarge",
};

/**
 * Provider component for Header context.
 * @alpha
 */
export const { Provider: HeaderProvider } = HeaderContext;

/**
 * Hook to access Header context values.
 * @returns Header context values or default values if not in context
 * @alpha
 */
export const useHeaderContext = (): HeaderContextValues => {
	return React.useContext(HeaderContext) ?? headerContextDefaultValue;
};

/**
 * Creates context values from Header state.
 * @param state - Header state containing context-relevant properties
 * @returns Context values extracted from state
 * @alpha
 */
export const useHeaderContextValues = (
	state: HeaderState,
): HeaderContextValues => {
	const { alignment, collapsible, open, size } = state;
	return { alignment, collapsible, open, size };
};

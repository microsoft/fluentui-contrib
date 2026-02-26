/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";

import type {
	HeaderContextValues,
	HeaderState,
	HeaderSlots,
} from "./Header.types";
import { HeaderProvider } from "./HeaderContext";

/**
 * Renders a Header component by passing the state defined props to the appropriate slots.
 * @param state - The state object containing slot configurations and props
 * @param contextValues - Context values to provide to child components
 * @returns JSX element representing the rendered Header
 * @alpha
 */
export const renderHeader = (
	state: HeaderState,
	contextValues: HeaderContextValues,
): JSX.Element => {
	assertSlots<HeaderSlots>(state);

	return (
		<HeaderProvider value={contextValues}>
			<state.root>
				{state.expandButton && <state.expandButton />}
				<state.content>
					{state.root.children}
					{state.actions && <state.actions />}
				</state.content>
			</state.root>
		</HeaderProvider>
	);
};

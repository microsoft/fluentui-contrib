/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type { SplitButtonSlots, SplitButtonState } from "./SplitButton.types";

/**
 * Renders the CAP SplitButton component.
 * @param state - The SplitButton state object
 * @returns The rendered SplitButton element
 * @alpha
 */
export const renderSplitButton = (state: SplitButtonState): JSX.Element => {
	assertSlots<SplitButtonSlots>(state);

	return (
		<state.root>
			{state.primaryActionButton && <state.primaryActionButton />}
			{state.menuButton && <state.menuButton />}
		</state.root>
	);
};

/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type { ReactElement } from "react";

import type {
	HeaderSubTextSlots,
	HeaderSubTextState,
} from "./HeaderSubText.types";

/**
 * Renders a HeaderSubText component by passing the state defined props to the appropriate slots.
 * @param state - The state object containing slot configurations and props
 * @returns JSX element representing the rendered HeaderSubText
 * @alpha
 */
export const renderHeaderSubText = (state: HeaderSubTextState): ReactElement => {
	assertSlots<HeaderSubTextSlots>(state);

	return state.collapsible && state.collapseMotion ? (
		<state.collapseMotion>
			<state.root />
		</state.collapseMotion>
	) : (
		<state.root />
	);
};

/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type { ReactElement } from "react";

import type { HeaderTitleState, HeaderTitleSlots } from "./HeaderTitle.types";

/**
 * Renders a HeaderTitle component by passing the state defined props to the appropriate slots.
 * @param state - The state object containing slot configurations and props
 * @returns JSX element representing the rendered HeaderTitle
 * @alpha
 */
export const renderHeaderTitle = (state: HeaderTitleState): ReactElement => {
	assertSlots<HeaderTitleSlots>(state);

	return <state.root />;
};

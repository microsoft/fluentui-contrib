/** @jsx createElement */
/** @jsxRuntime classic */

import { createElement } from "@fluentui/react-jsx-runtime"; // createElement custom JSX pragma is required to support slot creation
import { assertSlots } from "@fluentui/react-utilities";
import type { ReactElement } from "react";
import { renderRadioGroup_unstable } from "../../index";
import type {
	RadioGroupContextValues,
	RadioGroupSlots,
	RadioGroupState,
} from "./RadioGroup.types";
import { RadioGroupProvider } from "./RadioGroupContext";

/**
 * Renders a RadioGroup component by passing the state defined props to the appropriate slots.
 * @param state - The state object containing slot configurations and props
 * @param contextValues - Context values to provide to child components
 * @returns JSX element representing the rendered RadioGroup
 * @alpha
 */
export const renderRadioGroup = (
	state: RadioGroupState,
	contextValues: RadioGroupContextValues,
): ReactElement => {
	assertSlots<RadioGroupSlots>(state);

	return (
		<RadioGroupProvider value={contextValues.local}>
			{renderRadioGroup_unstable(state, contextValues.base)}
		</RadioGroupProvider>
	);
};

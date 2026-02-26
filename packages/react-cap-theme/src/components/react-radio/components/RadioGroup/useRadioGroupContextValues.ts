import { useRadioGroupContextValues as useBaseRadioGroupContextValues } from "@fluentui/react-radio";
import * as React from "react";
import type {
	RadioGroupContextValue,
	RadioGroupContextValues,
	RadioGroupState,
} from "./RadioGroup.types";

/**
 * Hook to derive context values for the RadioGroup component from its state.
 * @param state - The current state of the RadioGroup component.
 * @returns The context values derived from the state.
 * @internal
 */
export const useRadioGroupContextValues = (
	state: RadioGroupState,
): RadioGroupContextValues => {
	const { color, ...baseState } = state;
	const base = useBaseRadioGroupContextValues(baseState);
	const local = React.useMemo<RadioGroupContextValue>(
		() => ({ color }),
		[color],
	);

	return { base, local };
};

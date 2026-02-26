import { useRadioGroupStyles_unstable } from "@fluentui/react-radio";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { RadioGroupProps } from "./RadioGroup.types";
import { renderRadioGroup } from "./renderRadioGroup";
import { useRadioGroup } from "./useRadioGroup";
import { useRadioGroupContextValues } from "./useRadioGroupContextValues";

/**
 * The RadioGroup component allows users to select one option from a set.
 *
 * @param props - The props for the RadioGroup component.
 * @param ref - Ref to the root element of the RadioGroup.
 * @returns The rendered RadioGroup component.
 * @alpha
 */
export const RadioGroup: ForwardRefComponent<RadioGroupProps> =
	React.forwardRef((props, ref) => {
		const state = useRadioGroup(props, ref);
		const contextValues = useRadioGroupContextValues(state);

		useRadioGroupStyles_unstable(state);
		useCustomStyleHook_unstable("useRadioGroupStyles_unstable")(state);

		return renderRadioGroup(state, contextValues);
	});

RadioGroup.displayName = "RadioGroup";

import { renderCheckbox_unstable } from "@fluentui/react-checkbox";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./useCheckbox";
import { useCheckboxStyles } from "./useCheckboxStyles.styles";

/**
 * Experimental Checkbox component that provides enhanced styling and behavior for CAP.
 *
 * @param props - The checkbox configuration and event handlers
 * @param ref - Reference to the checkbox input element
 * @returns The rendered checkbox component
 * @alpha
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef(
	(props, ref) => {
		const state = useCheckbox(props, ref);

		useCheckboxStyles(state);

		return renderCheckbox_unstable(state);
	},
);

Checkbox.displayName = "Checkbox";

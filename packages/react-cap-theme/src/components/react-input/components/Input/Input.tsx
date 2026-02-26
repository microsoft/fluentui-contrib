import { renderInput_unstable } from "@fluentui/react-input";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import type { InputProps } from "./Input.types";
import { useInput } from "./useInput";
import { useInputStyles } from "./useInputStyles.styles";

/**
 * The Input component allows people to enter and edit text.
 *
 * @example
 * ```tsx
 * <Input placeholder='Your email address' value='JohnSmith' contentAfter='@outlook.com' />
 * ```
 *
 * @alpha
 */
export const Input: ForwardRefComponent<InputProps> = forwardRef(
	(props, ref) => {
		const state = useInput(props, ref);

		useInputStyles(state);

		return renderInput_unstable(state);
	},
);

Input.displayName = "Input";

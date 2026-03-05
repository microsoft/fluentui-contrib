import { useInput_unstable } from "@fluentui/react-input";
import type { ForwardedRef } from "react";

import type { InputProps, InputState } from "./Input.types";

/**
 * Create the state required to render Input component.
 * @param props - Props from this instance of Input
 * @param ref - Reference to the HTMLInputElement (not root) of Input
 * @returns The Input state object
 * @alpha
 */
export const useInput = (
	props: InputProps,
	ref: ForwardedRef<HTMLInputElement>,
): InputState => {
	const { color, ...rest } = props;
	const baseState = useInput_unstable(rest, ref);

	return {
		...baseState,
		color: color || "brand",
	};
};

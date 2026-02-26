import { useCheckbox_unstable as useBaseState } from "@fluentui/react-checkbox";
import type { CheckboxProps, CheckboxState } from "./Checkbox.types";

/**
 * Creates the state required to render Checkbox component.
 * @param props - User provided props to the Checkbox component
 * @param ref - User provided ref to be passed to the Checkbox component
 * @returns The Checkbox state object
 * @alpha
 */
export const useCheckbox = (
	props: CheckboxProps,
	ref: React.Ref<HTMLInputElement>,
): CheckboxState => {
	const { color = "brand", ...baseProps } = props;
	return {
		...useBaseState(baseProps, ref),
		color,
	};
};

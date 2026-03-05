import { useRadioGroup_unstable } from "@fluentui/react-radio";
import type { RadioGroupProps, RadioGroupState } from "./RadioGroup.types";
import { radioGroupContextDefaultValues } from "./RadioGroupContext";

/**
 * Create state for the RadioGroup component based on props.
 *
 * @param props - Properties for the RadioGroup component
 * @param ref - Reference to root element
 * @returns State for the RadioGroup component
 * @alpha
 */
export const useRadioGroup = (
	props: RadioGroupProps,
	ref: React.Ref<HTMLDivElement>,
): RadioGroupState => {
	const defaultValues = radioGroupContextDefaultValues;
	const { color = defaultValues.color, ...rest } = props;

	const state = useRadioGroup_unstable(rest, ref);

	return {
		...state,
		color,
	};
};

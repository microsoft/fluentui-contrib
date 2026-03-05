import { useRadio_unstable as useFluentRadio } from "@fluentui/react-radio";
import { useRadioGroupContextValue } from "../RadioGroup/RadioGroupContext";
import type { RadioProps, RadioState } from "./Radio.types";

/**
 * Create state for the Radio component based on props.
 *
 * @param props - Properties for the Radio component
 * @param ref - Reference to root element
 * @returns State for the Radio component
 * @alpha
 */
export const useRadio = (
	props: RadioProps,
	ref: React.Ref<HTMLInputElement>,
): RadioState => {
	const state = useFluentRadio(props, ref);
	const { color } = useRadioGroupContextValue();
	return { ...state, color };
};

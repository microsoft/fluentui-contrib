import type { RadioState as BaseRadioState } from "@fluentui/react-radio";
import type { RadioGroupState } from "../RadioGroup/RadioGroup.types";

export type { RadioSlots } from "@fluentui/react-radio";
export type { RadioProps } from "@fluentui/react-radio";

/**
 * State for the Radio component.
 * @alpha
 */
export type RadioState = BaseRadioState &
	Required<Pick<RadioGroupState, "color">>;

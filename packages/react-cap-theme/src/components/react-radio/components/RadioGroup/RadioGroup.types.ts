import type {
	RadioGroupProps as BaseRadioGroupProps,
	RadioGroupState as BaseRadioGroupState,
	RadioGroupContextValues as BaseRadioGroupContextValues,
} from "@fluentui/react-radio";

export type { RadioGroupSlots } from "@fluentui/react-radio";

/**
 * Properties for configuring the RadioGroup component.
 * @alpha
 */
export type RadioGroupProps = BaseRadioGroupProps & {
	/**
	 * Color variant for the radio buttons.
	 * - 'brand': Primary emphasis using brand colors (default)
	 * - 'neutral': Secondary emphasis using neutral colors
	 *
	 * @default 'brand'
	 */
	color?: "brand" | "neutral";
};

/**
 * State for the RadioGroup component.
 * @alpha
 */
export type RadioGroupState = BaseRadioGroupState &
	Required<Pick<RadioGroupProps, "color">>;

/**
 * Context value shared among RadioGroup descendants.
 * @internal
 */
export type RadioGroupContextValue = Pick<RadioGroupState, "color">;

/**
 * Combined context values for RadioGroup and its underlying components.
 * @internal
 */
export type RadioGroupContextValues = {
	/** Base context values from the underlying RadioGroup component */
	base: BaseRadioGroupContextValues;
	/** Local context values specific to this RadioGroup implementation */
	local: RadioGroupContextValue;
};

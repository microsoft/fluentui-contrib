import * as React from "react";
import type { RadioGroupContextValue } from "./RadioGroup.types";

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 * @internal
 */
export const RadioGroupContext = React.createContext<
	RadioGroupContextValue | undefined
>(undefined);

/**
 * Default values for RadioGroupContext.
 * @internal
 */
export const radioGroupContextDefaultValues: RadioGroupContextValue = {
	color: "brand",
};

/**
 * Provider for RadioGroupContext.
 * @internal
 */
export const RadioGroupProvider = RadioGroupContext.Provider;

/**
 * Get the value of the RadioGroupContext.
 * @internal
 */
export const useRadioGroupContextValue = (): RadioGroupContextValue =>
	React.useContext(RadioGroupContext) || radioGroupContextDefaultValues;

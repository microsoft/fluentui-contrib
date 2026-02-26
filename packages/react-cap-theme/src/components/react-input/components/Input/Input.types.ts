import type {
	InputProps as BaseInputProps,
	InputState as BaseInputState,
} from "@fluentui/react-input";

export type { InputOnChangeData, InputSlots } from "@fluentui/react-input";

/**
 * Properties for configuring the Input component.
 * @alpha
 */
export type InputProps = Omit<BaseInputProps, "appearance" | "color"> & {
	/**
	 * The color variant.
	 *
	 * - 'brand' (default): Primary emphasis using brand colors.
	 * - 'neutral': Secondary emphasis using neutral colors.
	 *
	 * @default 'brand'
	 */
	color?: "brand" | "neutral";
};

/**
 * State used in rendering the Input component.
 * @alpha
 */
export type InputState = BaseInputState & Required<Pick<InputProps, "color">>;

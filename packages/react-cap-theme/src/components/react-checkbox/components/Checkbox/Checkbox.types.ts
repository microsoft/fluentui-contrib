import type {
	CheckboxProps as BaseCheckboxProps,
	CheckboxState as BaseCheckboxState,
} from "@fluentui/react-checkbox";

export type { CheckboxSlots } from "@fluentui/react-checkbox";

/**
 * Properties for the CAP Checkbox component.
 * @alpha
 */
export type CheckboxProps = BaseCheckboxProps & {
	/**
	 * Color variant of the checkbox.
	 * - 'brand': Primary emphasis using brand colors (default)
	 * - 'neutral': Secondary emphasis using neutral colors
	 *
	 * @default 'brand'
	 */
	color?: "brand" | "neutral";
};

/**
 * State used in rendering the CAP Checkbox component.
 * @alpha
 */
export type CheckboxState = BaseCheckboxState &
	Required<Pick<CheckboxProps, "color">>;

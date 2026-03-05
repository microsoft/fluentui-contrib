import type {
	TextareaProps as BaseTextareaProps,
	TextareaState as BaseTextareaState,
} from "@fluentui/react-textarea";

export type { TextareaSlots } from "@fluentui/react-textarea";

/**
 * Properties for the CAP Textarea component.
 * @alpha
 */
export type TextareaProps = Omit<BaseTextareaProps, "color"> & {
	/**
	 * Color variants.
	 *
	 * - 'brand' (default): Primary emphasis using brand colors.
	 * - 'neutral': Secondary emphasis using neutral colors.
	 *
	 * @default 'brand'
	 */
	color?: "brand" | "neutral";
};

/**
 * State used in rendering the CAP Textarea component.
 * @alpha
 */
export type TextareaState = BaseTextareaState &
	Required<Pick<TextareaProps, "color">>;

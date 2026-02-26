import type { InteractionTagProps as BaseTagProps } from "@fluentui/react-tags";

export type {
	InteractionTagSlots,
	InteractionTagState,
} from "@fluentui/react-tags";

/**
 * Properties for the CAP InteractionTag component.
 *
 * @example
 * ```tsx
 * const props: InteractionTagProps = {
 *   onClick: openUserProfile,
 *   dismissible: true
 * };
 * ```
 * @alpha
 */
export type InteractionTagProps = Omit<BaseTagProps, "shape">;

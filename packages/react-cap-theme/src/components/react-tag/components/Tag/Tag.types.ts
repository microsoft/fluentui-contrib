import type { TagProps as BaseTagProps } from "@fluentui/react-tags";

export type { TagSlots, TagState } from "@fluentui/react-tags";

/**
 * Properties for the CAP Tag component.
 *
 * @example
 * ```tsx
 * const props: TagProps = {
 *   size: 'medium',
 *   dismissible: true,
 *   value: 'design-system'
 * };
 * ```
 * @alpha
 */
export type TagProps = Omit<BaseTagProps, "shape">;

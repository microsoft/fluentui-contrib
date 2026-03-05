import { useBreadcrumbDivider_unstable } from "@fluentui/react-breadcrumb";
import type {
	BreadcrumbDividerProps,
	BreadcrumbDividerState,
} from "@fluentui/react-breadcrumb";

/**
 * Create the state required to style and render the BreadcrumbDivider.
 * @param props - Props of the BreadcrumbDivider
 * @param ref - Reference to the root element
 * @returns The BreadcrumbDivider state object
 * @alpha
 */
export const useBreadcrumbDivider = (
	props: BreadcrumbDividerProps,
	ref: React.Ref<HTMLLIElement>,
): BreadcrumbDividerState => ({
	...useBreadcrumbDivider_unstable(props, ref),
	size: "medium",
});

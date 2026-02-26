import {
	type BadgeState,
	useBadge,
} from "@fluentui-contrib/react-cap-theme/react-badge";
import type { ToolbarBadgeProps } from "./ToolbarBadge.types";

/**
 * Hook that creates badge state with fixed large size for toolbar usage.
 * @param props - Badge props with size omitted
 * @param ref - Ref to the badge element
 * @returns Badge state with large size applied
 * @alpha
 */
export const useToolbarBadge = (
	props: ToolbarBadgeProps,
	ref: React.Ref<HTMLDivElement>,
): BadgeState => {
	return useBadge({ ...props, size: "large" }, ref);
};

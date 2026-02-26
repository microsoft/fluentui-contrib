import {
	useAvatarGroup,
	type AvatarGroupState,
} from "@fluentui-contrib/react-cap-theme/react-avatar";
import type * as React from "react";
import type { ToolbarAvatarGroupProps } from "./ToolbarAvatarGroup.types";

/**
 * Create the state required to render ToolbarAvatarGroup.
 * @param props - props from this instance of ToolbarAvatarGroup
 * @param ref - reference to root HTMLDivElement of ToolbarAvatarGroup
 * @returns AvatarGroupState configured with fixed 32px size for toolbar usage
 * @alpha
 */
export const useToolbarAvatarGroup = (
	props: ToolbarAvatarGroupProps,
	ref: React.Ref<HTMLDivElement>,
): AvatarGroupState => {
	return useAvatarGroup({ ...props, size: 32 }, ref);
};

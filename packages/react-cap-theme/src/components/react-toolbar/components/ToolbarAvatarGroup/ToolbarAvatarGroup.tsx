import type { ForwardRefComponent } from "@fluentui/react-utilities";
import {
	renderAvatarGroup,
	useAvatarGroupContextValues,
	useAvatarGroupStyles,
} from "@fluentui-contrib/react-cap-theme/react-avatar";
import * as React from "react";

import type { ToolbarAvatarGroupProps } from "./ToolbarAvatarGroup.types";
import { useToolbarAvatarGroup } from "./useToolbarAvatarGroup";

/**
 * AvatarGroup component with fixed 32px size for toolbar usage.
 * @example
 * ```tsx
 * <ToolbarAvatarGroup layout="stack">
 *   <AvatarGroupItem name="John Doe" initials="JD" />
 *   <AvatarGroupItem name="Jane Smith" initials="JS" />
 *   <AvatarGroupPopover>
 *     <AvatarGroupItem name="Bob Wilson" initials="BW" />
 *   </AvatarGroupPopover>
 * </ToolbarAvatarGroup>
 * ```
 * @param props - Component props extending AvatarGroupProps with fixed size
 * @param ref - Forwarded ref to the HTMLDivElement
 * @returns Rendered AvatarGroup component with 32px size
 * @alpha
 */
export const ToolbarAvatarGroup: ForwardRefComponent<ToolbarAvatarGroupProps> =
	React.forwardRef<HTMLDivElement, ToolbarAvatarGroupProps>((props, ref) => {
		const state = useToolbarAvatarGroup(props, ref);
		const contextValues = useAvatarGroupContextValues(state);
		useAvatarGroupStyles(state);
		return renderAvatarGroup(state, contextValues);
	});

ToolbarAvatarGroup.displayName = "ToolbarAvatarGroup";

import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import {
	renderAvatar,
	useAvatar,
} from "@fluentui-contrib/react-cap-theme/react-avatar";
import * as React from "react";
import type { ToolbarAvatarProps } from "./ToolbarAvatar.types";
import { useToolbarAvatarStyles } from "./useToolbarAvatarStyles.styles";

/**
 * A CAP-styled avatar component optimized for toolbar usage.
 * @example
 * ```tsx
 * <ToolbarAvatar name="John Doe" />
 * ```
 * @param props - The avatar component props
 * @param ref - React ref for the avatar element
 * @returns JSX.Element representing the rendered avatar
 * @alpha
 */
export const ToolbarAvatar: ForwardRefComponent<ToolbarAvatarProps> =
	React.forwardRef((props, ref) => {
		const state = useAvatar(props, ref);

		useToolbarAvatarStyles(state);
		useCustomStyleHook_unstable("useAvatarStyles_unstable")(state);

		return renderAvatar(state);
	});

ToolbarAvatar.displayName = "ToolbarAvatar";

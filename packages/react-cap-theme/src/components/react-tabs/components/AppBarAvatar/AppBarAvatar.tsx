import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { renderAvatar_unstable } from "@fluentui-contrib/react-cap-theme/react-avatar";
import * as React from "react";
import type { AppBarAvatarProps } from "./AppBarAvatar.types";
import { useAppBarAvatar } from "./useAppBarAvatar";
import { useAppBarAvatarStyles } from "./useAppBarAvatarStyles.styles";

/**
 * AppBarAvatar component is used to display an avatar in the AppBar.
 *
 * @example
 * Basic usage with image:
 * ```tsx
 * <AppBarAvatar image={{ src: 'https://example.com/avatar.jpg' }} />
 * ```
 *
 * @example
 * With custom shape:
 * ```tsx
 * <AppBarAvatar name="John Doe" shape="square" />
 * ```
 *
 * @alpha
 */
export const AppBarAvatar: ForwardRefComponent<AppBarAvatarProps> =
	React.forwardRef((props, ref) => {
		const state = useAppBarAvatar(props, ref as React.Ref<HTMLElement>);
		useAppBarAvatarStyles(state);
		return renderAvatar_unstable(state);
	});

AppBarAvatar.displayName = "AppBarAvatar";

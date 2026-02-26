import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { AppBarItemProps } from "./AppBarItem.types";
import { renderAppBarItem } from "./renderAppBarItem";
import { useAppBarItem } from "./useAppBarItem";
import { useAppBarItemStyles } from "./useAppBarItemStyles.styles";

/**
 * An application bar item provides a selectable item in an application bar.
 *
 * @example
 * Basic usage with content:
 * ```tsx
 * <AppBarItem value="home" content="Home" />
 * ```
 *
 * @example
 * With avatar:
 * ```tsx
 * <AppBarItem value="profile" avatar={<AppBarAvatar name="John Doe" />}>
 *   Profile
 * </AppBarItem>
 * ```
 *
 * @alpha
 */
export const AppBarItem: ForwardRefComponent<AppBarItemProps> =
	React.forwardRef((props, ref) => {
		const state = useAppBarItem(props, ref);
		useAppBarItemStyles(state);
		return renderAppBarItem(state);
	});

AppBarItem.displayName = "AppBarItem";

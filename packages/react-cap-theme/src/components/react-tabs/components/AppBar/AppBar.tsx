import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { AppBarProps } from "./AppBar.types";
import { renderAppBar } from "./renderAppBar";
import { useAppBar } from "./useAppBar";
import { useAppBarContextValues } from "./useAppBarContextValues";
import { useAppBarStyles } from "./useAppBarStyles.styles";

/**
 * An application bar provides single selection from a set of items.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <AppBar selectedValue="home" onItemSelect={handleSelect}>
 *   <AppBarItem value="home">Home</AppBarItem>
 *   <AppBarItem value="documents">Documents</AppBarItem>
 * </AppBar>
 * ```
 *
 * @example
 * Horizontal layout with compact density:
 * ```tsx
 * <AppBar horizontal density="compact" defaultSelectedValue="files">
 *   <AppBarItem value="files">Files</AppBarItem>
 *   <AppBarItem value="recent">Recent</AppBarItem>
 * </AppBar>
 * ```
 *
 * @alpha
 */
export const AppBar: ForwardRefComponent<AppBarProps> = React.forwardRef(
	(props, ref) => {
		const state = useAppBar(props, ref);
		const contextValues = useAppBarContextValues(state);
		useAppBarStyles(state);
		return renderAppBar(state, contextValues);
	},
);

AppBar.displayName = "AppBar";

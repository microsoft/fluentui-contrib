import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { renderToolbar } from "./renderToolbar";
import type { ToolbarProps } from "./Toolbar.types";
import { useToolbar } from "./useToolbar";
import { useToolbarContextValues } from "./useToolbarContextValues";
import { useToolbarStyles } from "./useToolbarStyles.styles";

/**
 * A CAP-styled toolbar component that provides a container for grouping interactive elements.
 * @example
 * ```tsx
 * <Toolbar appearance="contextual" layout="space-between" size="small" width="full">
 *   <ToolbarButton>Action</ToolbarButton>
 * </Toolbar>
 * ```
 * @param props - Component props extending ToolbarProps with CAP-specific options
 * @param ref - Forwarded ref to the HTMLElement
 * @returns Rendered toolbar component with CAP styling
 * @alpha
 */
export const Toolbar: ForwardRefComponent<ToolbarProps> = React.forwardRef(
	(props, ref) => {
		const state = useToolbar(props, ref);
		const contextValues = useToolbarContextValues(state);

		useToolbarStyles(state);
		useCustomStyleHook_unstable("useToolbarStyles_unstable")(state);

		return renderToolbar(state, contextValues);
	},
);

Toolbar.displayName = "Toolbar";

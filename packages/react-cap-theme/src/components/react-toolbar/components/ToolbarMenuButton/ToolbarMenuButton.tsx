import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { renderMenuButton } from "@fluentui-contrib/react-cap-theme/react-button";
import * as React from "react";
import type { ToolbarMenuButtonProps } from "./ToolbarMenuButton.types";
import { useToolbarMenuButton } from "./useToolbarMenuButton";
import { useToolbarMenuButtonStyles } from "./useToolbarMenuButtonStyles.styles";

/**
 * A CAP-styled menu button component optimized for toolbar usage.
 * @example
 * ```tsx
 * <ToolbarMenuButton>Options</ToolbarMenuButton>
 * ```
 * @param props - The menu button component props
 * @param ref - React ref for the button element
 * @returns JSX.Element representing the rendered menu button
 * @alpha
 */
export const ToolbarMenuButton: ForwardRefComponent<ToolbarMenuButtonProps> =
	React.forwardRef((props, ref) => {
		const state = useToolbarMenuButton(props, ref);
		useToolbarMenuButtonStyles(state);
		return renderMenuButton(state);
	});

ToolbarMenuButton.displayName = "ToolbarMenuButton";

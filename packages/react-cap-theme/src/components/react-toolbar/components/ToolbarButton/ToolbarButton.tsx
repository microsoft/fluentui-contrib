import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { renderButton } from "@fluentui-contrib/react-cap-theme/react-button";
import * as React from "react";
import type { ToolbarButtonProps } from "./ToolbarButton.types";
import { useToolbarButton } from "./useToolbarButton";
import { useToolbarButtonStyles } from "./useToolbarButtonStyles.styles";

/**
 * A CAP-styled button component optimized for toolbar usage.
 * Extends Fluent UI Button with CAP-specific styling and toolbar-appropriate sizing.
 * @example
 * ```tsx
 * <ToolbarButton>Save</ToolbarButton>
 * ```
 * @param props - The button component props
 * @param ref - React ref for the button element
 * @returns JSX.Element representing the rendered button
 * @alpha
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> =
	React.forwardRef((props, ref) => {
		const state = useToolbarButton(props, ref);

		useToolbarButtonStyles(state);
		useCustomStyleHook_unstable("useToolbarButtonStyles_unstable")(state);

		return renderButton(state);
	});

ToolbarButton.displayName = "ToolbarButton";

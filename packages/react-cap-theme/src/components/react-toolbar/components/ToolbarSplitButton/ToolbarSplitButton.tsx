import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { renderSplitButton } from "@fluentui-contrib/react-cap-theme/react-button";
import * as React from "react";
import type { ToolbarSplitButtonProps } from "./ToolbarSplitButton.types";
import { useToolbarSplitButton } from "./useToolbarSplitButton";
import { useToolbarSplitButtonStyles } from "./useToolbarSplitButtonStyles.styles";

/**
 * A CAP-styled split button component optimized for toolbar usage.
 * Extends Fluent UI SplitButton with CAP-specific styling and toolbar-appropriate sizing.
 * @example
 * ```tsx
 * <ToolbarSplitButton primaryActionButton={{ onClick={handleClick} }}>Save</ToolbarSplitButton>
 * ```
 * @param props - The split button component props
 * @param ref - React ref for the split button element
 * @returns JSX.Element representing the rendered split button
 * @alpha
 */
export const ToolbarSplitButton: ForwardRefComponent<ToolbarSplitButtonProps> =
	React.forwardRef((props, ref) => {
		const state = useToolbarSplitButton(props, ref);
		useToolbarSplitButtonStyles(state);
		return renderSplitButton(state);
	});

ToolbarSplitButton.displayName = "ToolbarSplitButton";

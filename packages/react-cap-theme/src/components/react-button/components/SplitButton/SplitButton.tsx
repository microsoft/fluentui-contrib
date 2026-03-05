import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { renderSplitButton } from "./renderSplitButton";
import type { SplitButtonProps } from "./SplitButton.types";
import { useSplitButton } from "./useSplitButton";
import { useSplitButtonStyles } from "./useSplitButtonStyles.styles";

/**
 * Custom SplitButton component provides enhanced styling and behavior for CAP.
 * A split button combines a primary action button with a secondary menu button, allowing users
 * to either trigger a default action or choose from additional options.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <SplitButton primaryActionButton='Save'>
 *   Additional Options
 * </SplitButton>
 * ```
 *
 * @param props - The split button configuration and event handlers
 * @param ref - Reference to the split button element
 * @returns The rendered split button component
 * @alpha
 */
export const SplitButton: ForwardRefComponent<SplitButtonProps> =
	React.forwardRef((props, ref) => {
		const state = useSplitButton(props, ref);
		useSplitButtonStyles(state);
		return renderSplitButton(state);
		// Casting is required due to lack of distributive union to support unions on @types/react
	}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = "SplitButton";

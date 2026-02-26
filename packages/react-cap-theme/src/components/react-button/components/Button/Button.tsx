import { useButtonStyles_unstable } from "@fluentui/react-button";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { ButtonProps } from "./Button.types";
import { toBaseState } from "./Button.utils";
import { renderButton } from "./renderButton";
import { useButton } from "./useButton";
import { useButtonStyles } from "./useButtonStyles.styles";

/**
 * Experimental Button component that provides enhanced styling and behavior for CAP.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Button appearance="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example
 * With custom appearance:
 * ```tsx
 * <Button appearance="tint" size="large">
 *   Light Primary Button
 * </Button>
 * ```
 *
 * @param props - The button configuration and event handlers
 * @param ref - Reference to the button element
 * @returns The rendered button component
 * @alpha
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef(
	(props, ref) => {
		const state = useButton(props, ref);
		useButtonStyles_unstable(toBaseState(state));
		useButtonStyles(state);
		return renderButton(state);
		// Casting is required due to lack of distributive union to support unions on @types/react
	},
) as ForwardRefComponent<ButtonProps>;

Button.displayName = "Button";

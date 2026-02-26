import {
	useButtonStyles_unstable,
	useToggleButtonStyles_unstable,
} from "@fluentui/react-button";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { toBaseState } from "../Button/Button.utils";
import { renderToggleButton } from "./renderToggleButton";
import type { ToggleButtonProps } from "./ToggleButton.types";
import { useToggleButton } from "./useToggleButton";
import { useToggleButtonStyles } from "./useToggleButtonStyles.styles";

/**
 * Experimental ToggleButton component that provides toggle functionality with CAP styling.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <ToggleButton checked={isToggled} onClick={handleToggle}>
 *   Toggle me
 * </ToggleButton>
 * ```
 *
 * @param props - The toggle button configuration and event handlers
 * @param ref - Reference to the toggle button element
 * @returns The rendered toggle button component
 * @alpha
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> =
	React.forwardRef((props, ref) => {
		const state = useToggleButton(props, ref);
		const baseState = toBaseState(state);
		useButtonStyles_unstable(baseState);
		useToggleButtonStyles_unstable({
			...baseState,
			checked: state.checked,
		});
		useToggleButtonStyles(state);
		return renderToggleButton(state);
	}) as ForwardRefComponent<ToggleButtonProps>;
ToggleButton.displayName = "ToggleButton";

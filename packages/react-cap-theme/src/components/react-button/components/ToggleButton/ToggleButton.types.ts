import type { ToggleButtonProps as BaseToggleButtonProps } from "@fluentui/react-button";
import type { ButtonProps, ButtonState } from "../../Button";

/**
 * Properties for the ToggleButton component, extending Button with toggle functionality.
 * @alpha
 */
export type ToggleButtonProps = ButtonProps &
	Pick<BaseToggleButtonProps, "defaultChecked" | "checked">;

/**
 * State for the ToggleButton component, extending Button state with checked state.
 * @alpha
 */
export type ToggleButtonState = ButtonState &
	Required<Pick<ToggleButtonProps, "checked">>;

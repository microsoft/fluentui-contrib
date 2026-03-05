import type { MenuButtonSlots } from "@fluentui/react-button";
import type { ComponentProps, ComponentState } from "@fluentui/react-utilities";
import type { ButtonProps, ButtonState, ButtonSlots } from "../../Button";

/**
 * Slots for the MenuButton component.
 * @alpha
 */
export type { MenuButtonSlots } from "@fluentui/react-button"; // Importing types for compatibility

/**
 * Props for the MenuButton component.
 * @alpha
 */
export type MenuButtonProps = ComponentProps<MenuButtonSlots> &
	Pick<ButtonProps, "appearance" | "disabled" | "disabledFocusable" | "size">;

/**
 * State for the MenuButton component.
 * @alpha
 */
export type MenuButtonState = ComponentState<MenuButtonSlots> &
	Omit<ButtonState, keyof ButtonSlots | "components">;

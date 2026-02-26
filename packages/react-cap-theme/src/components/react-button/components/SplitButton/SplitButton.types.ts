import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";
import type { Button, ButtonProps, ButtonState } from "../../Button";
import type {
	MenuButton,
	MenuButtonProps,
	MenuButtonState,
} from "../../MenuButton";

/**
 * Slots for the SplitButton component.
 * Defines the structure of a SplitButton with a primary action button and a menu button.
 * @alpha
 */
export type SplitButtonSlots = {
	/**
	 * Root of the component that wraps the primary action button and menu button.
	 */
	root: NonNullable<Slot<"div">>;
	/**
	 * Button that opens menu with secondary actions in SplitButton.
	 */
	menuButton?: Slot<typeof MenuButton>;
	/**
	 * Button to perform primary action in SplitButton.
	 */
	primaryActionButton?: Slot<typeof Button>;
};

/**
 * Props for the SplitButton component.
 * Inherits most properties from ButtonProps, with specific MenuButton properties for the dropdown.
 * @alpha
 */
export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
	Omit<ButtonProps, "root" | "as"> &
	Omit<MenuButtonProps, "root" | "as">;

/**
 * State for the SplitButton component.
 * Inherits most state from ButtonState, with specific MenuButton state for the dropdown functionality.
 * @alpha
 */
export type SplitButtonState = ComponentState<SplitButtonSlots> &
	Omit<ButtonState, "components" | "iconOnly" | "root"> &
	Omit<MenuButtonState, "components" | "iconOnly" | "root">;

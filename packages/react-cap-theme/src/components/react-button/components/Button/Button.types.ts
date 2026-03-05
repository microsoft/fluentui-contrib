import type {
	ButtonSlots,
	ButtonProps as BaseButtonProps,
	ButtonState as BaseButtonState,
} from "@fluentui/react-button";
import type { ComponentProps } from "@fluentui/react-utilities";

export type { ButtonSlots } from "@fluentui/react-button";

/**
 * Appearance variants for CAP Button component.
 * @alpha
 */
export type ButtonAppearance =
	| "primary"
	| "tint"
	| "outline"
	| "outlineColor"
	| "secondary"
	| "subtle"
	| "transparent";

/**
 * Properties for the CAP Button component.
 *
 * Note: Fluent's `shape` prop is intentionally excluded. CAP controls
 * border-radius through its own design tokens; allowing `shape` would
 * conflict with the prescribed CAP visual language.
 *
 * @alpha
 */
export type ButtonProps = ComponentProps<ButtonSlots> &
	Pick<
		BaseButtonProps,
		"disabledFocusable" | "disabled" | "iconPosition" | "size"
	> & {
		/**
		 * A button can have its content and borders styled for greater emphasis or to be subtle.
		 * - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action.
		 * - 'primary': Emphasizes the button as a primary action.
		 * - 'tint': Emphasizes the button as a primary action.
		 * - 'outline': Removes background styling.
		 * - 'outlineColor': Outline button with brand color styling.
		 * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
		 * - 'transparent': Removes background and border styling.
		 *
		 * @default 'secondary'
		 */
		appearance?: ButtonAppearance;
	};

/**
 * State used in rendering the CAP Button component.
 * @alpha
 */
export type ButtonState = Omit<BaseButtonState, "appearance"> &
	Required<Pick<ButtonProps, "appearance">>;

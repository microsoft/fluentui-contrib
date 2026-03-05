import type { ToolbarButtonProps as FluentToolbarButtonProps } from "@fluentui/react-toolbar";
import type { ComponentProps, ComponentState } from "@fluentui/react-utilities";
import type {
	ButtonProps,
	ButtonSlots,
	ButtonState,
} from "@fluentui-contrib/react-cap-theme/react-button";

/**
 * Props for the ToolbarButton component.
 * @alpha
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
	Partial<
		Pick<ButtonProps, "appearance" | "disabled" | "disabledFocusable">
	> &
	Pick<FluentToolbarButtonProps, "vertical">;

/**
 * State for the ToolbarButton component.
 * @alpha
 */
export type ToolbarButtonState = ComponentState<Partial<ButtonSlots>> &
	ButtonState &
	Required<Pick<ToolbarButtonProps, "vertical">>;

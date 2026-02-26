import type { ToolbarButtonProps } from "@fluentui/react-toolbar";
import type { ComponentProps, ComponentState } from "@fluentui/react-utilities";
import type {
	MenuButtonProps,
	MenuButtonSlots,
	MenuButtonState,
} from "@fluentui-contrib/react-cap-theme/react-button";

/**
 * Props for the ToolbarMenuButton component.
 * @alpha
 */
export type ToolbarMenuButtonProps = ComponentProps<MenuButtonSlots> &
	Partial<
		Pick<MenuButtonProps, "appearance" | "disabled" | "disabledFocusable">
	> &
	Pick<ToolbarButtonProps, "vertical">;

/**
 * State for the ToolbarMenuButton component.
 * @alpha
 */
export type ToolbarMenuButtonState = ComponentState<Partial<MenuButtonSlots>> &
	MenuButtonState &
	Required<Pick<ToolbarMenuButtonProps, "vertical">>;

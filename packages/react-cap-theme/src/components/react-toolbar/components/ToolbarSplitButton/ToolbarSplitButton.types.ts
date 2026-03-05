import type { ToolbarButtonProps as FluentToolbarButtonProps } from "@fluentui/react-toolbar";
import type { ComponentProps, ComponentState } from "@fluentui/react-utilities";
import type {
	ButtonProps,
	MenuButtonProps,
	SplitButtonProps,
	SplitButtonSlots,
	SplitButtonState,
} from "@fluentui-contrib/react-cap-theme/react-button";

/**
 * Props for the ToolbarSplitButton component.
 * @alpha
 */
export type ToolbarSplitButtonProps = ComponentProps<SplitButtonSlots> &
	Omit<ButtonProps, "root" | "as"> &
	Omit<MenuButtonProps, "root" | "as"> &
	Partial<
		Pick<SplitButtonProps, "appearance" | "disabled" | "disabledFocusable">
	> &
	Pick<FluentToolbarButtonProps, "vertical">;

/**
 * State for the ToolbarSplitButton component.
 * @alpha
 */
export type ToolbarSplitButtonState = ComponentState<
	Partial<SplitButtonSlots>
> &
	SplitButtonState &
	Required<Pick<ToolbarSplitButtonProps, "vertical">>;

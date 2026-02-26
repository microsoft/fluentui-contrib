import type {
	ToolbarProps as FluentToolbarProps,
	ToolbarState as FluentToolbarState,
	ToolbarContextValues as FluentToolbarContextValues,
	ToolbarSlots,
} from "@fluentui/react-toolbar";

/**
 * Slots for the Toolbar component.
 * @alpha
 */
export type { ToolbarSlots };

/**
 * Props for the Toolbar component.
 * @alpha
 */
export type ToolbarProps = Omit<FluentToolbarProps, "size"> & {
	/**
	 * The contextual appearance adds shadow to the toolbar. The static appearance is Fluent default appearance.
	 * @default contextual
	 */
	appearance?: "contextual" | "static";
	/**
	 * Defines the alignment of the toolbar content.
	 * @default start
	 */
	layout?: "start" | "space-between" | "end";
	/**
	 * Toolbar can have small, medium, or large size.
	 * @default small
	 */
	size?: "small" | "medium" | "large";
	/**
	 * Controls the width behavior of the toolbar.
	 * - 'contained': Toolbar takes only the space needed for its content (inline-flex)
	 * - 'full': Toolbar takes the full width of its container (flex)
	 * @default contained
	 */
	width?: "contained" | "full";
};

/**
 * State for the Toolbar component.
 * @alpha
 */
export type ToolbarState = FluentToolbarState &
	Required<Pick<ToolbarProps, "appearance" | "layout" | "width">>;

/**
 * Context values for the Toolbar component.
 * Extends Fluent UI's ToolbarContextValues with CAP-specific appearance context.
 * @alpha
 */
export type ToolbarContextValues = FluentToolbarContextValues &
	Pick<ToolbarState, "appearance">;

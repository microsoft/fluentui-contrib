import type {
	TabValue,
	TabListState,
	SelectTabEvent,
	SelectTabData,
} from "@fluentui/react-tabs";
import type { ComponentProps, Slot } from "@fluentui/react-utilities";

/**
 * Slot configuration for the AppBar component.
 * @alpha
 */
export type AppBarSlots = {
	/**
	 * The slot associated with the root element of this application bar.
	 */
	root: Slot<"div">;
};

/**
 * Event handler function for AppBar item selection events.
 * @param event - The selection event from the underlying tab component
 * @param data - Additional data about the selected item
 * @alpha
 */
export type SelectAppBarItemEventHandler = (
	event: SelectTabEvent,
	data: SelectTabData,
) => void;

/**
 * Properties for configuring the AppBar component.
 *
 * @example
 * ```tsx
 * const props: AppBarProps = {
 *   density: 'comfortable',
 *   horizontal: false,
 *   selectedValue: 'home',
 *   onItemSelect: (event, data) => console.log('Selected:', data.value)
 * };
 * ```
 * @alpha
 */
export type AppBarProps = ComponentProps<AppBarSlots> & {
	/**
	 * The value of the item to be selected by default.
	 * Typically useful when the selectedValue is uncontrolled.
	 */
	defaultSelectedValue?: TabValue;
	/**
	 * The value of the currently selected item.
	 */
	selectedValue?: TabValue;
	/**
	 * Controls the density of the AppBar component to accommodate different user preferences and layout requirements.
	 * Adjusts the component's overall spacing including padding, margins, and spacing between elements.
	 *
	 * - `comfortable` (default): Balances space efficiency with readability, offering moderate padding. Recommended for most use cases.
	 * - `compact`: Minimizes padding and spacing for high-density interfaces or smaller viewports. Ideal for power users and dashboards.
	 *
	 * @default 'comfortable'
	 */
	density?: "comfortable" | "compact";
	/**
	 * A appbar can arrange its items horizontally.
	 * @default false
	 */
	horizontal?: boolean;
	/**
	 * Raised when an item is selected.
	 */
	onItemSelect?: SelectAppBarItemEventHandler;
};

/**
 * Internal state used in rendering AppBar component.
 * @alpha
 */
export type AppBarState = Omit<TabListState, "vertical"> &
	Required<Pick<AppBarProps, "density" | "horizontal">>;

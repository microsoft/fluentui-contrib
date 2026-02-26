import type { TabProps, TabState, TabValue } from "@fluentui/react-tabs";
import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";

/**
 * Slot configuration for the AppBarItem component.
 * @alpha
 */
export type AppBarItemSlots = {
	/**
	 * Root of the component.
	 */
	root: Slot<"button">;
	/**
	 * Any component to be displayed above the content.
	 * For avatar functionality, use the AppBarAvatar component.
	 * Usage e.g.: `<AppBarAvatar image={{ src: '...' }} shape="square" />`
	 */
	avatar?: Slot<"span">;
	/**
	 * Component children are placed in this slot
	 * Avoid using the `children` property in this slot in favour of Component children whenever possible.
	 */
	content: NonNullable<Slot<"span">>;
};

/**
 * Internal slot configuration for AppBarItem component including reserved space slot.
 * @alpha
 */
export type AppBarItemInternalSlots = AppBarItemSlots & {
	contentReservedSpace?: Slot<"span">;
};

/**
 * Properties for configuring the AppBarItem component.
 *
 * @example
 * ```tsx
 * const props: AppBarItemProps = {
 *   value: 'home',
 *   content: 'Home',
 *   disabled: false,
 *   avatar: <AppBarAvatar name="User" />
 * };
 * ```
 * @alpha
 */
export type AppBarItemProps = Omit<
	ComponentProps<Omit<AppBarItemSlots, "content">>,
	"value"
> &
	Pick<TabProps, "content"> & {
		/**
		 * An item can be set to disable interaction.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * The value that identifies this item when selected.
		 */
		value: TabValue;
	};

/**
 * Internal state used in rendering AppBarItem component.
 * @alpha
 */
export type AppBarItemState = ComponentState<AppBarItemInternalSlots> &
	Pick<TabState, "appearance" | "selected" | "size"> &
	Required<Pick<AppBarItemProps, "disabled" | "value">> & {
		/**
		 * Whether the AppBarItem shows only an avatar (no content text).
		 */
		avatarOnly: boolean;
		/**
		 * Whether the AppBarItem is in horizontal mode.
		 * This is derived from the parent AppBar's horizontal prop.
		 */
		horizontal?: boolean;
	};

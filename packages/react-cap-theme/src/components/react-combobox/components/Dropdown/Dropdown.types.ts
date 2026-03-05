import type {
	DropdownProps as BaseProps,
	DropdownSlots as BaseSlots,
	DropdownState as BaseState,
} from "@fluentui/react-combobox";
import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";

import type { Listbox } from "../Listbox/Listbox";

/**
 * Slot configuration for the Dropdown component.
 * @alpha
 */
export type DropdownSlots = Omit<BaseSlots, "listbox"> & {
	/**
	 * Element before the Dropdown text.
	 */
	contentBefore?: Slot<"span">;

	/**
	 * Flyout element containing a list of options.
	 */
	listbox?: Slot<typeof Listbox>;
};

/**
 * Properties for configuring the Dropdown component.
 * @alpha
 */
export type DropdownProps = ComponentProps<
	Pick<DropdownSlots, "contentBefore" | "listbox">
> &
	Omit<BaseProps, "appearance" | "listbox" | "color"> & {
		/**
		 * The color variant.
		 *
		 * - 'brand' (default): Primary emphasis using brand colors.
		 * - 'neutral': Secondary emphasis using neutral colors.
		 *
		 * @default 'brand'
		 */
		color?: "neutral" | "brand";
	};

/**
 * State used in rendering the Dropdown component.
 * @alpha
 */
export type DropdownState = ComponentState<DropdownSlots> &
	Omit<BaseState, "components"> &
	Required<Pick<DropdownProps, "color">>;

export type {
	DropdownContextValues,
	DropdownOpenEvents,
	DropdownOpenChangeData,
} from "@fluentui/react-combobox";

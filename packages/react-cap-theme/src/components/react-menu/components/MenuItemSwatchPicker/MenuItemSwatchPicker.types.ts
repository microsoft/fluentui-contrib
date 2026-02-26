import type { MenuItemSelectableProps } from "@fluentui/react-menu";
import type { SwatchPickerProps } from "@fluentui/react-swatch-picker";

/**
 * Props for the MenuItemSwatchPicker component.
 * Combines menu item selection capabilities with swatch picker functionality.
 * @alpha
 */
export type MenuItemSwatchPickerProps = Pick<MenuItemSelectableProps, "name"> &
	SwatchPickerProps;

import {
	renderSwatchPicker_unstable,
	useSwatchPickerContextValues,
} from "@fluentui/react-swatch-picker";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { MenuItemSwatchPickerProps } from "./MenuItemSwatchPicker.types";
import { useMenuItemSwatchPicker } from "./useMenuItemSwatchPicker";
import { useMenuItemSwatchPickerStyles } from "./useMenuItemSwatchPickerStyles.styles";

/**
 * A menu item that provides color and swatch selection capabilities.
 * @example
 * ```tsx
 * <MenuItemSwatchPicker
 *   name="color"
 *   spacing="medium"
 *   onSelectionChange={(e, data) => console.log(data.selectedValue)}
 * >
 *   <ColorSwatch color="#ff0000" value="red" />
 *   <ColorSwatch color="#00ff00" value="green" />
 *   <ColorSwatch color="#0000ff" value="blue" />
 * </MenuItemSwatchPicker>
 * ```
 * @param props - The swatch picker configuration and event handlers
 * @param ref - Reference to the root HTMLDivElement
 * @returns The menu item swatch picker element
 * @alpha
 */
export const MenuItemSwatchPicker: ForwardRefComponent<MenuItemSwatchPickerProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuItemSwatchPicker(props, ref);
		const contextValues = useSwatchPickerContextValues(state);
		useMenuItemSwatchPickerStyles(state);
		return renderSwatchPicker_unstable(state, contextValues);
	});

MenuItemSwatchPicker.displayName = "MenuItemSwatchPicker";

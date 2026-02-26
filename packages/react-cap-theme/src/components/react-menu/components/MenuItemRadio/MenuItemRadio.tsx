import {
	type MenuItemRadioProps,
	renderMenuItemRadio_unstable,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuItemRadio } from "./useMenuItemRadio";
import { useMenuItemRadioStyles } from "./useMenuItemRadioStyles.styles";

/**
 * A radio menu item component that allows users to select one option from a group with CAP styling.
 * @example
 * ```tsx
 * <Menu checkedValues={{ group: ['option1'] }}>
 *   <MenuTrigger>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuItemRadio name="group" value="option1">Option 1</MenuItemRadio>
 *       <MenuItemRadio name="group" value="option2">Option 2</MenuItemRadio>
 *       <MenuItemRadio name="group" value="option3">Option 3</MenuItemRadio>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The radio menu item configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The radio menu item element
 * @alpha
 */
export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuItemRadio(props, ref);

		useMenuItemRadioStyles(state);
		useCustomStyleHook_unstable("useMenuItemRadioStyles_unstable")(state);

		return renderMenuItemRadio_unstable(state);
	});

MenuItemRadio.displayName = "MenuItemRadio";

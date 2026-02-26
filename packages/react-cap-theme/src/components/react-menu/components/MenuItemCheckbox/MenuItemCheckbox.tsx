import {
	renderMenuItemCheckbox_unstable,
	useMenuItemCheckbox_unstable,
	type MenuItemCheckboxProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuItemCheckboxStyles } from "./useMenuItemCheckboxStyles.styles";

/**
 * A checkbox menu item component that allows users to select multiple options from a group with CAP styling.
 * @example
 * ```tsx
 * <Menu checkedValues={{ group: ['checkbox1', 'checkbox3'] }}>
 *   <MenuTrigger>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuItemCheckbox name="group" value="checkbox1">Checkbox 1</MenuItemCheckbox>
 *       <MenuItemCheckbox name="group" value="checkbox2">Checkbox 2</MenuItemCheckbox>
 *       <MenuItemCheckbox name="group" value="checkbox3">Checkbox 3</MenuItemCheckbox>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The checkbox menu item configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The checkbox menu item element
 * @alpha
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuItemCheckbox_unstable(props, ref);

		useMenuItemCheckboxStyles(state);
		useCustomStyleHook_unstable("useMenuItemCheckboxStyles_unstable")(
			state,
		);

		return renderMenuItemCheckbox_unstable(state);
	});

MenuItemCheckbox.displayName = "MenuItemCheckbox";

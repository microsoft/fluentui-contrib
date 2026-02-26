import {
	type MenuItemProps,
	renderMenuItem_unstable,
	useMenuItem_unstable,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuItemStyles } from "./useMenuItemStyles.styles";

/**
 * A menu item component that represents an interactive option within a menu with CAP styling.
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuItem>Item 1</MenuItem>
 *       <MenuItem>Item 2</MenuItem>
 *       <MenuItem disabled>Disabled Item</MenuItem>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The menu item configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The menu item element
 * @alpha
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef(
	(props, ref) => {
		const state = useMenuItem_unstable(props, ref);

		useMenuItemStyles(state);
		useCustomStyleHook_unstable("useMenuItemStyles_unstable")(state);

		return renderMenuItem_unstable(state);
	},
);

MenuItem.displayName = "MenuItem";

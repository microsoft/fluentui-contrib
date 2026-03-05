import {
	renderMenuDivider_unstable,
	useMenuDivider_unstable,
	type MenuDividerProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuDividerStyles } from "./useMenuDividerStyles.styles";

/**
 * A menu divider component that visually separates menu items with CAP styling.
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuItem>Item 1</MenuItem>
 *       <MenuDivider />
 *       <MenuItem>Item 2</MenuItem>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The menu divider configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The menu divider element
 * @alpha
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuDivider_unstable(props, ref);

		useMenuDividerStyles(state);
		useCustomStyleHook_unstable("useMenuDividerStyles_unstable")(state);

		return renderMenuDivider_unstable(state);
	});

MenuDivider.displayName = "MenuDivider";

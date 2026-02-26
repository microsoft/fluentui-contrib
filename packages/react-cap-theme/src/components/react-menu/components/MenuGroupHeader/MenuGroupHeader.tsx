import {
	renderMenuGroupHeader_unstable,
	useMenuGroupHeader_unstable,
	type MenuGroupHeaderProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuGroupHeaderStyles } from "./useMenuGroupHeaderStyles.styles";

/**
 * A menu group header component that displays a title for a group of menu items with CAP styling.
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuGroup>
 *         <MenuGroupHeader>Group Title</MenuGroupHeader>
 *         <MenuItem>Item 1</MenuItem>
 *         <MenuItem>Item 2</MenuItem>
 *       </MenuGroup>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The menu group header configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The menu group header element
 * @alpha
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuGroupHeader_unstable(props, ref);

		useMenuGroupHeaderStyles(state);
		useCustomStyleHook_unstable("useMenuGroupHeaderStyles_unstable")(state);

		return renderMenuGroupHeader_unstable(state);
	});

MenuGroupHeader.displayName = "MenuGroupHeader";

import {
	renderMenuPopover_unstable,
	useMenuPopover_unstable,
	type MenuPopoverProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuPopoverStyles } from "./useMenuPopoverStyles.styles";

/**
 * A popover container that displays menu content with CAP styling.
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
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The menu popover configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The menu popover element
 * @alpha
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuPopover_unstable(props, ref);

		useMenuPopoverStyles(state);
		useCustomStyleHook_unstable("useMenuPopoverStyles_unstable")(state);

		return renderMenuPopover_unstable(state);
	});

MenuPopover.displayName = "MenuPopover";

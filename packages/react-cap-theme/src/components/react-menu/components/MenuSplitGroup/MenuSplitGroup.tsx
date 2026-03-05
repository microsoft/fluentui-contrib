import {
	renderMenuSplitGroup_unstable,
	useMenuSplitGroup_unstable,
	type MenuSplitGroupProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuSplitGroupStyles } from "./useMenuSplitGroupStyles.styles";

/**
 * A menu split group component that combines a primary action with a secondary menu trigger with CAP styling.
 * @example
 * ```tsx
 * <Menu>
 *   <MenuSplitGroup>
 *     <MenuItem icon={<SparkleRegular />}>
 *       Primary Action
 *     </MenuItem>
 *     <MenuTrigger disableButtonEnhancement>
 *       <MenuItem aria-label='Open secondary menu' />
 *     </MenuTrigger>
 *   </MenuSplitGroup>
 *   <MenuPopover>
 *     <MenuList>
 *       <MenuItem>Secondary Item 1</MenuItem>
 *       <MenuItem>Secondary Item 2</MenuItem>
 *     </MenuList>
 *   </MenuPopover>
 * </Menu>
 * ```
 * @param props - The menu split group configuration
 * @param ref - Reference to the root HTMLElement
 * @returns The menu split group element
 * @alpha
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuSplitGroup_unstable(props, ref);

		useMenuSplitGroupStyles(state);
		useCustomStyleHook_unstable("useMenuSplitGroupStyles_unstable")(state);

		return renderMenuSplitGroup_unstable(state);
	});

MenuSplitGroup.displayName = "MenuSplitGroup";

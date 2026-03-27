import {
	renderMenuDivider_unstable,
	useMenuDivider_unstable,
	type MenuDividerProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuDividerStyles } from "./useMenuDividerStyles.styles";

export const MenuDivider: ForwardRefComponent<MenuDividerProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuDivider_unstable(props, ref);

		useMenuDividerStyles(state);
		useCustomStyleHook_unstable("useMenuDividerStyles_unstable")(state);

		return renderMenuDivider_unstable(state);
	});

MenuDivider.displayName = "MenuDivider";

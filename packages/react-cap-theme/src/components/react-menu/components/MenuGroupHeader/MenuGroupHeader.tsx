import {
	renderMenuGroupHeader_unstable,
	useMenuGroupHeader_unstable,
	type MenuGroupHeaderProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuGroupHeaderStyles } from "./useMenuGroupHeaderStyles.styles";

export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuGroupHeader_unstable(props, ref);

		useMenuGroupHeaderStyles(state);
		useCustomStyleHook_unstable("useMenuGroupHeaderStyles_unstable")(state);

		return renderMenuGroupHeader_unstable(state);
	});

MenuGroupHeader.displayName = "MenuGroupHeader";

import {
	renderMenuSplitGroup_unstable,
	useMenuSplitGroup_unstable,
	type MenuSplitGroupProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuSplitGroupStyles } from "./useMenuSplitGroupStyles.styles";

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuSplitGroup_unstable(props, ref);

		useMenuSplitGroupStyles(state);
		useCustomStyleHook_unstable("useMenuSplitGroupStyles_unstable")(state);

		return renderMenuSplitGroup_unstable(state);
	});

MenuSplitGroup.displayName = "MenuSplitGroup";

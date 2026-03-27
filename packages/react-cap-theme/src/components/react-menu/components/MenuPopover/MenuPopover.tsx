import {
	renderMenuPopover_unstable,
	useMenuPopover_unstable,
	type MenuPopoverProps,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuPopoverStyles } from "./useMenuPopoverStyles.styles";

export const MenuPopover: ForwardRefComponent<MenuPopoverProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuPopover_unstable(props, ref);

		useMenuPopoverStyles(state);
		useCustomStyleHook_unstable("useMenuPopoverStyles_unstable")(state);

		return renderMenuPopover_unstable(state);
	});

MenuPopover.displayName = "MenuPopover";

import {
	type MenuItemRadioProps,
	renderMenuItemRadio_unstable,
} from "@fluentui/react-menu";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { useMenuItemRadio } from "./useMenuItemRadio";
import { useMenuItemRadioStyles } from "./useMenuItemRadioStyles.styles";

export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> =
	React.forwardRef((props, ref) => {
		const state = useMenuItemRadio(props, ref);

		useMenuItemRadioStyles(state);
		useCustomStyleHook_unstable("useMenuItemRadioStyles_unstable")(state);

		return renderMenuItemRadio_unstable(state);
	});

MenuItemRadio.displayName = "MenuItemRadio";

import { renderMenuButton_unstable } from "@fluentui/react-button";
import type { ReactElement } from "react";
import { baseAppearanceMap } from "../Button/Button.utils";
import type { MenuButtonState } from "./MenuButton.types";

/**
 * Renders the CAP MenuButton component.
 * @param state - The MenuButton state object
 * @returns The rendered MenuButton element
 * @alpha
 */
export const renderMenuButton = (state: MenuButtonState): ReactElement => {
	return renderMenuButton_unstable({
		...state,
		appearance: baseAppearanceMap[state.appearance] ?? "secondary",
	});
};

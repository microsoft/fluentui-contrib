import { useMenuButton } from "@fluentui-contrib/react-cap-theme/react-button";
import type * as React from "react";
import { useToolbarButtonAppearance } from "../ToolbarButton/useToolbarButton";
import type {
	ToolbarMenuButtonProps,
	ToolbarMenuButtonState,
} from "./ToolbarMenuButton.types";

/**
 * Hook for creating the state of a ToolbarMenuButton component.
 * @param props - The props for the ToolbarMenuButton component
 * @param ref - React ref for the button element
 * @returns The menu button state configured for toolbar usage with CAP defaults
 * @alpha
 */
export const useToolbarMenuButton = (
	props: ToolbarMenuButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarMenuButtonState => {
	const { vertical = false } = props;
	const appearance = useToolbarButtonAppearance(props);
	const state = useMenuButton({ ...props, appearance, size: "medium" }, ref);

	return { vertical, ...state };
};

import { useSplitButton } from "@fluentui-contrib/react-cap-theme/react-button";
import type * as React from "react";
import { useToolbarButtonAppearance } from "../ToolbarButton/useToolbarButton";
import type {
	ToolbarSplitButtonProps,
	ToolbarSplitButtonState,
} from "./ToolbarSplitButton.types";

/**
 * Hook for creating the state of a ToolbarSplitButton component.
 * @param props - The props for the ToolbarSplitButton component
 * @param ref - React ref for the split button element
 * @returns The split button state configured for toolbar usage with CAP defaults
 * @alpha
 */
export const useToolbarSplitButton = (
	props: ToolbarSplitButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarSplitButtonState => {
	const { vertical = false } = props;
	const appearance = useToolbarButtonAppearance(props);
	const state = useSplitButton({ ...props, appearance, size: "medium" }, ref);

	return { vertical, ...state };
};

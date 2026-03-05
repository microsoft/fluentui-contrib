import { useButton } from "@fluentui-contrib/react-cap-theme/react-button";
import type * as React from "react";
import { useToolbarContext } from "../Toolbar/ToolbarContext";
import type {
	ToolbarButtonProps,
	ToolbarButtonState,
} from "./ToolbarButton.types";

/**
 * Hook for creating the state of a ToolbarButton component.
 * @param props - The props for the ToolbarButton component
 * @param ref - React ref for the button element
 * @returns The button state configured for toolbar usage with CAP defaults
 * @alpha
 */
export const useToolbarButton = (
	props: ToolbarButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonState => {
	const { vertical = false } = props;
	const appearance = useToolbarButtonAppearance(props);
	const state = useButton({ ...props, appearance, size: "medium" }, ref);

	return { vertical, ...state };
};

/**
 * Hook to determine the appropriate appearance for a toolbar button based on context.
 * @param props - Any props object containing at least the appearance property
 * @returns The resolved appearance value based on props or toolbar context
 * @internal
 */
export function useToolbarButtonAppearance(
	props: Pick<ToolbarButtonProps, "appearance">,
): ToolbarButtonState["appearance"] {
	const defaultAppearance = useToolbarContext<
		ToolbarButtonState["appearance"]
	>((ctx) => (ctx.appearance === "static" ? "outline" : "subtle"));
	return props.appearance || defaultAppearance;
}

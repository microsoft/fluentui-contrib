import { useToolbar_unstable } from "@fluentui/react-toolbar";
import type * as React from "react";
import type { ToolbarProps, ToolbarState } from "./Toolbar.types";

/**
 * Hook for creating the state of a Toolbar component.
 * @param props - The props for the Toolbar component
 * @param ref - React ref for the toolbar element
 * @returns The toolbar state with CAP-specific appearance configuration
 * @alpha
 */
export const useToolbar = (
	props: ToolbarProps,
	ref: React.Ref<HTMLElement>,
): ToolbarState => {
	const {
		appearance = "contextual",
		layout = "start",
		size = "small",
		width = "contained",
	} = props;
	const initialState = useToolbar_unstable({ ...props, size }, ref);

	return { ...initialState, appearance, layout, width };
};

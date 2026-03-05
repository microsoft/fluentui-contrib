import type {
	DrawerProps,
	DrawerState,
	InlineDrawerProps,
	OverlayDrawerProps,
} from "@fluentui/react-drawer";
import { slot } from "@fluentui/react-utilities";
import type * as React from "react";

import { InlineDrawer } from "../InlineDrawer/InlineDrawer";
import { OverlayDrawer } from "../OverlayDrawer/OverlayDrawer";

/**
 * Create the state required to render Drawer.
 * @param props - props from this instance of Drawer
 * @param ref - reference to root HTMLElement of Drawer
 * @returns The state to render the Drawer
 */
export const useDrawer = (
	props: DrawerProps,
	ref: React.Ref<HTMLElement>,
): DrawerState => {
	// casting here to convert a union of functions to a single function with the union of parameters
	const elementType = (
		props.type === "inline" ? InlineDrawer : OverlayDrawer
	) as React.FC<InlineDrawerProps | OverlayDrawerProps>;
	const root: InlineDrawerProps | OverlayDrawerProps = slot.always(
		{ ref, ...props },
		{ elementType },
	);

	return {
		components: { root: elementType },
		root,
	};
};

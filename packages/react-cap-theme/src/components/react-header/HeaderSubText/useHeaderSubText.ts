import {
	presenceMotionSlot,
	type PresenceMotionSlotProps,
} from "@fluentui/react-motion";
import { Collapse } from "@fluentui/react-motion-components-preview";
import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import type * as React from "react";
import { useHeaderContext } from "../Header/HeaderContext";
import type {
	HeaderSubTextProps,
	HeaderSubTextState,
} from "./HeaderSubText.types";

/**
 * Create the state required to render HeaderSubText.
 *
 * The returned state can be modified with hooks such as useHeaderSubTextStyles_unstable,
 * before being passed to renderHeaderSubText.
 *
 * @param props - props from this instance of HeaderSubText
 * @param ref - reference to root HTMLElement of HeaderSubText
 * @returns The state object for HeaderSubText component
 * @alpha
 */
export const useHeaderSubText = (
	props: HeaderSubTextProps,
	ref: React.Ref<HTMLElement>,
): HeaderSubTextState => {
	const { collapsible, open } = useHeaderContext();

	const state: HeaderSubTextState = {
		components: {
			root: "span",
			collapseMotion:
				Collapse as unknown as React.FC<PresenceMotionSlotProps>,
		},
		root: slot.always(getIntrinsicElementProps("span", { ref, ...props }), {
			elementType: "span",
		}),
		collapseMotion: presenceMotionSlot(props.collapseMotion, {
			elementType: Collapse,
			defaultProps: {
				visible: open,
				unmountOnExit: true,
			},
		}),
		collapsible,
	};

	return state;
};

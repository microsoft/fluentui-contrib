import { useDropdown_unstable } from "@fluentui/react-combobox";
import {
	resolvePositioningShorthand,
	type PositioningProps,
} from "@fluentui/react-positioning";
import { slot } from "@fluentui/react-utilities";
import type { ForwardedRef } from "react";

import { Listbox } from "../Listbox/Listbox";
import type { DropdownProps, DropdownState } from "./Dropdown.types";

/**
 * Get positioning options from shorthand or object.
 */
const getPositioning = (
	positioning: DropdownProps["positioning"] = {},
): PositioningProps => {
	if (typeof positioning === "string") {
		positioning = resolvePositioningShorthand(positioning);
	}

	const { align, offset } = positioning;
	const matchTargetSize =
		"matchTargetSize" in positioning
			? positioning.matchTargetSize
			: "width";
	const defaultAlign: PositioningProps["align"] = !matchTargetSize
		? "end"
		: undefined;

	return {
		...positioning,
		align: align || defaultAlign,
		matchTargetSize,
		offset: offset || { crossAxis: 0, mainAxis: 4 },
	};
};

/**
 * Create the state required to render Dropdown component.
 * @param props - Props from this instance of Dropdown
 * @param ref - Reference to the HTMLButtonElement (not root) of Dropdown
 * @returns The Dropdown state object
 * @alpha
 */
export const useDropdown = (
	props: DropdownProps,
	ref: ForwardedRef<HTMLButtonElement>,
): DropdownState => {
	const { color, contentBefore, ...rest } = props;

	const positioning = getPositioning(props.positioning);
	const baseState = useDropdown_unstable(
		{
			...rest,
			positioning,
		},
		ref,
	);

	return {
		...baseState,
		components: {
			...baseState.components,
			contentBefore: "span",
			listbox: Listbox,
		},
		color: color || "brand",
		contentBefore: slot.optional(contentBefore, { elementType: "span" }),
		listbox: slot.optional(baseState.listbox, { elementType: Listbox }),
	};
};

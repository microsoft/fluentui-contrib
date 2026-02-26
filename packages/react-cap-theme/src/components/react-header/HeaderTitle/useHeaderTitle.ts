import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import type * as React from "react";
import { useHeaderContext } from "../Header/HeaderContext";
import type { HeaderTitleProps, HeaderTitleState } from "./HeaderTitle.types";

/**
 * Create the state required to render HeaderTitle.
 *
 * The returned state can be modified with hooks such as useHeaderTitleStyles_unstable,
 * before being passed to renderHeaderTitle.
 *
 * @param props - props from this instance of HeaderTitle
 * @param ref - reference to root HTMLElement of HeaderTitle
 * @returns The state object for HeaderTitle component
 * @alpha
 */
export const useHeaderTitle = (
	props: HeaderTitleProps,
	ref: React.Ref<HTMLHeadingElement | HTMLPreElement | HTMLElement>,
): HeaderTitleState => {
	const { size: contextSize } = useHeaderContext();

	const state: HeaderTitleState = {
		components: { root: "span" },
		root: slot.always(getIntrinsicElementProps("span", { ref, ...props }), {
			elementType: "span",
		}),
		size: props.size ?? contextSize,
	};

	return state;
};

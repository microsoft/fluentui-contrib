import { useSearchBox_unstable } from "@fluentui/react-search";
import { slot } from "@fluentui/react-utilities";
import {
	bundleIcon,
	DismissFilled,
	DismissRegular,
	type FluentIcon,
	SearchFilled,
	SearchRegular,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";

import type { SearchBoxProps, SearchBoxState } from "./SearchBox.types";

const DismissIcon: FluentIcon = bundleIcon(DismissFilled, DismissRegular);
const SearchIcon: FluentIcon = bundleIcon(SearchFilled, SearchRegular);

/**
 * Create the state required to render SearchBox component.
 * @param props - Props from this instance of SearchBox
 * @param ref - Reference to the HTMLInputElement (not root) of SearchBox
 * @returns The SearchBox state object
 * @alpha
 */
export const useSearchBox = (
	props: SearchBoxProps,
	ref: React.Ref<HTMLInputElement>,
): SearchBoxState => {
	const { appearance, contentBefore, disabled, dismiss, readOnly } = props;

	const baseState = useSearchBox_unstable(
		{ ...props, appearance: "outline" },
		ref,
	);

	return {
		...baseState,
		components: {
			...baseState.components,
			separator: "span",
		},
		contentBefore: slot.optional(contentBefore, {
			defaultProps: {
				children: <SearchIcon />,
			},
			renderByDefault: true,
			elementType: "span",
		}),
		dismiss: slot.optional(dismiss, {
			defaultProps: {
				...baseState.dismiss,
				["aria-disabled"]: disabled,
				["aria-readonly"]: readOnly,
				children: <DismissIcon />,
			},
			renderByDefault: true,
			elementType: "span",
		}),
		appearance: appearance || "outline",
		separator: slot.optional({ as: "span" }, { elementType: "span" }),
	};
};

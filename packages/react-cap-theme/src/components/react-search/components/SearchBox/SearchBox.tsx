import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { renderSearchBox } from "./renderSearchBox";
import type { SearchBoxProps } from "./SearchBox.types";
import { useSearchBox } from "./useSearchBox";
import { useSearchBoxStyles } from "./useSearchBoxStyles.styles";

/**
 * SearchBox component is used to provide an input with search functionality; like clear.
 *
 * @example
 * ```tsx
 * <SearchBox placeholder='Search...' dismiss={{ 'aria-label': 'Clear' }} />
 * ```
 *
 * @alpha
 */
export const SearchBox: ForwardRefComponent<SearchBoxProps> = forwardRef(
	(props, ref) => {
		const state = useSearchBox(props, ref);

		useSearchBoxStyles(state);

		return renderSearchBox(state);
	},
);

SearchBox.displayName = "SearchBox";

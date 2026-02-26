import {
	renderListbox_unstable,
	useListbox_unstable,
	useListboxContextValues,
} from "@fluentui/react-combobox";
import type { ListboxProps } from "@fluentui/react-combobox";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useListboxStyles } from "./useListboxStyles.styles";

/**
 * Listbox is a standalone selection control, or the popup in a Combobox/Dropdown
 *
 * @example
 * ```tsx
 * <Listbox>
 *  <Option>Bird</Option>
 * </Listbox>
 * ```
 * @param props - The Listbox configuration
 * @param ref - Reference to the root element
 * @returns The rendered Listbox component
 * @alpha
 */
export const Listbox: ForwardRefComponent<ListboxProps> = forwardRef(
	(props, ref) => {
		const state = useListbox_unstable(props, ref);
		const contextValues = useListboxContextValues(state);

		useListboxStyles(state);

		return renderListbox_unstable(state, contextValues);
	},
);

Listbox.displayName = "Listbox";

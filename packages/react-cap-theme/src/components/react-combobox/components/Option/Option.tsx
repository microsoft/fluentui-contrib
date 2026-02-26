import { renderOption_unstable } from "@fluentui/react-combobox";
import type { OptionProps } from "@fluentui/react-combobox";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useOption } from "./useOption";
import { useOptionStyles } from "./useOptionStyles.styles";

/**
 * Option is the selectable item within a Combobox/Dropdown list.
 *
 * @example
 * ```tsx
 * <Option>Bird</Option>
 * <Option text='Turtle'>
 *   <AnimalTurtleFilled />{'Turtle'}
 * </Option>
 * ```
 * @param props - The Option configuration
 * @param ref - Reference to the root element
 * @returns The rendered Option component
 * @alpha
 */
export const Option: ForwardRefComponent<OptionProps> = forwardRef(
	(props, ref) => {
		const state = useOption(props, ref);

		useOptionStyles(state);

		return renderOption_unstable(state);
	},
);

Option.displayName = "Option";

import {
	renderOptionGroup_unstable,
	useOptionGroup_unstable,
} from "@fluentui/react-combobox";
import type { OptionGroupProps } from "@fluentui/react-combobox";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import { useOptionGroupStyles } from "./useOptionGroupStyles.styles";

/**
 * OptionGroup allows grouping of Option components within a Combobox/Dropdown
 *
 * @example
 * ```tsx
 * <OptionGroup label="Fruit">
 *   <Option>Apple</Option>
 *   <Option>Banana</Option>
 * </OptionGroup>
 * <OptionGroup label="Vegetable">
 *   <Option>Asparagus</Option>
 *   <Option>Broccoli</Option>
 * </OptionGroup>
 * ```
 * @param props - The OptionGroup configuration
 * @param ref - Reference to the root element
 * @returns The rendered OptionGroup component
 * @alpha
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> = forwardRef(
	(props, ref) => {
		const state = useOptionGroup_unstable(props, ref);

		useOptionGroupStyles(state);

		return renderOptionGroup_unstable(state);
	},
);

OptionGroup.displayName = "OptionGroup";

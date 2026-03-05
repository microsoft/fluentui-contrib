import { useComboboxContextValues } from "@fluentui/react-combobox";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import { forwardRef } from "react";

import type { DropdownProps } from "./Dropdown.types";
import { renderDropdown } from "./renderDropdown";
import { useDropdown } from "./useDropdown";
import { useDropdownStyles } from "./useDropdownStyles.styles";

/**
 * Dropdown is a selection control that allows users to choose from a set of possible options
 *
 * @example
 * ```tsx
 * <Dropdown placeholder='Select an animal'>
 *   <Option>Cat</Option>
 *   <Option>Dog</Option>
 *   <Option>Fish</Option>
 * </Dropdown>
 * ```
 * @param props - The Dropdown configuration
 * @param ref - Reference to the button element
 * @returns The rendered Dropdown component
 * @alpha
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = forwardRef(
	(props, ref) => {
		const state = useDropdown(props, ref);
		const contextValues = useComboboxContextValues({
			...state,
			appearance: "outline",
		});

		useDropdownStyles(state);

		return renderDropdown(state, contextValues);
	},
);

Dropdown.displayName = "Dropdown";
